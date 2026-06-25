"""
Independent test — not derived from test_phase_14_17_integration.py.
Tests autonomous objective generation for non-trivial follow-up objectives.
"""
import pytest
from src.autonomy.objective_manager import ObjectiveManager

SEEDS = [
    "Audit the RAG pipeline for stale embeddings",
    "Reduce P99 latency on the orchestrator's tool-call path",
    "Summarize last week's failed runtime ticks",
]

@pytest.mark.parametrize("seed", SEEDS)
async def test_generates_nontrivial_followup(seed):
    """Test that generate_next_objective produces non-trivial follow-up objectives."""
    mgr = ObjectiveManager()
    obj = await mgr.set_objective(seed)
    await mgr.complete_objective(obj.objective_id)

    # No human input from here on
    next_obj = await mgr.generate_next_objective()

    assert next_obj is not None, "FAIL: no objective generated"
    assert next_obj.description.strip().lower() != seed.strip().lower()

    # Reject trivial templating: the new description shouldn't just be the
    # old one with a fixed suffix/prefix glued on
    trivial_patterns = ["follow up", "part 2", "next step", "continue", 
                        "refine and optimize", "validate and test", 
                        "document and share", "scale and deploy", "monitor and maintain"]
    seed_lower = seed.lower()
    new_lower = next_obj.description.lower()
    is_trivial = (
        seed_lower in new_lower and
        any(p in new_lower for p in trivial_patterns)
    )
    assert not is_trivial, (
        f"FAIL: looks like template-fill, not generation: {next_obj.description!r}"
    )

def test_three_seeds_produce_three_different_shapes():
    """Test that different seeds produce different objective structures."""
    import asyncio
    
    async def run_test():
        mgr = ObjectiveManager()
        results = []
        
        for seed in SEEDS:
            obj = await mgr.set_objective(seed)
            await mgr.complete_objective(obj.objective_id)
            next_obj = await mgr.generate_next_objective()
            results.append(next_obj.description if next_obj else None)
        
        return results
    
    descriptions = asyncio.run(run_test())
    
    # Check that not all descriptions start with the same pattern
    first_words = [d.split()[0:2] if d else [] for d in descriptions]
    # If all start with the same 2 words, it's a single template
    unique_starts = set(tuple(w) for w in first_words)
    assert len(unique_starts) > 1, (
        f"FAIL: all generated objectives follow the same template structure: {descriptions}"
    )
