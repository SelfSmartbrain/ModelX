<div align="center">
  <img src="https://img.icons8.com/color/144/000000/artificial-intelligence.png" alt="ModelX Logo" width="120" />

  # ModelX

  **The Open-Source, Recursively Self-Improving Artificial General Intelligence Platform**

  <p align="center">
    <a href="https://github.com/genius-0963/ModelX/actions"><img src="https://img.shields.io/github/actions/workflow/status/genius-0963/ModelX/ci.yml?branch=main&label=Build" alt="Build Status" /></a>
    <a href="https://github.com/genius-0963/ModelX/releases"><img src="https://img.shields.io/github/v/release/genius-0963/ModelX?color=blue" alt="Version" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" /></a>
    <a href="https://codecov.io/gh/genius-0963/ModelX"><img src="https://img.shields.io/codecov/c/github/genius-0963/ModelX?color=success" alt="Coverage" /></a>
  </p>
  
  *An enterprise-grade autonomous agent architecture capable of scientific discovery, recursive architecture evolution, and long-horizon project execution.*
</div>

---

## 1. Lead Engineer's Executive Summary

**ModelX** solves the "plateau problem" in artificial intelligence by replacing static, prompt-engineered agents with a dynamic, mathematically verifiable, recursively self-improving cognitive architecture.

Over the last deployment cycle, the system has evolved from a basic RAG-based task runner into a **Real-World Autonomous Executor**. It doesn't just execute tasks; it writes its own Python tools (Phase 8), maps causal logic into a World Model (Phase 9), rewrites its own LangGraph source code to fix architectural bottlenecks (Phase 10), scientifically benchmarks its own capability growth (Phase 11), and finally, autonomously detects real-world opportunities to spawn multi-week projects with strict resource budgets (Phase 12).

---

## 2. Platform Capability Distribution

```mermaid
pie title Autonomous Capability Distribution
    "Long-Horizon Execution (Phase 12)" : 30
    "Architecture Evolution (Phase 10)" : 25
    "World Model Logic (Phase 9)" : 20
    "Scientific Verification (Phase 11)" : 15
    "Autonomous Tooling (Phase 8)" : 10
```

---

## 3. High-Level Master Architecture

```mermaid
flowchart TB
    subgraph External Environment
        Web[Web APIs]
        Repos[GitHub Repos]
        DBs[Databases]
    end

    subgraph API Gateway
        FastAPI[FastAPI Backend]
        DI[Service Registry / DI]
    end

    subgraph Cognitive Core
        Orchestrator[LangGraph Orchestrator]
        Workers[Async APScheduler Workers]
        Sandbox[Dockerized Python Sandbox]
    end

    subgraph Memory & State
        PostgreSQL[(PostgreSQL State)]
        Neo4j[(Neo4j Causal Graph)]
        Qdrant[(Qdrant Vector DB)]
        Redis[(Redis Cache/Queue)]
    end

    Web <--> Orchestrator
    Repos <--> Sandbox
    FastAPI --> Orchestrator
    Orchestrator --> Sandbox
    Orchestrator --> PostgreSQL
    Orchestrator --> Neo4j
    Orchestrator --> Qdrant
```

---

## 4. Phase-by-Phase Deep Dive (Recent Implementations)

### Phase 8: Autonomous Tool Creation
The system identifies capability gaps during execution and autonomously generates, tests, and deploys its own Python tools into a secure Sandbox.

```mermaid
flowchart LR
    DetectGap[Detect Capability Gap] --> GenerateCode[LLM Writes Python Tool]
    GenerateCode --> SandboxTest[Execute in Sandbox]
    SandboxTest -- Fails --> DebugCode[Debug & Mutate]
    DebugCode --> SandboxTest
    SandboxTest -- Passes --> DeployTool[Register in Tool Registry]
```

### Phase 9: World Model & Causal Logic
Instead of just storing semantic memories, ModelX builds a causal understanding of the world using Bayesian Belief updates.

```mermaid
flowchart LR
    Observe[Pattern Discovery] --> Causal[Causal Reasoner]
    Causal --> Hypothesis[Hypothesis Generator]
    Hypothesis --> Experiment[Experiment Execution]
    Experiment --> Bayesian[Belief Engine Update]
    Bayesian --> Prediction[Prediction Engine]
```

### Phase 10: Architecture Evolution (Self-Rewriting)
ModelX tracks its own LangGraph execution bottlenecks, generates architectural hypotheses, mutates its own topologies (`CognitiveGenomes`), and runs them in a shadow sandbox to see if fitness improves. If it does, it promotes the new architecture.

