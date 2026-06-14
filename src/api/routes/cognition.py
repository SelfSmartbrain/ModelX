"""API routes for the Cognition module (Phase 7)."""
from __future__ import annotations

from fastapi import APIRouter, HTTPException

from src.api.schemas.cognition import CognitionMetricsResponse
from src.config.logging import get_logger

logger = get_logger(__name__)

router = APIRouter(
    prefix="/api/v1/cognition",
    tags=["Cognition"],
)


@router.get("/metrics", response_model=CognitionMetricsResponse)
async def get_cognition_metrics() -> CognitionMetricsResponse:
    """Return aggregated cognition metrics.

    Currently returns mock data; will be backed by the cognition service
    once the full pipeline is wired up.
    """
    logger.info("Fetching cognition metrics")
    return CognitionMetricsResponse(
        knowledge_growth_rate=0.15,
        learning_velocity=0.72,
        autonomy_score=0.65,
        research_efficiency=0.58,
        goal_completion_rate=0.40,
        strategy_effectiveness=0.70,
        skill_utilization=0.55,
    )


@router.get("/autonomy")
async def get_autonomy_score() -> dict[str, float]:
    """Return the current autonomy score.

    The autonomy score reflects how independently the system can
    conduct research without human intervention.
    """
    logger.info("Fetching autonomy score")
    return {"autonomy_score": 0.65}


@router.get("/velocity")
async def get_learning_velocity() -> dict[str, float]:
    """Return the current learning velocity.

    Learning velocity measures how quickly the system acquires and
    integrates new knowledge over time.
    """
    logger.info("Fetching learning velocity")
    return {"learning_velocity": 0.72}
