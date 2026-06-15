'''learning_scheduler.py

Decides when to trigger different learning sub‑processes (consolidation, abstraction, forgetting, model fine‑tuning).
A simple rule‑based scheduler is provided; it can be extended to a priority queue.
''' 

from datetime import datetime, timedelta

class LearningScheduler:
    def __init__(self, encoder):
        self.encoder = encoder
        self.last_consolidation = None
        self.last_fine_tune = None
        # configurable intervals
        self.consolidation_interval = timedelta(hours=2)
        self.fine_tune_interval = timedelta(hours=24)

    def _needs_consolidation(self) -> bool:
        if not self.last_consolidation:
            return True
        return datetime.utcnow() - self.last_consolidation > self.consolidation_interval

    def _needs_fine_tune(self) -> bool:
        if not self.last_fine_tune:
            return True
        return datetime.utcnow() - self.last_fine_tune > self.fine_tune_interval

    def run(self):
        """Execute scheduled learning steps.
        
        Currently prints actions; real implementation would call the respective engines.
        """
        if self._needs_consolidation():
            print("[LearningScheduler] Running memory consolidation")
            # TODO: invoke consolidation engine
            self.last_consolidation = datetime.utcnow()
        if self._needs_fine_tune():
            print("[LearningScheduler] Running model fine‑tuning (stub)")
            # TODO: trigger model fine‑tuning pipeline
            self.last_fine_tune = datetime.utcnow()
        print("[LearningScheduler] Scheduler cycle complete")
