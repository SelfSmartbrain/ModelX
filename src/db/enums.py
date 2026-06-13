"""
Database enumerations for the Autonomous Agent Platform.

These Python enums map directly to PostgreSQL ENUM types created via
SQLAlchemy's ``Enum`` column type. Each enum value is stored as its
lowercase string representation in the database.
"""

from __future__ import annotations

import enum


class SessionStatus(str, enum.Enum):
    """Lifecycle status of an agent session."""

    PENDING = "pending"
    ACTIVE = "active"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TaskStatus(str, enum.Enum):
    """Lifecycle status of an individual task within a session."""

    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    BLOCKED = "blocked"
    CANCELLED = "cancelled"


class ExecutionStatus(str, enum.Enum):
    """Status of a single agent execution attempt."""

    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    TIMEOUT = "timeout"


class MemoryType(str, enum.Enum):
    """Classification of memory entries in the memory subsystem."""

    EPISODIC = "episodic"
    SEMANTIC = "semantic"
    PROCEDURAL = "procedural"


class SourceType(str, enum.Enum):
    """Origin type for knowledge documents."""

    ARXIV = "arxiv"
    WEB = "web"
    WIKIPEDIA = "wikipedia"
    PDF = "pdf"
    MANUAL = "manual"


class ReflectionType(str, enum.Enum):
    """Scope of a reflection record."""

    TASK = "task"
    SESSION = "session"
    STRATEGY = "strategy"


class Priority(str, enum.Enum):
    """Task priority levels, ordered from lowest to highest."""

    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    CRITICAL = "critical"
