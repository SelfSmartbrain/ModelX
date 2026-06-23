"""
Planner - Goal-oriented planning and execution

The Planner is responsible for:
- Creating plans to achieve goals
- Decomposing goals into sub-goals
- Scheduling plan execution
- Monitoring plan progress
- Adapting plans to changing conditions
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Set, Tuple
from dataclasses import dataclass, field
from enum import Enum


logger = logging.getLogger(__name__)


class PlanStatus(Enum):
    """Status of a plan"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    ABANDONED = "abandoned"


@dataclass
class Action:
    """An action in a plan"""
    action_id: str
    description: str
    parameters: Dict[str, Any] = field(default_factory=dict)
    dependencies: List[str] = field(default_factory=list)
    estimated_duration: float = 10.0
    priority: int = 5


@dataclass
class Plan:
    """A plan to achieve a goal"""
    plan_id: str
    goal: str
    actions: List[Action]
    status: PlanStatus = PlanStatus.PENDING
    created_at: float = field(default_factory=lambda: datetime.now().timestamp())
    started_at: Optional[float] = None
    completed_at: Optional[float] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    @property
    def duration(self) -> Optional[float]:
        """Get plan duration if completed"""
        if self.started_at and self.completed_at:
            return self.completed_at - self.started_at
        return None


