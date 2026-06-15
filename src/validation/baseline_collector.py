'''baseline_collector.py

Runs a short‑duration baseline experiment using the current Phase‑13 components.
Collects the same metrics defined in ``validation.metrics`` and persists them
to the ``validation.baseline_metrics`` table for later comparison.
''' 

import datetime
from typing import Dict, Any
from sqlalchemy import create_engine, Column, Integer, String, DateTime, JSON, MetaData, Table
from sqlalchemy.orm import sessionmaker

# Use the same DB URL as other modules (replace with env var in production)
DATABASE_URL = "postgresql://postgres:password@localhost:5432/modelx"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
metadata = MetaData()

baseline_metrics = Table(
    "baseline_metrics",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("run_timestamp", DateTime, default=datetime.datetime.utcnow),
    Column("metrics", JSON, nullable=False),
)

metadata.create_all(engine, tables=[baseline_metrics])

def collect_baseline(duration_seconds: int = 300) -> Dict[str, Any]:
    """Execute a minimal workload for *duration_seconds* and capture metrics.
    The workload can be a simple call to the reasoning engine on a dummy goal.
    """
    from ..reasoning.reasoning_engine import ReasoningEngine
    from ..reasoning.search_engine import SearchEngine
    from ..reasoning.counterfactual_engine import CounterfactualEngine
    from ..memory.working_memory import WorkingMemory
    from ..learning.experience_encoder import ExperienceEncoder
    from ..validation.metrics import reset_all, get_all_scores

    # Reset metrics to ensure a clean baseline
    reset_all()

    # Minimal setup of required components (stubs for demonstration)
    wm = WorkingMemory(ttl=60)
    se = SearchEngine(db_session=None, working_mem=wm, semantic_mem=None)  # db_session left None for baseline
    cf = CounterfactualEngine()
    re = ReasoningEngine(search_engine=se, counterfactual_engine=cf)

    # Perform a dummy reasoning task
    re.plan(goal="dummy goal", context=[])
    re.counterfactual(scenario="if X had been Y")

    # Capture scores after the short run
    scores = get_all_scores()

    # Persist to DB
    sess = Session()
    ins = baseline_metrics.insert().values(
        run_timestamp=datetime.datetime.utcnow(),
        metrics=scores,
    )
    sess.execute(ins)
    sess.commit()
    sess.close()
    print("[BaselineCollector] Baseline metrics stored", scores)
    return scores

if __name__ == "__main__":
    collect_baseline()
