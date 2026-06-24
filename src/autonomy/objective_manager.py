"""Objective management for autonomous runtime loops."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.enums import ObjectiveStatus
from src.db.models import Objective as ObjectiveModel


@dataclass
class Objective:
    """A durable unit of autonomous intent."""

    description: str
    priority: float = 0.5
    metadata: dict[str, Any] = field(default_factory=dict)
    objective_id: str = field(default_factory=lambda: f"obj_{uuid4().hex[:12]}")
    status: str = "active"
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
    db_id: Any = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "objective_id": self.objective_id,
            "description": self.description,
            "priority": self.priority,
            "metadata": self.metadata,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    @classmethod
    def from_db_model(cls, model: ObjectiveModel) -> Objective:
        """Create an Objective from a database model."""
        return cls(
            description=model.description,
            priority=model.priority,
            metadata=model.metadata_ or {},
            objective_id=model.objective_id,
            status=model.status.value,
            created_at=model.created_at,
            updated_at=model.updated_at,
            db_id=model.id,
        )


class ObjectiveManager:
    """Keeps track of active and historical autonomous objectives with persistence."""

    def __init__(self, session: AsyncSession | None = None) -> None:
        self.active_objectives: list[Objective] = []
        self.completed_objectives: list[Objective] = []
        self.blocked_objectives: list[Objective] = []
        self.failed_objectives: list[Objective] = []
        self.paused_objectives: list[Objective] = []
        self.session = session

    async def load_from_db(self, session: AsyncSession) -> None:
        """Load all objectives from the database."""
        self.session = session
        result = await session.execute(select(ObjectiveModel))
        db_objectives = result.scalars().all()

        self.active_objectives = []
        self.completed_objectives = []
        self.blocked_objectives = []
        self.failed_objectives = []
        self.paused_objectives = []

        for db_obj in db_objectives:
            obj = Objective.from_db_model(db_obj)
            if db_obj.status == ObjectiveStatus.ACTIVE:
                self.active_objectives.append(obj)
            elif db_obj.status == ObjectiveStatus.COMPLETED:
                self.completed_objectives.append(obj)
            elif db_obj.status == ObjectiveStatus.BLOCKED:
                self.blocked_objectives.append(obj)
            elif db_obj.status == ObjectiveStatus.FAILED:
                self.failed_objectives.append(obj)
            elif db_obj.status == ObjectiveStatus.PAUSED:
                self.paused_objectives.append(obj)

    async def save_objective(self, objective: Objective, session: AsyncSession) -> Objective:
        """Save or update an objective in the database."""
        if objective.db_id:
            result = await session.execute(
                select(ObjectiveModel).where(ObjectiveModel.id == objective.db_id)
            )
            db_obj = result.scalar_one_or_none()
            if db_obj:
                db_obj.description = objective.description
                db_obj.priority = objective.priority
                db_obj.status = ObjectiveStatus(objective.status)
                db_obj.metadata_ = objective.metadata
                db_obj.updated_at = objective.updated_at
                if objective.status == "completed":
                    db_obj.completed_at = objective.updated_at
        else:
            db_obj = ObjectiveModel(
                objective_id=objective.objective_id,
                description=objective.description,
                priority=objective.priority,
                status=ObjectiveStatus(objective.status),
                metadata_=objective.metadata,
                created_at=objective.created_at,
                updated_at=objective.updated_at,
            )
            session.add(db_obj)
            await session.flush()
            objective.db_id = db_obj.id

        await session.commit()
        return objective

    async def delete_objective(self, objective_id: str, session: AsyncSession) -> bool:
        """Delete an objective from the database."""
        result = await session.execute(
            select(ObjectiveModel).where(ObjectiveModel.objective_id == objective_id)
        )
        db_obj = result.scalar_one_or_none()
        if db_obj:
            await session.delete(db_obj)
            await session.commit()
            return True
        return False

    def get_current_objective(self) -> Objective | None:
        """Return the highest-priority active objective, if one exists."""
        if not self.active_objectives:
            return None
        return max(self.active_objectives, key=lambda objective: objective.priority)

    async def set_objective(
        self,
        objective: str | Objective,
        priority: float = 0.5,
        metadata: dict[str, Any] | None = None,
    ) -> Objective:
        """Create or register an active objective."""
        if isinstance(objective, Objective):
            next_objective = objective
        else:
            next_objective = Objective(
                description=objective,
                priority=priority,
                metadata=metadata or {},
            )

        next_objective.status = "active"
        next_objective.updated_at = datetime.utcnow()
        self.active_objectives.append(next_objective)

        if self.session:
            await self.save_objective(next_objective, self.session)

        return next_objective

    async def complete_objective(self, objective_id: str) -> Objective | None:
        obj = self._move_objective(objective_id, "completed", self.completed_objectives)
        if obj and self.session:
            await self.save_objective(obj, self.session)
        return obj

    async def block_objective(self, objective_id: str) -> Objective | None:
        obj = self._move_objective(objective_id, "blocked", self.blocked_objectives)
        if obj and self.session:
            await self.save_objective(obj, self.session)
        return obj

    async def fail_objective(self, objective_id: str) -> Objective | None:
        obj = self._move_objective(objective_id, "failed", self.failed_objectives)
        if obj and self.session:
            await self.save_objective(obj, self.session)
        return obj

    async def pause_objective(self, objective_id: str) -> Objective | None:
        obj = self._move_objective(objective_id, "paused", self.paused_objectives)
        if obj and self.session:
            await self.save_objective(obj, self.session)
        return obj

    async def resume_objective(self, objective_id: str) -> Objective | None:
        for index, objective in enumerate(self.paused_objectives):
            if objective.objective_id == objective_id:
                moved = self.paused_objectives.pop(index)
                moved.status = "active"
                moved.updated_at = datetime.utcnow()
                self.active_objectives.append(moved)
                if self.session:
                    await self.save_objective(moved, self.session)
                return moved
        return None

    async def cancel_objective(self, objective_id: str) -> Objective | None:
        for index, objective in enumerate(self.active_objectives):
            if objective.objective_id == objective_id:
                moved = self.active_objectives.pop(index)
                moved.status = "cancelled"
                moved.updated_at = datetime.utcnow()
                if self.session:
                    await self.save_objective(moved, self.session)
                    await self.delete_objective(objective_id, self.session)
                return moved
        return None

    def list_objectives(self, status: str = "active") -> list[Objective]:
        buckets = {
            "active": self.active_objectives,
            "completed": self.completed_objectives,
            "blocked": self.blocked_objectives,
            "failed": self.failed_objectives,
            "paused": self.paused_objectives,
        }
        return list(buckets.get(status, []))

    def _move_objective(
        self,
        objective_id: str,
        status: str,
        destination: list[Objective],
    ) -> Objective | None:
        for index, objective in enumerate(self.active_objectives):
            if objective.objective_id == objective_id:
                moved = self.active_objectives.pop(index)
                moved.status = status
                moved.updated_at = datetime.utcnow()
                destination.append(moved)
                return moved
        return None
