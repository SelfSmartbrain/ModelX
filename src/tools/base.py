"""
Base tool class for the Autonomous Agent Platform.

Provides a standardized foundation for all agent tools with:
- Structured logging on every invocation
- Execution time tracking
- Configurable retry logic via tenacity
- Timeout handling via asyncio
- Unified error handling and metrics
"""

from __future__ import annotations

import asyncio
import time
from abc import abstractmethod
from typing import Any, ClassVar

from langchain_core.callbacks import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
from langchain_core.tools import BaseTool
from pydantic import Field
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from src.config.logging import get_logger
from src.config.settings import get_settings

logger = get_logger(__name__)


class ToolExecutionError(Exception):
    """Raised when a tool execution fails after all retries."""

    def __init__(self, tool_name: str, message: str, cause: Exception | None = None) -> None:
        self.tool_name = tool_name
        self.cause = cause
        super().__init__(f"[{tool_name}] {message}")


class ToolTimeoutError(ToolExecutionError):
    """Raised when a tool execution exceeds its timeout."""

    def __init__(self, tool_name: str, timeout_seconds: float) -> None:
        super().__init__(
            tool_name=tool_name,
            message=f"Execution timed out after {timeout_seconds}s",
        )


class ToolResult:
    """Standardized wrapper for tool execution results.

    Attributes:
        success: Whether the tool executed successfully.
        data: The result payload from the tool.
        error: Error message if execution failed.
        execution_time: Wall-clock execution time in seconds.
        metadata: Optional metadata dict attached by the tool.
    """

    __slots__ = ("success", "data", "error", "execution_time", "metadata")

    def __init__(
        self,
        success: bool,
        data: Any = None,
        error: str | None = None,
        execution_time: float = 0.0,
        metadata: dict[str, Any] | None = None,
    ) -> None:
        self.success = success
        self.data = data
        self.error = error
        self.execution_time = execution_time
        self.metadata = metadata or {}

    def to_dict(self) -> dict[str, Any]:
        """Serialize the result to a plain dict."""
        return {
            "success": self.success,
            "data": self.data,
            "error": self.error,
            "execution_time": round(self.execution_time, 4),
            "metadata": self.metadata,
        }


# Transient exception types that should trigger a retry
_RETRYABLE_EXCEPTIONS = (
    ConnectionError,
    TimeoutError,
    asyncio.TimeoutError,
    OSError,
)


class AgentTool(BaseTool):
    """Abstract base class for all platform tools.

    Subclasses must implement :meth:`_execute` which contains the tool's core
    logic.  The base class wraps every invocation with:

    * **Structured logging** — entry, exit, and error events.
    * **Execution-time tracking** — ``execution_time`` in the returned dict.
    * **Retry logic** — configurable ``max_retries`` with exponential back-off
      (only retries transient exceptions).
    * **Timeout handling** — enforced via ``asyncio.wait_for``.
    """

    # Tool configuration (overridable per-subclass)
    max_retries: int = Field(
        default=3,
        ge=0,
        le=10,
        description="Maximum retries on transient failures",
    )
    timeout_seconds: float = Field(
        default=60.0,
        gt=0,
        description="Per-invocation timeout in seconds",
    )

    # Class-level flag — all tools should return raw strings via _arun so
    # LangChain doesn't try to parse them.
    return_direct: ClassVar[bool] = False

    # ------------------------------------------------------------------
    # Abstract interface for subclasses
    # ------------------------------------------------------------------

    @abstractmethod
    async def _execute(self, **kwargs: Any) -> Any:
        """Execute the tool's core logic.

        Subclasses must override this method. It receives the validated
        keyword arguments produced by the tool's ``args_schema``.

        Returns:
            Arbitrary data that will be serialized into the final
            :class:`ToolResult`.

        Raises:
            Any exception — transient exceptions are retried, others
            are caught and wrapped.
        """
        ...

    # ------------------------------------------------------------------
    # LangChain interface
    # ------------------------------------------------------------------

    def _run(
        self,
        *args: Any,
        run_manager: CallbackManagerForToolRun | None = None,
        **kwargs: Any,
    ) -> str:
        """Synchronous entry-point (delegates to async)."""
        return asyncio.get_event_loop().run_until_complete(
            self._arun(*args, run_manager=None, **kwargs)
        )

    async def _arun(
        self,
        *args: Any,
        run_manager: AsyncCallbackManagerForToolRun | None = None,
        **kwargs: Any,
    ) -> str:
        """Async entry-point called by LangChain agents.

        Wraps ``_execute`` with logging, timing, retries, and timeout
        handling.  Always returns a JSON-serialisable string.
        """
        import json

        start = time.perf_counter()
        log = logger.bind(tool=self.name)

        log.info("tool.invoke.start", args=kwargs)

        try:
            result = await self._run_with_retries(**kwargs)
            elapsed = time.perf_counter() - start

            tool_result = ToolResult(
                success=True,
                data=result,
                execution_time=elapsed,
            )
            log.info(
                "tool.invoke.success",
                execution_time=round(elapsed, 4),
            )

        except ToolTimeoutError as exc:
            elapsed = time.perf_counter() - start
            tool_result = ToolResult(
                success=False,
                error=str(exc),
                execution_time=elapsed,
            )
            log.error(
                "tool.invoke.timeout",
                timeout=self.timeout_seconds,
                execution_time=round(elapsed, 4),
            )

        except ToolExecutionError as exc:
            elapsed = time.perf_counter() - start
            tool_result = ToolResult(
                success=False,
                error=str(exc),
                execution_time=elapsed,
            )
            log.error(
                "tool.invoke.error",
                error=str(exc),
                execution_time=round(elapsed, 4),
            )

        except Exception as exc:
            elapsed = time.perf_counter() - start
            tool_result = ToolResult(
                success=False,
                error=f"Unexpected error: {exc!r}",
                execution_time=elapsed,
            )
            log.exception(
                "tool.invoke.unexpected_error",
                error=repr(exc),
                execution_time=round(elapsed, 4),
            )

        return json.dumps(tool_result.to_dict(), default=str)

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    async def _run_with_retries(self, **kwargs: Any) -> Any:
        """Execute ``_execute`` with retry + timeout wrapping."""

        # Build a tenacity retrier dynamically so ``max_retries`` is respected.
        retrier = retry(
            stop=stop_after_attempt(max(1, self.max_retries + 1)),
            wait=wait_exponential(multiplier=0.5, min=0.25, max=8),
            retry=retry_if_exception_type(_RETRYABLE_EXCEPTIONS),
            reraise=True,
        )

        @retrier
        async def _inner() -> Any:
            try:
                return await asyncio.wait_for(
                    self._execute(**kwargs),
                    timeout=self.timeout_seconds,
                )
            except asyncio.TimeoutError:
                raise ToolTimeoutError(self.name, self.timeout_seconds)

        try:
            return await _inner()
        except ToolTimeoutError:
            raise
        except _RETRYABLE_EXCEPTIONS as exc:
            raise ToolExecutionError(
                tool_name=self.name,
                message=f"Failed after {self.max_retries} retries: {exc!r}",
                cause=exc,
            ) from exc
        except Exception as exc:
            raise ToolExecutionError(
                tool_name=self.name,
                message=str(exc),
                cause=exc,
            ) from exc
