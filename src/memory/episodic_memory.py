'''episodic_memory.py

Provides persistence for project runs, failures, experiments, and interactions.

Implemented using SQLAlchemy models stored in PostgreSQL.
''' 

from datetime import datetime
from typing import List, Optional
from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class EpisodicMemory(Base):
    __tablename__ = "episodic_memory"
    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    data = Column(JSON, nullable=False)  # raw event payload
    outcome = Column(String, nullable=True)

    def __repr__(self):
        return f"<EpisodicMemory id={self.id} project={self.project_id}>"

# Helper functions (to be expanded)
def store_episode(session, project_id: str, data: dict, outcome: Optional[str] = None):
    episode = EpisodicMemory(project_id=project_id, data=data, outcome=outcome)
    session.add(episode)
    session.commit()
    return episode
