"""
Memory Fabric - Unified Memory Abstraction Layer

The MemoryFabric provides a single abstraction layer over all memory systems:
- PostgreSQL (episodic/procedural)
- Redis (working memory)
- Neo4j (structural/relational)
- Qdrant (semantic/vector)

This allows querying memory without caring where it resides.
"""

import asyncio
import logging
from datetime import datetime
from typing import Any, Dict, List, Optional, Set, Union
from dataclasses import dataclass, field
from enum import Enum
import json


logger = logging.getLogger(__name__)


class MemoryType(Enum):
    """Types of memory storage"""
    EPISODIC = "episodic"  # PostgreSQL
    SEMANTIC = "semantic"  # Qdrant
    WORKING = "working"    # Redis
    STRUCTURAL = "structural"  # Neo4j
    PROCEDURAL = "procedural"  # PostgreSQL


@dataclass
class MemoryEntry:
    """A unified memory entry"""
    content: str
    memory_type: MemoryType
    metadata: Dict[str, Any] = field(default_factory=dict)
    importance: float = 0.5
    timestamp: float = field(default_factory=lambda: datetime.now().timestamp())
    embedding: Optional[List[float]] = None
    source: str = "unknown"
    tags: List[str] = field(default_factory=list)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            "content": self.content,
            "memory_type": self.memory_type.value,
            "metadata": self.metadata,
            "importance": self.importance,
            "timestamp": self.timestamp,
            "source": self.source,
            "tags": self.tags,
        }


@dataclass
class MemoryQueryResult:
    """Result of a memory query"""
    entries: List[MemoryEntry]
    total_found: int
    query_time: float
    sources: Set[MemoryType]


