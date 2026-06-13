"""
SQLAlchemy 2.0 ORM models for the Autonomous Agent Platform.

All models use:
- ``Mapped[]`` type annotations (SQLAlchemy 2.0 style).
- UUID v7 primary keys via ``uuid6.uuid7()`` for time-ordered IDs.
- Proper indexes for query performance on hot paths.
- Relationships with ``back_populates`` for bidirectional traversal.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any
from uuid import UUID

import uuid6
from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)

from src.db.enums import (
    ExecutionStatus,
    MemoryType,
    Priority,
    ReflectionType,
    SessionStatus,
    SourceType,
    TaskStatus,
)


def _generate_uuid7() -> UUID:
    """Generate a UUID v7 (time-ordered) for use as a primary key."""
    return uuid6.uuid7()


class Base(DeclarativeBase):
    """Shared declarative base for all ORM models.

    Provides a ``type_annotation_map`` so that ``Mapped[dict[str, Any]]``
    automatically resolves to PostgreSQL JSONB.
    """

    type_annotation_map = {
        dict[str, Any]: JSONB,
    }


# ---------------------------------------------------------------------------
# User
# ---------------------------------------------------------------------------


class User(Base):
    """Platform user who owns sessions and memories."""

    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    email: Mapped[str] = mapped_column(
        String(320), unique=True, nullable=False, index=True
    )
    api_key_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    sessions: Mapped[list[Session]] = relationship(
        back_populates="user", cascade="all, delete-orphan", lazy="selectin"
    )
    memories: Mapped[list[Memory]] = relationship(
        back_populates="user", cascade="all, delete-orphan", lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<User id={self.id!s} email={self.email!r}>"


# ---------------------------------------------------------------------------
# Session
# ---------------------------------------------------------------------------


class Session(Base):
    """A goal-driven agent session owned by a user."""

    __tablename__ = "sessions"
    __table_args__ = (
        Index("ix_sessions_user_status", "user_id", "status"),
        Index("ix_sessions_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    goal: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[SessionStatus] = mapped_column(
        Enum(SessionStatus, name="session_status", create_constraint=True),
        nullable=False,
        default=SessionStatus.PENDING,
        index=True,
    )
    context: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Relationships
    user: Mapped[User] = relationship(back_populates="sessions")
    tasks: Mapped[list[Task]] = relationship(
        back_populates="session", cascade="all, delete-orphan", lazy="selectin"
    )
    agent_logs: Mapped[list[AgentLog]] = relationship(
        back_populates="session", cascade="all, delete-orphan", lazy="selectin"
    )
    memories: Mapped[list[Memory]] = relationship(
        back_populates="session", cascade="all, delete-orphan", lazy="selectin"
    )
    reflections: Mapped[list[ReflectionRecord]] = relationship(
        back_populates="session", cascade="all, delete-orphan", lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<Session id={self.id!s} status={self.status.value!r}>"


# ---------------------------------------------------------------------------
# Task
# ---------------------------------------------------------------------------


class Task(Base):
    """An individual unit of work within a session, supporting hierarchy."""

    __tablename__ = "tasks"
    __table_args__ = (
        Index("ix_tasks_session_status", "session_id", "status"),
        Index("ix_tasks_status_priority", "status", "priority"),
        Index("ix_tasks_parent", "parent_task_id"),
        Index("ix_tasks_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    session_id: Mapped[UUID] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False, index=True
    )
    parent_task_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("tasks.id", ondelete="SET NULL"), nullable=True
    )
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[TaskStatus] = mapped_column(
        Enum(TaskStatus, name="task_status", create_constraint=True),
        nullable=False,
        default=TaskStatus.PENDING,
        index=True,
    )
    priority: Mapped[Priority] = mapped_column(
        Enum(Priority, name="priority", create_constraint=True),
        nullable=False,
        default=Priority.NORMAL,
    )
    agent_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    dependencies: Mapped[list[UUID] | None] = mapped_column(
        ARRAY(String), nullable=True
    )
    result: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    retry_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Relationships
    session: Mapped[Session] = relationship(back_populates="tasks")
    parent_task: Mapped[Task | None] = relationship(
        back_populates="subtasks", remote_side=[id]
    )
    subtasks: Mapped[list[Task]] = relationship(
        back_populates="parent_task", cascade="all, delete-orphan"
    )
    executions: Mapped[list[Execution]] = relationship(
        back_populates="task", cascade="all, delete-orphan", lazy="selectin"
    )
    agent_logs: Mapped[list[AgentLog]] = relationship(
        back_populates="task", cascade="all, delete-orphan", lazy="selectin"
    )
    reflections: Mapped[list[ReflectionRecord]] = relationship(
        back_populates="task", cascade="all, delete-orphan", lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<Task id={self.id!s} title={self.title!r} status={self.status.value!r}>"


# ---------------------------------------------------------------------------
# Execution
# ---------------------------------------------------------------------------


class Execution(Base):
    """Record of a single agent execution attempt for a task."""

    __tablename__ = "executions"
    __table_args__ = (
        Index("ix_executions_task_id", "task_id"),
        Index("ix_executions_status", "status"),
        Index("ix_executions_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    task_id: Mapped[UUID] = mapped_column(
        ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False
    )
    agent_type: Mapped[str] = mapped_column(String(100), nullable=False)
    input_data: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    output_data: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    status: Mapped[ExecutionStatus] = mapped_column(
        Enum(ExecutionStatus, name="execution_status", create_constraint=True),
        nullable=False,
        default=ExecutionStatus.RUNNING,
    )
    tokens_used: Mapped[int | None] = mapped_column(Integer, nullable=True)
    duration_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    task: Mapped[Task] = relationship(back_populates="executions")

    def __repr__(self) -> str:
        return f"<Execution id={self.id!s} task={self.task_id!s} status={self.status.value!r}>"


# ---------------------------------------------------------------------------
# Memory
# ---------------------------------------------------------------------------


class Memory(Base):
    """A memory entry in the agent's memory subsystem."""

    __tablename__ = "memories"
    __table_args__ = (
        Index("ix_memories_user_type", "user_id", "memory_type"),
        Index("ix_memories_session", "session_id"),
        Index("ix_memories_importance", "importance_score"),
        Index("ix_memories_last_accessed", "last_accessed"),
        Index("ix_memories_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    session_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("sessions.id", ondelete="SET NULL"), nullable=True
    )
    memory_type: Mapped[MemoryType] = mapped_column(
        Enum(MemoryType, name="memory_type", create_constraint=True),
        nullable=False,
        index=True,
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_: Mapped[dict[str, Any] | None] = mapped_column(
        "metadata", JSONB, nullable=True
    )
    importance_score: Mapped[float] = mapped_column(
        Float, nullable=False, default=0.5
    )
    access_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    last_accessed: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    embedding_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    user: Mapped[User] = relationship(back_populates="memories")
    session: Mapped[Session | None] = relationship(back_populates="memories")

    def __repr__(self) -> str:
        return (
            f"<Memory id={self.id!s} type={self.memory_type.value!r} "
            f"importance={self.importance_score:.2f}>"
        )


# ---------------------------------------------------------------------------
# Knowledge Document & Chunk
# ---------------------------------------------------------------------------


class KnowledgeDocument(Base):
    """A source document ingested into the knowledge base."""

    __tablename__ = "knowledge_documents"
    __table_args__ = (
        Index("ix_kdocs_source_type", "source_type"),
        Index("ix_kdocs_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    title: Mapped[str] = mapped_column(String(1000), nullable=False)
    source: Mapped[str] = mapped_column(String(2000), nullable=False)
    source_type: Mapped[SourceType] = mapped_column(
        Enum(SourceType, name="source_type", create_constraint=True),
        nullable=False,
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_: Mapped[dict[str, Any] | None] = mapped_column(
        "metadata", JSONB, nullable=True
    )
    chunk_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    chunks: Mapped[list[KnowledgeChunk]] = relationship(
        back_populates="document", cascade="all, delete-orphan", lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<KnowledgeDocument id={self.id!s} title={self.title!r}>"


class KnowledgeChunk(Base):
    """A chunked segment of a knowledge document, linked to an embedding."""

    __tablename__ = "knowledge_chunks"
    __table_args__ = (
        Index("ix_kchunks_document", "document_id"),
        Index("ix_kchunks_document_index", "document_id", "chunk_index", unique=True),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    document_id: Mapped[UUID] = mapped_column(
        ForeignKey("knowledge_documents.id", ondelete="CASCADE"),
        nullable=False,
    )
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    embedding_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    metadata_: Mapped[dict[str, Any] | None] = mapped_column(
        "metadata", JSONB, nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    document: Mapped[KnowledgeDocument] = relationship(back_populates="chunks")

    def __repr__(self) -> str:
        return (
            f"<KnowledgeChunk id={self.id!s} doc={self.document_id!s} "
            f"index={self.chunk_index}>"
        )


# ---------------------------------------------------------------------------
# Agent Log
# ---------------------------------------------------------------------------


class AgentLog(Base):
    """Audit log entry for agent actions within a session."""

    __tablename__ = "agent_logs"
    __table_args__ = (
        Index("ix_agent_logs_session", "session_id"),
        Index("ix_agent_logs_task", "task_id"),
        Index("ix_agent_logs_agent_type", "agent_type"),
        Index("ix_agent_logs_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    session_id: Mapped[UUID] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False
    )
    task_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("tasks.id", ondelete="SET NULL"), nullable=True
    )
    agent_type: Mapped[str] = mapped_column(String(100), nullable=False)
    action: Mapped[str] = mapped_column(String(200), nullable=False)
    input_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    output_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    tokens_used: Mapped[int | None] = mapped_column(Integer, nullable=True)
    duration_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    session: Mapped[Session] = relationship(back_populates="agent_logs")
    task: Mapped[Task | None] = relationship(back_populates="agent_logs")

    def __repr__(self) -> str:
        return (
            f"<AgentLog id={self.id!s} agent={self.agent_type!r} "
            f"action={self.action!r}>"
        )


# ---------------------------------------------------------------------------
# Reflection Record
# ---------------------------------------------------------------------------


class ReflectionRecord(Base):
    """Record of agent self-reflection for continuous improvement."""

    __tablename__ = "reflection_records"
    __table_args__ = (
        Index("ix_reflections_session", "session_id"),
        Index("ix_reflections_type", "reflection_type"),
        Index("ix_reflections_applied", "applied"),
        Index("ix_reflections_created_at", "created_at"),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=_generate_uuid7,
    )
    session_id: Mapped[UUID] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False
    )
    task_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("tasks.id", ondelete="SET NULL"), nullable=True
    )
    reflection_type: Mapped[ReflectionType] = mapped_column(
        Enum(ReflectionType, name="reflection_type", create_constraint=True),
        nullable=False,
    )
    successes: Mapped[list[str] | None] = mapped_column(
        ARRAY(Text), nullable=True
    )
    failures: Mapped[list[str] | None] = mapped_column(
        ARRAY(Text), nullable=True
    )
    root_causes: Mapped[list[str] | None] = mapped_column(
        ARRAY(Text), nullable=True
    )
    improvements: Mapped[list[str] | None] = mapped_column(
        ARRAY(Text), nullable=True
    )
    confidence_score: Mapped[float] = mapped_column(
        Float, nullable=False, default=0.5
    )
    applied: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    session: Mapped[Session] = relationship(back_populates="reflections")
    task: Mapped[Task | None] = relationship(back_populates="reflections")

    def __repr__(self) -> str:
        return (
            f"<ReflectionRecord id={self.id!s} type={self.reflection_type.value!r} "
            f"applied={self.applied}>"
        )
