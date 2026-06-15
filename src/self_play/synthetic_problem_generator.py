'''synthetic_problem_generator.py

Generates synthetic problems for self‑play. Uses simple templates and random parameter insertion.
''' 

import random
from typing import Dict

class SyntheticProblemGenerator:
    def __init__(self):
        # Define a few problem templates.
        self.templates = [
            "Optimize API latency for service {service} under load {load}%.",
            "Resolve data inconsistency in table {table} after merge.",
            "Design a fallback strategy for component {component} when failure rate exceeds {threshold}%.",
        ]
        self.services = ["auth", "billing", "search"]
        self.tables = ["users", "orders", "products"]
        self.components = ["cache", "queue", "worker"]

    def generate(self) -> Dict[str, str]:
        """Return a dict describing a synthetic problem.
        
        Example: {"description": "Optimize API latency for service auth under load 73%"}
        """
        template = random.choice(self.templates)
        if "service" in template:
            problem = template.format(service=random.choice(self.services), load=random.randint(50, 100))
        elif "table" in template:
            problem = template.format(table=random.choice(self.tables))
        else:
            problem = template.format(component=random.choice(self.components), threshold=random.randint(10, 30))
        return {"description": problem}

    def __repr__(self):
        return f"SyntheticProblemGenerator(templates={len(self.templates)})"
