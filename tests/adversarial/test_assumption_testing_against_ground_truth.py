"""
Independent test — not derived from test_phase_14_17_integration.py.
Tests that assumption testing checks against real ground truth, not just internal consistency.
"""
import pytest
from src.governance.assumption_detector import AssumptionDetector, Assumption

@pytest.mark.asyncio
async def test_false_assumption_is_detected_as_false():
    """Test that an objectively false assumption is detected as false."""
    detector = AssumptionDetector()
    
    # Create an assumption that is objectively false based on test context
    assumption = Assumption(
        description="progress_records has fewer than 10 rows",
        testable=True,
    )
    
    # Provide test context that should make this false
    test_context = {
        "available_resources": {"progress_records": 1000},  # Contradicts the assumption
    }
    
    result = await detector.test_assumption(assumption, test_context=test_context)
    
    assert result.tested is True, "FAIL: test_assumption did not run a test"
    # The assumption claims <10 rows, but context says 1000. This should fail.
    # However, looking at the source, test_assumption only checks if resources exist,
    # not their actual values. This is the core issue.
    assert result.test_result is False, (
        "FAIL: assumption is objectively false (1000 rows, claim says <10) "
        "but test_assumption did not detect this — it is checking something "
        "other than real state"
    )

@pytest.mark.asyncio
async def test_assumption_flips_on_retest_after_state_changes():
    """Test that retest reflects changed real-world state."""
    detector = AssumptionDetector()
    assumption = Assumption(
        description="progress_records has fewer than 10 rows",
        testable=True,
    )
    
    # First test: context says 1000 rows (should be false)
    first_context = {"available_resources": {"progress_records": 1000}}
    first = await detector.test_assumption(assumption, test_context=first_context)
    
    # The current implementation doesn't actually check values, so this will pass
    # even though it should fail. This is the bug we're detecting.
    
    # Now make the assumption true in context
    second_context = {"available_resources": {"progress_records": 5}}
    retested = await detector.test_assumption(assumption, test_context=second_context)
    
    # If the test actually checked real state, these would differ
    # But the current implementation just checks if the key exists
    # So both will return True, which is the FAIL condition
    assert first.test_result != retested.test_result, (
        "FAIL: retest did not reflect the changed real-world state — "
        "this means the 'test' is not actually querying live state"
    )
