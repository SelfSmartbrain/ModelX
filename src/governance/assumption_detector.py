"""assumption_detector.py

Phase 16B: Assumption Detector

Identifies hidden assumptions in decision-making strategies.
Detects:
- Implicit beliefs about the environment
- Unstated dependencies
- Assumptions about resource availability
- Assumptions about time constraints
- Assumptions about stakeholder behavior
"""

from __future__ import annotations

import uuid
import re
from typing import Dict, List, Optional, Any, Set
from enum import Enum
from dataclasses import dataclass, field

from src.config.logging import get_logger

logger = get_logger(__name__)


class AssumptionType(str, Enum):
    """Types of assumptions."""
    RESOURCE = "resource"
    TIME = "time"
    DEPENDENCY = "dependency"
    STAKEHOLDER = "stakeholder"
    ENVIRONMENT = "environment"
    TECHNICAL = "technical"
    UNCERTAINTY = "uncertainty"


class AssumptionStrength(str, Enum):
    """Strength of an assumption."""
    STRONG = "strong"
    MODERATE = "moderate"
    WEAK = "weak"
    SPECULATIVE = "speculative"


@dataclass
class Assumption:
    """An identified assumption."""
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    assumption_type: AssumptionType = AssumptionType.RESOURCE
    description: str = ""
    source: str = ""  # where this assumption was found
    strength: AssumptionStrength = AssumptionStrength.MODERATE
    confidence: float = 0.5
    testable: bool = True
    tested: bool = False
    test_result: Optional[bool] = None
    impact_if_wrong: str = "medium"
    mitigation_strategy: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "assumption_type": self.assumption_type.value,
            "description": self.description,
            "source": self.source,
            "strength": self.strength.value,
            "confidence": self.confidence,
            "testable": self.testable,
            "tested": self.tested,
            "test_result": self.test_result,
            "impact_if_wrong": self.impact_if_wrong,
            "mitigation_strategy": self.mitigation_strategy,
            "metadata": self.metadata,
        }