class MemoryFabric:
    """
    Unified memory abstraction layer.
    
    Provides a single interface to query and store memories across
    all memory backends without needing to know where they reside.
    
    Example:
        memory.query("authentication failures")
        
    This will automatically search across all memory systems and
    return unified results.
    """
    
    def __init__(
        self,
        postgres_client: Optional[Any] = None,
        redis_client: Optional[Any] = None,
        neo4j_client: Optional[Any] = None,
        qdrant_client: Optional[Any] = None,
    ):
        self.postgres_client = postgres_client
        self.redis_client = redis_client
        self.neo4j_client = neo4j_client
        self.qdrant_client = qdrant_client
        
        # Memory backends
        self._backends: Dict[MemoryType, Any] = {}
        
        # Query statistics
        self._query_count = 0
        self._store_count = 0
        self._cache_hits = 0
        
        # Simple in-memory cache for frequently accessed memories
        self._cache: Dict[str, MemoryEntry] = {}
        self._cache_ttl = 300  # 5 minutes
    
    async def initialize(self) -> None:
        """Initialize memory fabric and connect to backends"""
        logger.info("Initializing MemoryFabric")
        
        # Initialize backends if clients are provided
        if self.postgres_client:
            self._backends[MemoryType.EPISODIC] = self.postgres_client
            self._backends[MemoryType.PROCEDURAL] = self.postgres_client
        
        if self.redis_client:
            self._backends[MemoryType.WORKING] = self.redis_client
        
        if self.neo4j_client:
            self._backends[MemoryType.STRUCTURAL] = self.neo4j_client
        
        if self.qdrant_client:
            self._backends[MemoryType.SEMANTIC] = self.qdrant_client
        
        logger.info(f"MemoryFabric initialized with {len(self._backends)} backends")
    
    async def query(
        self,
        query: str,
        memory_types: Optional[List[MemoryType]] = None,
        limit: int = 10,
        min_importance: float = 0.0,
        semantic_search: bool = True,
    ) -> List[Dict[str, Any]]:
        """
        Query memory across all backends.
        
        Args:
            query: Query string
            memory_types: Specific memory types to search (None = all)
            limit: Maximum number of results
            min_importance: Minimum importance threshold
            semantic_search: Whether to use semantic search
            
        Returns:
            List of memory entries as dictionaries
        """
        start_time = datetime.now().timestamp()
        self._query_count += 1
        
        # Check cache first
        cache_key = f"{query}:{limit}:{min_importance}"
        if cache_key in self._cache:
            self._cache_hits += 1
            logger.debug(f"Cache hit for query: {query}")
            return [self._cache[cache_key].to_dict()]
        
        # Determine which backends to search
        search_types = memory_types or list(self._backends.keys())
        
        # Query each backend in parallel
        results = []
        tasks = []
        
        for memory_type in search_types:
            if memory_type in self._backends:
                task = self._query_backend(
                    memory_type,
                    query,
                    limit,
                    min_importance,
                    semantic_search,
                )
                tasks.append(task)
        
        if tasks:
            backend_results = await asyncio.gather(*tasks, return_exceptions=True)
            
            for result in backend_results:
                if isinstance(result, Exception):
                    logger.error(f"Error querying backend: {result}")
                else:
                    results.extend(result)
        
        # Sort by importance and timestamp
        results.sort(
            key=lambda x: (x.importance, x.timestamp),
            reverse=True,
        )
        
        # Limit results
        results = results[:limit]
        
        # Cache results
        if results:
            self._cache[cache_key] = results[0]
        
        query_time = datetime.now().timestamp() - start_time
        logger.debug(f"Query completed in {query_time:.3f}s, found {len(results)} results")
        
        return [entry.to_dict() for entry in results]
    
    async def _query_backend(
        self,
        memory_type: MemoryType,
        query: str,
        limit: int,
        min_importance: float,
        semantic_search: bool,
    ) -> List[MemoryEntry]:
        """Query a specific memory backend"""
        backend = self._backends.get(memory_type)
        
        if not backend:
            return []
        
        try:
            if memory_type == MemoryType.SEMANTIC and semantic_search:
                return await self._query_semantic(backend, query, limit, min_importance)
            elif memory_type == MemoryType.WORKING:
                return await self._query_working(backend, query, limit)
            elif memory_type in (MemoryType.EPISODIC, MemoryType.PROCEDURAL):
                return await self._query_postgres(backend, query, limit, min_importance)
            elif memory_type == MemoryType.STRUCTURAL:
                return await self._query_structural(backend, query, limit)
            else:
                return []
                
        except Exception as e:
            logger.error(f"Error querying {memory_type.value}: {e}")
            return []
    
    async def _query_semantic(
        self,
        backend: Any,
        query: str,
        limit: int,
        min_importance: float,
    ) -> List[MemoryEntry]:
        """Query semantic/vector memory (Qdrant)"""
        # Placeholder for Qdrant query
        # In full implementation, would use vector similarity search
        return []
    
    async def _query_working(
        self,
        backend: Any,
        query: str,
        limit: int,
    ) -> List[MemoryEntry]:
        """Query working memory (Redis)"""
        # Placeholder for Redis query
        # In full implementation, would use Redis key search
        return []
    
    async def _query_postgres(
        self,
        backend: Any,
        query: str,
        limit: int,
        min_importance: float,
    ) -> List[MemoryEntry]:
        """Query episodic/procedural memory (PostgreSQL)"""
        # Placeholder for PostgreSQL query
        # In full implementation, would use SQL with text search
        return []
    
    async def _query_structural(
        self,
        backend: Any,
        query: str,
        limit: int,
    ) -> List[MemoryEntry]:
        """Query structural memory (Neo4j)"""
        # Placeholder for Neo4j query
        # In full implementation, would use Cypher queries
        return []
    
    async def store(
        self,
        entry: Union[MemoryEntry, Dict[str, Any]],
        memory_type: Optional[MemoryType] = None,
    ) -> str:
        """
        Store a memory entry.
        
        Args:
            entry: Memory entry (can be MemoryEntry or dict)
            memory_type: Specific memory type (auto-detected if None)
            
        Returns:
            Memory ID
        """
        self._store_count += 1
        
        # Convert dict to MemoryEntry if needed
        if isinstance(entry, dict):
            entry = MemoryEntry(**entry)
        
        # Auto-detect memory type if not specified
        if memory_type is None:
            memory_type = entry.memory_type
        
        # Store in appropriate backend
        backend = self._backends.get(memory_type)
        
        if not backend:
            logger.warning(f"No backend available for {memory_type.value}")
            return ""
        
        try:
            memory_id = await self._store_backend(backend, memory_type, entry)
            
            # Invalidate cache
            self._cache.clear()
            
            logger.debug(f"Stored memory in {memory_type.value}: {memory_id}")
            return memory_id
            
        except Exception as e:
            logger.error(f"Error storing in {memory_type.value}: {e}")
            return ""
    
    async def _store_backend(
        self,
        backend: Any,
        memory_type: MemoryType,
        entry: MemoryEntry,
    ) -> str:
        """Store in a specific backend"""
        # Placeholder implementation
        # In full implementation, would store in the appropriate backend
        return f"mem_{datetime.now().timestamp()}"
    
    async def delete(
        self,
        memory_id: str,
        memory_type: Optional[MemoryType] = None,
    ) -> bool:
        """
        Delete a memory entry.
        
        Args:
            memory_id: Memory ID to delete
            memory_type: Memory type (required for deletion)
            
        Returns:
            True if deleted, False otherwise
        """
        if not memory_type:
            logger.warning("Memory type required for deletion")
            return False
        
        backend = self._backends.get(memory_type)
        
        if not backend:
            logger.warning(f"No backend available for {memory_type.value}")
            return False
        
        try:
            # Placeholder for deletion
            # In full implementation, would delete from the backend
            self._cache.clear()
            return True
            
        except Exception as e:
            logger.error(f"Error deleting from {memory_type.value}: {e}")
            return False
    
    async def consolidate(
        self,
        source_type: MemoryType,
        target_type: MemoryType,
        importance_threshold: float = 0.7,
    ) -> int:
        """
        Consolidate memories from one type to another.
        
        Args:
            source_type: Source memory type
            target_type: Target memory type
            importance_threshold: Minimum importance to consolidate
            
        Returns:
            Number of memories consolidated
        """
        # Placeholder for memory consolidation
        # In full implementation, would move important memories
        # from working to long-term storage
        return 0
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get memory fabric metrics"""
        return {
            "query_count": self._query_count,
            "store_count": self._store_count,
            "cache_hits": self._cache_hits,
            "cache_size": len(self._cache),
            "active_backends": list(self._backends.keys()),
        }
