# ModelX: Autonomous Agent Platform

[![Python Version](https://img.shields.io/badge/python-3.11%2B-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-00a393.svg)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Enabled-orange.svg)](https://python.langchain.com/docs/langgraph)

> **ModelX** is a production-grade, AGI-inspired cognitive architecture designed to bridge the gap between reactive AI assistants and proactive, continuous-learning autonomous agents.

---

## 📖 Documentation

Welcome to the ModelX Documentation. This platform is designed to be maintained by large engineering teams and deployed in highly scalable environments. The documentation is split into logical domains:

### Part 1: Overview & Architecture
[Read the Overview & Architecture Docs](./docs/01_overview_and_architecture.md)
* **Section 1**: Executive Summary
* **Section 2**: System Overview
* **Section 3**: Complete Architecture (Mermaid Diagrams)
* **Section 4**: Directory Structure

### Part 2: Data & Agent Models
[Read the Database & Agents Docs](./docs/02_database_and_agents.md)
* **Section 5**: Database Documentation & ER Diagrams
* **Section 6**: Agent Documentation (Orchestrator, Research, Execution, etc.)

### Part 3: Memory & RAG Systems
[Read the Memory & RAG Docs](./docs/03_memory_and_rag.md)
* **Section 7**: Memory System Documentation (Episodic, Semantic, Procedural)
* **Section 8**: Retrieval-Augmented Generation (RAG) Documentation

### Part 4: Meta-Learning & Autonomy
[Read the Meta-Learning & Autonomous Docs](./docs/04_meta_learning_and_autonomous.md)
* **Section 9**: Meta-Learning Documentation (Strategy Optimization, Learning Engine)
* **Section 10**: Autonomous Research System (Goal Generation, Knowledge Gaps)
* **Section 11**: LangGraph State Machine (Complete Workflows)

### Part 5: APIs & Workflows
[Read the API & Workflows Docs](./docs/05_api_and_workflows.md)
* **Section 12**: API Documentation (Endpoints, Auth, Schemas)
* **Section 13**: Workflow Documentation (E2E sequence diagrams)

### Part 6: Deployment & Operations
[Read the Deployment & Operations Docs](./docs/06_deployment_and_operations.md)
* **Section 14**: Deployment Guide (Docker, Cloud, Scaling)
* **Section 15**: Observability (Metrics, Tracing, Logging)
* **Section 16**: Security Documentation (Sandboxing, Threat Models)

### Part 7: Development & Performance
[Read the Development & Testing Docs](./docs/07_development_and_testing.md)
* **Section 17**: Developer Guide (Onboarding, Local Setup)
* **Section 18**: Testing Documentation (Unit, Integration, E2E)
* **Section 19**: Performance Documentation (Latency, Token Limits)

### Part 8: Roadmap & Appendices
[Read the Roadmap & Appendices Docs](./docs/08_roadmap_and_appendices.md)
* **Section 20**: Future Roadmap (Phases 1-10)
* **Section 21**: Appendices (Glossary, ADRs)

---

## 🚀 Quick Start

To run the platform locally for development:

```bash
# 1. Clone the repository
git clone git@github.com:genius-0963/ModelX.git
cd ModelX

# 2. Setup Environment Variables
cp .env.example .env
# Fill in ANTHROPIC_API_KEY and OPENAI_API_KEY in .env

# 3. Start Core Infrastructure (DBs)
docker-compose up -d postgres qdrant redis neo4j

# 4. Install Dependencies
python -m venv venv
source venv/bin/activate
pip install -e .[dev]

# 5. Run Database Migrations
alembic upgrade head

# 6. Start the API
uvicorn src.api.main:app --reload
```

---

## 🧠 What makes ModelX different?

Most AI platforms today are **Stateless** and **Reactive**. They wait for a prompt, execute it, and forget it ever happened.

**ModelX is Stateful and Proactive:**
- **It Learns:** The `LearningEngine` tracks failures and updates execution strategies to avoid making the same mistake twice.
- **It Remembers:** Combines Vector Search (Qdrant), Relational Data (PostgreSQL), and Graph Topologies (Neo4j) to build a human-like memory hierarchy.
- **It Explores:** The `AutonomousResearchLoop` endlessly scans its own Knowledge Graph for contradictions or gaps, autonomously generates goals, and spends idle compute time exploring those topics.

Please refer to the detailed [docs/](./docs/) directory for an exhaustive breakdown of the platform's capabilities.