class Planner:
    """
    Goal-oriented planner.
    
    Creates and executes plans to achieve goals by:
    - Decomposing goals into actionable steps
    - Managing dependencies between actions
    - Scheduling action execution
    - Monitoring progress and adapting
    """
    
    def __init__(self):
        self._plans: Dict[str, Plan] = {}
        self._active_plans: Set[str] = set()
        
        # Planning strategies
        self._strategies = {
            "hierarchical": self._hierarchical_planning,
            "forward": self._forward_planning,
            "backward": self._backward_planning,
        }
        
        # Statistics
        self._plans_created = 0
        self._plans_completed = 0
        self._plans_failed = 0
    
    async def initialize(self) -> None:
        """Initialize the planner"""
        logger.info("Planner initialized")
    
    async def create_plan(
        self,
        goal: str,
        context: Optional[Dict[str, Any]] = None,
        strategy: str = "hierarchical",
    ) -> Plan:
        """
        Create a plan to achieve a goal.
        
        Args:
            goal: Goal to achieve
            context: Additional context
            strategy: Planning strategy to use
            
        Returns:
            Created plan
        """
        plan_id = f"plan_{datetime.now().timestamp()}"
        
        # Select planning strategy
        planning_func = self._strategies.get(strategy, self._hierarchical_planning)
        
        # Generate actions
        actions = await planning_func(goal, context or {})
        
        # Create plan
        plan = Plan(
            plan_id=plan_id,
            goal=goal,
            actions=actions,
            metadata={"strategy": strategy, "context": context},
        )
        
        self._plans[plan_id] = plan
        self._plans_created += 1
        
        logger.info(f"Created plan {plan_id} with {len(actions)} actions")
        return plan
    
    async def _hierarchical_planning(
        self,
        goal: str,
        context: Dict[str, Any],
    ) -> List[Action]:
        """
        Hierarchical planning: decompose goal into sub-goals recursively.
        
        This is the default strategy and works well for complex goals.
        """
        actions = []
        
        # Placeholder for hierarchical decomposition
        # In full implementation, would use recursive goal decomposition
        
        # Simple example: create a few placeholder actions
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Analyze goal: {goal}",
            priority=10,
        ))
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Identify resources for: {goal}",
            priority=8,
            dependencies=[actions[0].action_id],
        ))
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Execute plan for: {goal}",
            priority=9,
            dependencies=[actions[1].action_id],
        ))
        
        return actions
    
    async def _forward_planning(
        self,
        goal: str,
        context: Dict[str, Any],
    ) -> List[Action]:
        """
        Forward planning: start from current state and move toward goal.
        """
        actions = []
        
        # Placeholder for forward planning
        # In full implementation, would use state-space search
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Assess current state for: {goal}",
            priority=10,
        ))
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Identify next steps toward: {goal}",
            priority=8,
            dependencies=[actions[0].action_id],
        ))
        
        return actions
    
    async def _backward_planning(
        self,
        goal: str,
        context: Dict[str, Any],
    ) -> List[Action]:
        """
        Backward planning: start from goal and work backward to current state.
        """
        actions = []
        
        # Placeholder for backward planning
        # In full implementation, would use goal regression
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Define final state for: {goal}",
            priority=10,
        ))
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Identify prerequisites for: {goal}",
            priority=9,
            dependencies=[actions[0].action_id],
        ))
        
        actions.append(Action(
            action_id=f"action_{len(actions)}",
            description=f"Plan from current state to prerequisites",
            priority=8,
            dependencies=[actions[1].action_id],
        ))
        
        return actions
    
    async def execute_plan(
        self,
        plan_id: str,
    ) -> bool:
        """
        Execute a plan.
        
        Args:
            plan_id: Plan identifier
            
        Returns:
            True if plan completed successfully
        """
        if plan_id not in self._plans:
            logger.error(f"Plan {plan_id} not found")
            return False
        
        plan = self._plans[plan_id]
        plan.status = PlanStatus.IN_PROGRESS
        plan.started_at = datetime.now().timestamp()
        self._active_plans.add(plan_id)
        
        try:
            # Execute actions in dependency order
            executed_actions = set()
            
            while len(executed_actions) < len(plan.actions):
                # Find actions whose dependencies are satisfied
                ready_actions = [
                    action for action in plan.actions
                    if action.action_id not in executed_actions
                    and all(dep in executed_actions for dep in action.dependencies)
                ]
                
                if not ready_actions:
                    logger.error(f"Plan {plan_id} has circular dependencies")
                    plan.status = PlanStatus.FAILED
                    self._plans_failed += 1
                    return False
                
                # Execute ready actions (could be parallelized)
                for action in ready_actions:
                    success = await self._execute_action(action)
                    
                    if not success:
                        logger.error(f"Action {action.action_id} failed")
                        plan.status = PlanStatus.FAILED
                        self._plans_failed += 1
                        return False
                    
                    executed_actions.add(action.action_id)
            
            # Plan completed successfully
            plan.status = PlanStatus.COMPLETED
            plan.completed_at = datetime.now().timestamp()
            self._active_plans.discard(plan_id)
            self._plans_completed += 1
            
            logger.info(f"Plan {plan_id} completed successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error executing plan {plan_id}: {e}")
            plan.status = PlanStatus.FAILED
            self._plans_failed += 1
            return False
    
    async def _execute_action(self, action: Action) -> bool:
        """
        Execute a single action.
        
        Args:
            action: Action to execute
            
        Returns:
            True if action executed successfully
        """
        # Placeholder for action execution
        # In full implementation, would delegate to appropriate executor
        logger.debug(f"Executing action {action.action_id}: {action.description}")
        
        # Simulate execution time
        await asyncio.sleep(min(1.0, action.estimated_duration / 10.0))
        
        return True
    
    async def adapt_plan(
        self,
        plan_id: str,
        new_context: Dict[str, Any],
    ) -> bool:
        """
        Adapt a plan to changing conditions.
        
        Args:
            plan_id: Plan identifier
            new_context: New context information
            
        Returns:
            True if plan adapted successfully
        """
        if plan_id not in self._plans:
            logger.error(f"Plan {plan_id} not found")
            return False
        
        plan = self._plans[plan_id]
        
        # Placeholder for plan adaptation
        # In full implementation, would re-plan with new
        
        logger.info(f"Adapting plan {plan_id} to new context")
        return True
    
    def get_plan(self, plan_id: str) -> Optional[Plan]:
        """Get a plan by ID"""
        return self._plans.get(plan_id)
    
    def get_active_plans(self) -> List[Plan]:
        """Get all active plans"""
        return [self._plans[pid] for pid in self._active_plans]
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get planner metrics"""
        return {
            "plans_created": self._plans_created,
            "plans_completed": self._plans_completed,
            "plans_failed": self._plans_failed,
            "active_plans": len(self._active_plans),
            "success_rate": (
                self._plans_completed / self._plans_created
                if self._plans_created > 0 else 0.0
            ),
        }
