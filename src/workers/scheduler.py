"""Central scheduler for all background worker jobs (Phase 7)."""
from __future__ import annotations

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from src.config.logging import get_logger
from src.workers.meta_learning_worker import run_meta_learning_cycle
from src.workers.optimization_worker import run_optimization_cycle
from src.workers.reflection_worker import run_reflection_cycle
from src.workers.reporting_worker import run_reporting_cycle
from src.workers.skill_discovery_worker import run_skill_discovery_cycle

logger = get_logger(__name__)


class WorkerScheduler:
    """Manages periodic background jobs using APScheduler.

    Each job is registered with a fixed interval and runs the
    corresponding async worker function.  Call :meth:`start` during
    application startup and :meth:`stop` during shutdown.
    """

    def __init__(self) -> None:
        self._scheduler = AsyncIOScheduler()

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    async def start(self) -> None:
        """Register all worker jobs and start the scheduler."""
        logger.info("Registering background worker jobs")

        # Reflection — every 1 hour
        self._scheduler.add_job(
            run_reflection_cycle,
            trigger="interval",
            hours=1,
            id="reflection_job",
            name="Reflection Cycle",
            replace_existing=True,
        )

        # Meta-learning — every 6 hours
        self._scheduler.add_job(
            run_meta_learning_cycle,
            trigger="interval",
            hours=6,
            id="meta_learning_job",
            name="Meta-Learning Cycle",
            replace_existing=True,
        )

        # Skill discovery — every 24 hours
        self._scheduler.add_job(
            run_skill_discovery_cycle,
            trigger="interval",
            hours=24,
            id="skill_discovery_job",
            name="Skill Discovery Cycle",
            replace_existing=True,
        )

        # Optimization — every 168 hours (weekly)
        self._scheduler.add_job(
            run_optimization_cycle,
            trigger="interval",
            hours=168,
            id="optimization_job",
            name="Optimization Cycle",
            replace_existing=True,
        )

        # Reporting — every 24 hours
        self._scheduler.add_job(
            run_reporting_cycle,
            trigger="interval",
            hours=24,
            id="reporting_job",
            name="Reporting Cycle",
            replace_existing=True,
        )

        self._scheduler.start()
        logger.info("WorkerScheduler started with %d jobs", len(self._scheduler.get_jobs()))

    async def stop(self) -> None:
        """Shut down the scheduler gracefully, waiting for running jobs."""
        logger.info("Stopping WorkerScheduler")
        self._scheduler.shutdown(wait=True)
        logger.info("WorkerScheduler stopped")
