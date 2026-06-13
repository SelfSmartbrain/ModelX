# Autonomous Agent Platform

> Phase 1 AGI-Inspired Autonomous Agent — A production-ready cognitive agent combining LLM reasoning, long-term memory, RAG, task planning, tool usage, reflection, and multi-agent coordination.

**This system is NOT intended to be AGI.** It is a foundational architecture incorporating the major components commonly considered prerequisites for AGI research.

---

## Architecture

```
USER
  ↓
ORCHESTRATOR AGENT (LangGraph StateGraph)
  ↓
  ├── MEMORY AGENT      → Redis (short-term) + PostgreSQL + Qdrant (long-term)
  ├── RESEARCH AGENT    → ArXiv, Web Search, Wikipedia, Knowledge Base
  ├── EXECUTION AGENT   → Sandboxed Python, API Calls, File Ops, SQL
  └── REFLECTION AGENT  → Root Cause Analysis, Improvement Strategies
  ↓
Vector Database (Qdrant) · Knowledge Store (PostgreSQL) · Tools · External APIs
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Orchestration** | LangGraph (StateGraph with checkpointing) |
| **LLM** | Claude Sonnet (Anthropic API) |
| **Embeddings** | OpenAI text-embedding-3-large (3072 dims) |
| **Database** | PostgreSQL 17 (via SQLAlchemy 2.0 async) |
| **Vector DB** | Qdrant |
| **Cache** | Redis 7 |
| **API** | FastAPI |
| **Migrations** | Alembic |
| **Containerization** | Docker Compose |

## Project Structure

```
├── src/
│   ├── agents/           # LangGraph agent implementations
│   │   ├── orchestrator.py   # Central StateGraph coordinator
│   │   ├── memory_agent.py   # Short/long-term memory ops
│   │   ├── research_agent.py # Multi-source research pipeline
│   │   ├── execution_agent.py # Sandboxed code execution
│   │   ├── reflection_agent.py # Post-execution analysis
│   │   └── state.py          # Shared TypedDict state
│   ├── api/              # FastAPI application
│   │   ├── main.py           # App factory & lifespan
│   │   ├── auth.py           # JWT + API key auth
│   │   ├── middleware.py     # CORS, request logging
│   │   ├── dependencies.py   # DI container
│   │   ├── routes/           # Endpoint routers
│   │   └── schemas/          # Pydantic v2 models
│   ├── config/           # Settings & logging
│   ├── db/               # SQLAlchemy models & repositories
│   ├── memory/           # Short-term (Redis) + Long-term (PG+Qdrant)
│   ├── rag/              # RAG pipeline (embed, chunk, ingest, retrieve)
│   └── tools/            # 10 LangChain-compatible tools
├── tests/                # Unit, integration, and E2E tests
├── alembic/              # Database migrations
├── docker/               # Sandbox Dockerfile
├── docker-compose.yml    # Full infrastructure stack
├── Dockerfile            # API server image
└── pyproject.toml        # Dependencies & project config
```

## Quick Start

### Prerequisites

- Python 3.12+
- Docker & Docker Compose
- API keys: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`

### 1. Clone & Configure

```bash
git clone git@github.com:genius-0963/ModelX.git
cd ModelX
cp .env.example .env
# Edit .env with your API keys
```

### 2. Start Infrastructure

```bash
docker compose up -d postgres qdrant redis
```

### 3. Install Dependencies

```bash
pip install -e ".[dev]"
```

### 4. Run Migrations

```bash
alembic upgrade head
```

### 5. Start the API Server

```bash
uvicorn src.api.main:app --reload --port 8000
```

### 6. Test It

```bash
# Health check
curl http://localhost:8000/health

# Create a goal
curl -X POST http://localhost:8000/api/v1/goals \
  -H "Content-Type: application/json" \
  -d '{"goal": "Research the latest advances in transformer architectures and summarize findings"}'

# Execute the goal
curl -X POST http://localhost:8000/api/v1/goals/{goal_id}/execute \
  -H "Content-Type: application/json" \
  -d '{}'
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Liveness probe |
| `GET` | `/health/ready` | Readiness probe |
| `POST` | `/api/v1/goals` | Create a new goal |
| `GET` | `/api/v1/goals/{id}` | Get goal details |
| `POST` | `/api/v1/goals/{id}/execute` | Execute a goal |
| `GET` | `/api/v1/tasks/{id}` | Get task details |
| `GET` | `/api/v1/tasks/by-goal/{id}` | List tasks for a goal |
| `POST` | `/api/v1/memory/store` | Store a memory |
| `POST` | `/api/v1/memory/recall` | Recall memories |
| `GET` | `/api/v1/memory/{id}` | Get a memory |
| `POST` | `/api/v1/knowledge/ingest` | Ingest knowledge |
| `POST` | `/api/v1/knowledge/search` | Search knowledge |
| `GET` | `/api/v1/reflections/{session_id}` | Get reflections |

## Agent Workflow

```
Goal Input → Analyze Goal → Recall Memories → Decompose into Tasks
     ↓
Route Task → Research Agent / Execution Agent / Memory Agent
     ↓
Integrate Results → All Done? → Reflection Agent → Generate Report → ✅ Complete
                       ↑ No         ↓
                       └── Route Next Task
```

## Running Tests

```bash
# Unit tests
pytest tests/unit/ -v

# Integration tests (requires mocked services)
pytest tests/integration/ -v -m integration

# All tests
pytest -v
```

## Environment Variables

See [`.env.example`](.env.example) for the full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ | Claude API access |
| `OPENAI_API_KEY` | ✅ | Embedding generation |
| `POSTGRES_PASSWORD` | ✅ | Database password |
| `TAVILY_API_KEY` | ❌ | Web search (optional) |

## License

MIT
