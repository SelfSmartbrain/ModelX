"""
Reflection endpoints.

Provides access to reflection reports, insights, and learning records.
"""

from __future__ import annotations

import uuid

from fastapi import APIRouter, HTTPException

from src.api.dependencies import CurrentUser, DB_ReflectionRepo
from src.api.schemas.reflections import (
    ReflectionResponse,
    ReflectionListResponse,
    ReflectionInsight,
)
from src.config.logging import get_logger

logger = get_logger(__name__)

router = APIRouter()


@router.get(
    "/{session_id}",
    response_model=ReflectionListResponse,
    summary="Get reflections for a session",
)
async def get_session_reflections(
    session_id: uuid.UUID,
    user: CurrentUser,
    reflection_repo: DB_ReflectionRepo,
) -> ReflectionListResponse:
    """Retrieve all reflection records for a specific session."""
    reflections = await reflection_repo.get_session_reflections(session_id)

    results = [
        ReflectionResponse(
            id=r.id,
            session_id=r.session_id,
            task_id=r.task_id,
            reflection_type=r.reflection_type.value,
            successes=r.successes or [],
            failures=r.failures or [],
            root_causes=r.root_causes or [],
            improvements=r.improvements or [],
            confidence_score=r.confidence_score,
            applied=r.applied,
            created_at=r.created_at,
        )
        for r in reflections
    ]

    return ReflectionListResponse(
        reflections=results,
        total=len(results),
    )


@router.get(
    "/insights/unapplied",
    response_model=list[ReflectionInsight],
    summary="Get unapplied improvement insights",
)
async def get_unapplied_improvements(
    user: CurrentUser,
    reflection_repo: DB_ReflectionRepo,
) -> list[ReflectionInsight]:
    """
    Get all unapplied improvement strategies from past reflections.

    These represent learnings the system has identified but hasn't yet
    incorporated into its execution strategies.
    """
    from datetime import datetime, timezone

    records = await reflection_repo.get_unapplied_improvements()

    insights: list[ReflectionInsight] = []
    for r in records:
        for improvement in (r.improvements or []):
            insights.append(
                ReflectionInsight(
                    pattern=improvement,
                    frequency=1,
                    last_observed=r.created_at,
                    recommended_action=improvement,
                    confidence=r.confidence_score,
                )
            )

    return insights