```mermaid
sequenceDiagram
    participant Orchestrator
    participant BottleneckDetector
    participant GenomeMutator
    participant Sandbox
    participant PromotionEngine
    
    Orchestrator->>BottleneckDetector: Report High Latency in Node X
    BottleneckDetector->>GenomeMutator: Generate Mutation Candidate
    GenomeMutator->>Sandbox: Execute Candidate vs Control
    Sandbox-->>PromotionEngine: Fitness Score: +18%
    PromotionEngine->>Orchestrator: Hot-Swap to New Architecture
```

### Phase 11: Capability Verification & Transfer Learning
To prove the architecture is actually becoming more intelligent, the system runs Universal Benchmarks (Reasoning, Math, Coding) and maps "Skill Bleed" (Transfer Learning) to see if optimization in one domain improves another.

```mermaid
flowchart TD
    Bench[Run Universal Benchmark] --> Compare[Capability Growth Engine]
    Compare --> Transfer[Transfer Learning Evaluator]
    Transfer --> PeerReview[Multi-Agent Peer Review]
    PeerReview -- Validated --> Discovery[Discovery Tracker]
    PeerReview -- Rejected --> Regression[Regression Detector]
```

### Phase 12: Real-World Autonomy & Long Horizon Projects
ModelX scans the environment for "Opportunities" (e.g. unsolved GitHub issues, missing docs), spawns a `Project`, allocates a strict Token/Compute Budget, and executes over weeks, with automatic crash recovery.

```mermaid
flowchart TB
    Opportunity[Environment Opportunity Detector] --> Project[Project Manager]
    Project --> Milestones[Milestone Generator]
    Milestones --> Tasks[Task Decomposer]
    Tasks --> Budget[Budget Allocator]
    Budget --> Execute[Execution Orchestrator]
    Execute -- Error --> Recovery[Failure Detector & Recovery Engine]
    Recovery --> Execute
    Execute -- Success --> Impact[Impact Tracker & External Validation]
```

---

## 5. Next.js 14 Frontend Dashboards

We built over 47 distinct `page.tsx` routes to visualize the internal cognitive state of the AGI.

```bash
frontend/src/app/
├── architecture/     # Genome mutation tracking & Rollback monitoring
├── capabilities/     # Intelligence growth velocity charts & Transfer Matrices
├── environment/      # Opportunity scanning & ranking matrices
├── impact/           # External outcome ROI validation
├── peer-review/      # Multi-agent consensus debate logs
├── projects/         # Long-Horizon Gantt charts & Task Dependencies
├── world-model/      # Bayesian belief maps & Hypothesis testing
└── system-health/    # Resource Burn Rate, Token Usage, APScheduler status
```

---

## 6. Enterprise Database Design

The schema bridges Ephemeral Cognitive State with Long-Horizon Execution tracking.

```mermaid
erDiagram
    PROJECT ||--o{ PROJECT_MILESTONE : contains
    PROJECT_MILESTONE ||--o{ PROJECT_TASK : contains
    PROJECT_TASK ||--o{ TASK_EXECUTION : tracks
    PROJECT ||--o{ RESOURCE_BUDGET : enforces
    PROJECT ||--o{ EXTERNAL_OUTCOME : generates
    PROJECT_TASK ||--o{ FAILURE_INCIDENT : triggers
    FAILURE_INCIDENT ||--o{ RECOVERY_ACTION : resolves
    
    AGENT ||--o{ TASK_EXECUTION : executes
    AGENT ||--o{ REFLECTION : generates
    
    CAPABILITY_SCORE ||--o{ TRANSFER_LEARNING_RECORD : maps
    COGNITIVE_GENOME ||--o{ BENCHMARK_EXECUTION : undergoes
```

---

## 7. Security & Resilience Architecture

ModelX is designed to run autonomous code safely on remote servers.

- **Sandbox Isolation:** All autonomously written tools run in a headless, network-gated Docker container.
- **Strict Budgets:** The `BudgetAllocator` actively monitors token burn and API requests. If a loop goes rogue, the orchestrator terminates the thread.
- **Autonomous Recovery Engine:** If an external API 500s or a tool fails mid-project, the `FailureDetector` logs an incident, rolls back the LangGraph state using `ExecutionCheckpoints`, and retries with an alternate strategy.

---

## 8. Development & Deployment

### Local Setup
```bash
git clone https://github.com/genius-0963/ModelX.git
cd ModelX

# Boot Data Layer
docker-compose up -d

# Boot FastAPI Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn src.api.server:app --reload

# Boot Next.js Frontend
cd frontend
npm install
npm run dev
```

### CI/CD DevOps Pipeline

```mermaid
flowchart LR
    Push[GitHub Push] --> Lint[Flake8 / ESLint]
    Lint --> E2ETest[Real-World Autonomy E2E Test]
    E2ETest --> Build[Docker Build]
    Build --> Deploy[Kubernetes ArgoCD]
```

---

## 9. License & Open Source

ModelX is released under the **MIT License**. It stands as a verifiable, strictly engineered approach to recursive self-improvement and Artificial General Intelligence.
