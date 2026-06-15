'''memory_consolidation.py

Coordinates consolidation of memories across the hierarchy.
Provides a high‑level API that invokes the consolidation, abstraction, and forgetting engines.
''' 

from .working_memory import WorkingMemory
from .episodic_memory import EpisodicMemory  # SQLAlchemy model
from .semantic_memory import SemanticMemory
from .procedural_memory import ProceduralMemory

class MemoryConsolidation:
    """Orchestrates the consolidation process.
    
    * Merges duplicate episodic entries.
    * Abstracts high‑level concepts into semantic memory.
    * Prunes low‑utility items via the forgetting engine.
    """

    def __init__(self, db_session, semantic_mem: SemanticMemory):
        self.db_session = db_session
        self.semantic_mem = semantic_mem

    def run(self):
        # Placeholder: actual implementation will call engines.
        print("Running memory consolidation pipeline…")
        # TODO: integrate consolidation_engine, abstraction_engine, forgetting_engine

    def __repr__(self):
        return "MemoryConsolidation()"
