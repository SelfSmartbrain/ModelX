"""Sub-Orchestrator for Swarm Orchestration (Phase 8).

Worker agent that executes sub-tasks assigned by the Director.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel, Field

from src.config.logging import get_logger

logger = get_logger(__name__)


class SubOrchestratorState(BaseModel):
    """State of a sub-orchestrator."""
    
    id: UUID
    director_id: UUID
    status: str = "idle" # idle, assigned, executing, completed, failed
    current_task: Optional[str] = None
    progress: float = 0.0
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class SubOrchestrator:
    """Sub-orchestrator that executes individual sub-tasks."""
    
    def __init__(self, id: UUID, director_id: UUID):
        """Initialize sub-orchestrator."""
        self.id = id
        self.director_id = director_id
        self.state = SubOrchestratorState(id=id, director_id=director_id)
        self._task_queue: asyncio.Queue = asyncio.Queue()
        self._running = False
        self._worker_task: Optional[asyncio.Task] = None
        
        logger.info(f"SubOrchestrator {id} initialized")
    
    async def initialize(self) -> None:
        """Initialize sub-orchestrator."""
        logger.info(f"Initializing SubOrchestrator {self.id}")
        self._running = True
        self._worker_task = asyncio.create_task(self._worker_loop())
    
    async def shutdown(self) -> None:
        """Shutdown sub-orchestrator."""
        logger.info(f"Shutting down SubOrchestrator {self.id}")
        self._running = False
        
        if self._worker_task:
            self._worker_task.cancel()
            try:
                await self._worker_task
            except asyncio.CancelledError:
                pass
        
        logger.info(f"SubOrchestrator {self.id} shutdown complete")
    
    async def assign_task(self, assignment: Any) -> None:
        """Assign a task to this sub-orchestrator."""
        logger.info(f"Assigning task to SubOrchestrator {self.id}: {assignment.task_description}")
        
        self.state.status = "assigned"
        self.state.current_task = assignment.task_description
        self.state.started_at = datetime.now(timezone.utc)
        self.state.progress = 0.0
        
        await self._task_queue.put(assignment)
    
    async def _worker_loop(self) -> None:
        """Main worker loop for processing tasks."""
        logger.info(f"SubOrchestrator {self.id} worker loop started")
        
        while self._running:
            try:
                # Wait for task with timeout
                assignment = await asyncio.wait_for(
                    self._task_queue.get(),
                    timeout=1.0
                )
                
                # Execute task
                await self._execute_task(assignment)
                
            except asyncio.TimeoutError:
                # No task, continue loop
                continue
            except asyncio.CancelledError:
                logger.info(f"SubOrchestrator {self.id} worker loop cancelled")
                break
            except Exception as e:
                logger.error(f"Error in SubOrchestrator {self.id} worker loop: {e}")
                self.state.status = "failed"
                self.state.error_message = str(e)
        
        logger.info(f"SubOrchestrator {self.id} worker loop ended")
    
    async def _execute_task(self, assignment: Any) -> None:
        """Execute a single task."""
        logger.info(f"SubOrchestrator {self.id} executing task: {assignment.task_description}")
        
        self.state.status = "executing"
        
        try:
            # Simulate task execution with progress updates
            steps = 10
            for i in range(steps):
                if not self._running:
                    break
                
                # Simulate work
                await asyncio.sleep(0.5)
                
                # Update progress
                self.state.progress = (i + 1) / steps * 100
                logger.debug(f"SubOrchestrator {self.id} progress: {self.state.progress}%")
            
            # Task completed successfully
            if self._running:
                self.state.status = "completed"
                self.state.progress = 100.0
                self.state.completed_at = datetime.now(timezone.utc)
                logger.info(f"SubOrchestrator {self.id} task completed successfully")
            
        except Exception as e:
            logger.error(f"SubOrchestrator {self.id} task failed: {e}")
            self.state.status = "failed"
            self.state.error_message = str(e)
        finally:
            # Mark task as done in queue
            self._task_queue.task_done()
    
    @property
    def status(self) -> str:
        """Get current status."""
        return self.state.status
    
    @property
    def progress(self) -> float:
        """Get current progress."""
        return self.state.progress
    
    async def get_state(self) -> SubOrchestratorState:
        """Get current state."""
        return self.state
    
    async def cancel_current_task(self) -> bool:
        """Cancel the currently running task."""
        if self.state.status == "executing":
            logger.info(f"Cancelling current task for SubOrchestrator {self.id}")
            self.state.status = "idle"
            self.state.current_task = None
            self.state.progress = 0.0
            return True
        return False