class AssumptionDetector:
    """Detects hidden assumptions in strategies and decisions."""
    
    def __init__(self):
        self.assumption_patterns = {
            AssumptionType.RESOURCE: [
                r"we have (enough|sufficient) (resources|budget|compute)",
                r"resource (availability|constraints)",
                r"budget (limit|cap)",
            ],
            AssumptionType.TIME: [
                r"within (time|deadline)",
                r"(quick|fast) enough",
                r"time (constraint|limit)",
            ],
            AssumptionType.DEPENDENCY: [
                r"(depends|relies) on",
                r"requires (that|the)",
                r"assuming (that|the)",
            ],
            AssumptionType.STAKEHOLDER: [
                r"(user|customer|stakeholder) will",
                r"(market|demand) will",
                r"(accept|adopt|use)",
            ],
            AssumptionType.ENVIRONMENT: [
                r"(market|environment) conditions",
                r"(external|outside) factors",
                r"(stable|unchanged)",
            ],
            AssumptionType.TECHNICAL: [
                r"(technology|system) can",
                r"(feasible|possible) to",
                r"(technical|engineering) constraints",
            ],
            AssumptionType.UNCERTAINTY: [
                r"(likely|probably|expected)",
                r"(low|high) probability",
                r"(uncertainty|risk) is",
            ],
        }
        logger.info("AssumptionDetector initialized")
    
    def detect_assumptions(
        self,
        text: str,
        context: Optional[Dict[str, Any]] = None,
    ) -> List[Assumption]:
        """Detect assumptions in text."""
        assumptions = []
        context = context or {}
        
        for assumption_type, patterns in self.assumption_patterns.items():
            for pattern in patterns:
                matches = re.finditer(pattern, text, re.IGNORECASE)
                for match in matches:
                    assumption = Assumption(
                        assumption_type=assumption_type,
                        description=match.group(0),
                        source="text_analysis",
                        strength=self._infer_strength(match.group(0)),
                        confidence=0.7,
                    )
                    assumptions.append(assumption)
        
        # Detect assumptions from context
        assumptions.extend(self._detect_from_context(context))
        
        logger.info(f"Detected {len(assumptions)} assumptions")
        
        return assumptions
    
    def _infer_strength(self, text: str) -> AssumptionStrength:
        """Infer the strength of an assumption from text."""
        strong_indicators = ["certain", "definitely", "will", "must"]
        weak_indicators = ["might", "could", "possibly", "maybe", "likely"]
        
        text_lower = text.lower()
        
        if any(indicator in text_lower for indicator in strong_indicators):
            return AssumptionStrength.STRONG
        elif any(indicator in text_lower for indicator in weak_indicators):
            return AssumptionStrength.WEAK
        else:
            return AssumptionStrength.MODERATE
    
    def _detect_from_context(self, context: Dict[str, Any]) -> List[Assumption]:
        """Detect assumptions from decision context."""
        assumptions = []
        
        # Resource assumptions
        resources = context.get("available_resources", {})
        if resources:
            for resource, value in resources.items():
                assumptions.append(Assumption(
                    assumption_type=AssumptionType.RESOURCE,
                    description=f"Resource {resource} will be available at level {value}",
                    source="context",
                    strength=AssumptionStrength.MODERATE,
                ))
        
        # Time assumptions
        time_horizon = context.get("time_horizon")
        if time_horizon:
            assumptions.append(Assumption(
                assumption_type=AssumptionType.TIME,
                description=f"Time horizon of {time_horizon} is appropriate",
                source="context",
                strength=AssumptionStrength.MODERATE,
            ))
        
        # Constraint assumptions
        constraints = context.get("constraints", [])
        for constraint in constraints:
            assumptions.append(Assumption(
                assumption_type=AssumptionType.DEPENDENCY,
                description=f"Constraint '{constraint}' will hold",
                source="context",
                strength=AssumptionStrength.MODERATE,
            ))
        
        return assumptions
    
    def detect_from_decision(self, decision_data: Dict[str, Any]) -> List[Assumption]:
        """Detect assumptions from a complete decision."""
        assumptions = []
        
        # From reasoning
        reasoning = decision_data.get("reasoning", "")
        if reasoning:
            assumptions.extend(self.detect_assumptions(reasoning))
        
        # From context
        context = decision_data.get("context", {})
        assumptions.extend(self._detect_from_context(context))
        
        # From selected option
        options = decision_data.get("options", [])
        selected_id = decision_data.get("selected_option_id")
        selected = next((opt for opt in options if opt.get("id") == selected_id), None)
        
        if selected:
            # From benefits
            for benefit in selected.get("benefits", []):
                assumptions.extend(self.detect_assumptions(benefit))
            
            # From drawbacks
            for drawback in selected.get("drawbacks", []):
                assumptions.extend(self.detect_assumptions(drawback))
        
        # Remove duplicates
        unique_assumptions = self._deduplicate_assumptions(assumptions)
        
        return unique_assumptions
    
    def _deduplicate_assumptions(self, assumptions: List[Assumption]) -> List[Assumption]:
        """Remove duplicate assumptions."""
        seen = set()
        unique = []
        
        for assumption in assumptions:
            key = (assumption.assumption_type, assumption.description.lower())
            if key not in seen:
                seen.add(key)
                unique.append(assumption)
        
        return unique
    
    def assess_assumption_risk(self, assumption: Assumption) -> Dict[str, Any]:
        """Assess the risk if an assumption is wrong."""
        risk_factors = {
            "strength": {
                AssumptionStrength.STRONG: 0.8,
                AssumptionStrength.MODERATE: 0.5,
                AssumptionStrength.WEAK: 0.3,
                AssumptionStrength.SPECULATIVE: 0.2,
            },
            "impact": {
                "critical": 0.9,
                "high": 0.7,
                "medium": 0.5,
                "low": 0.3,
            },
        }
        
        strength_risk = risk_factors["strength"].get(assumption.strength, 0.5)
        impact_risk = risk_factors["impact"].get(assumption.impact_if_wrong, 0.5)
        
        overall_risk = strength_risk * impact_risk
        
        return {
            "assumption_id": assumption.id,
            "strength_risk": strength_risk,
            "impact_risk": impact_risk,
            "overall_risk": overall_risk,
            "risk_level": "high" if overall_risk > 0.6 else "medium" if overall_risk > 0.3 else "low",
        }
    
    def generate_mitigation(self, assumption: Assumption) -> str:
        """Generate a mitigation strategy for an assumption."""
        if not assumption.testable:
            return "Cannot test - consider reducing dependency on this assumption"
        
        if assumption.assumption_type == AssumptionType.RESOURCE:
            return "Implement resource monitoring and contingency planning"
        elif assumption.assumption_type == AssumptionType.TIME:
            return "Build in buffer time and milestone checkpoints"
        elif assumption.assumption_type == AssumptionType.DEPENDENCY:
            return "Identify alternative dependencies and reduce coupling"
        elif assumption.assumption_type == AssumptionType.STAKEHOLDER:
            return "Conduct stakeholder validation and gather feedback early"
        elif assumption.assumption_type == AssumptionType.ENVIRONMENT:
            return "Monitor environmental changes and have adaptation strategies"
        elif assumption.assumption_type == AssumptionType.TECHNICAL:
            return "Create proof-of-concept and technical validation"
        else:
            return "Monitor assumption validity and have contingency plans"
