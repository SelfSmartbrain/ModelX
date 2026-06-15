'''concept_evolution.py

Tracks the lineage and evolution of concepts over time.
Each concept is stored with a version identifier and a parent reference.
Provides methods to retrieve the history of a concept.
''' 

from typing import List, Dict, Optional
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ConceptEvolution(Base):
    __tablename__ = "concept_evolution"
    id = Column(Integer, primary_key=True, autoincrement=True)
    term = Column(String, nullable=False)
    version = Column(Integer, nullable=False)
    parent_id = Column(Integer, ForeignKey('concept_evolution.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    metadata = Column(String, nullable=True)  # JSON string with extra info

    parent = relationship('ConceptEvolution', remote_side=[id], backref='children')

    def __repr__(self):
        return f"<ConceptEvolution term={self.term} v={self.version}>"

# Helper functions
def add_concept(session, term: str, version: int, parent_id: Optional[int] = None, metadata: Optional[str] = None):
    ce = ConceptEvolution(term=term, version=version, parent_id=parent_id, metadata=metadata)
    session.add(ce)
    session.commit()
    return ce

def get_lineage(session, term: str) -> List[ConceptEvolution]:
    # Retrieve all versions of a term ordered by version
    return session.query(ConceptEvolution).filter_by(term=term).order_by(ConceptEvolution.version).all()
