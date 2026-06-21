<div align="center">
  <img src="https://img.icons8.com/color/144/000000/artificial-intelligence.png" alt="ModelX Logo" width="120" />

  # ModelX

  **The Open-Source, Recursively Self-Improving Artificial General Intelligence Platform**

  <p align="center">
    <a href="https://github.com/genius-0963/ModelX/actions"><img src="https://img.shields.io/github/actions/workflow/status/genius-0963/ModelX/ci.yml?branch=main&label=Build" alt="Build Status" /></a>
    <a href="https://github.com/genius-0963/ModelX/releases"><img src="https://img.shields.io/github/v/release/genius-0963/ModelX?color=blue" alt="Version" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" /></a>
    <a href="https://codecov.io/gh/genius-0963/ModelX"><img src="https://img.shields.io/codecov/c/github/genius-0963/ModelX?color=success" alt="Coverage" /></a>
    <a href="https://pypi.org/project/modelx/"><img src="https://img.shields.io/pypi/v/modelx?color=blue" alt="PyPI" /></a>
  </p>
  
  *An enterprise-grade autonomous agent architecture capable of scientific discovery, recursive architecture evolution, multi-modal understanding, and large-scale swarm orchestration.*
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Phase Implementation](#phase-implementation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**ModelX** is an open-source, recursively self-improving AGI platform that goes beyond traditional AI assistants. It combines multi-agent orchestration, hierarchical memory systems, meta-learning, world modeling, and now includes **multi-modal vision processing** and **swarm orchestration** capabilities.

### Vision

ModelX aims to bridge the gap between reactive AI assistants and proactive, continuous-learning Autonomous General Intelligence (AGI). Our platform enables AI agents to:
- Identify knowledge gaps autonomously
- Formulate long-term research goals
- Optimize strategies through experience
- Self-improve without human intervention
- Process visual information from screenshots
- Execute large-scale goals across 50+ parallel agent instances

### What's New

- **Phase 7: Multi-Modal Context** - Vision models for UI screenshot analysis and visual web interaction
- **Phase 8: Swarm Orchestration** - Hierarchical swarm architecture for large-scale goal execution
- **CLI Tool** - Comprehensive command-line interface for all ModelX capabilities

---

## ✨ Key Features

### Core Capabilities

- **Multi-Agent Orchestration**: LangGraph-based coordination of specialized agents (Research, Execution, Memory, Reflection)
- **Hierarchical Memory System**: Redis (working), PostgreSQL (episodic/procedural), Qdrant (semantic), Neo4j (structural)
- **Meta-Learning**: System learns how to learn, caching successful strategies
- **World Model**: Bayesian belief updates and causal reasoning
- **Autonomous Tool Creation**: Agents generate, test, and deploy their own Python tools
- **Architecture Evolution**: Self-rewriting LangGraph topologies based on performance

### New Features (Phase 7 & 8)

- **Vision Processing**: Analyze screenshots, detect UI elements, extract text using transformers
- **Visual Interaction**: Autonomous web interaction via vision models
- **Swarm Orchestration**: Director agents managing 50+ sub-orchestrator instances
- **Load Balancing**: Multiple strategies (least_loaded, round_robin, weighted)
- **Task Distribution**: Capability-based task distribution across swarm

### CLI Features

- **Multi-Provider Support**: Add any LLM provider (Anthropic, OpenAI, custom) with API keys
- **All Features Accessible**: Goals, Tasks, Memory, Knowledge, Meta-learning, Reflections, Autonomous, Vision, Swarm
- **Multiple Output Formats**: Table, JSON, and streaming output
- **Configuration Management**: Persistent configuration with environment variable fallback

---

## 🏗️ Architecture

### High-Level Architecture

```mermaid
flowchart TB
    subgraph External_Environment
        Web[Web APIs]
        Repos[GitHub Repos]
        DBs[Databases]
        Screenshots[Screenshots/Images]
    end

    subgraph API_Gateway
        FastAPI[FastAPI Backend]
        CLI[ModelX CLI]
    end

    subgraph Intelligence_Layer
        Orchestrator[LangGraph Orchestrator]
        Agents[Specialized Agents]
        Swarm[Swarm Coordinator]
    end

    subgraph Multi_Modal_Layer
        Vision[Vision Processor]
        Element[Element Detector]
        Visual[Visual Interaction]
    end

    subgraph Memory_State
        PostgreSQL[(PostgreSQL)]
        Neo4j[(Neo4j)]
        Qdrant[(Qdrant)]
        Redis[(Redis)]
    end

    Web --> FastAPI
    CLI --> FastAPI
    FastAPI --> Orchestrator
    Orchestrator --> Agents
    Orchestrator --> Swarm
    Screenshots --> Vision
    Vision --> Element
    Element --> Visual
    Agents --> PostgreSQL
    Agents --> Neo4j
    Agents --> Qdrant
    Agents --> Redis
    Swarm --> PostgreSQL
```

### System Layers

```mermaid
graph TB
    subgraph Infrastructure_Layer
        API[FastAPI REST API]
        CLI[Command Line Interface]
        Docker[Docker Compose]
    end
    
    subgraph Intelligence_Layer
        Orchestrator[LangGraph Orchestrator]
        Research[Research Agent]
        Execution[Execution Agent]
        Memory[Memory Agent]
        Reflection[Reflection Agent]
    end
    
    subgraph Multi_Modal_Layer
        Vision[Vision Processor]
        Screenshot[Screenshot Pipeline]
        Element[Element Detector]
        Visual[Visual Interaction]
    end
    
    subgraph Swarm_Layer
        Director[Director Agent]
        SubOrch[Sub-Orchestrators]
        Coordinator[Swarm Coordinator]
        Distributor[Task Distributor]
        Balancer[Load Balancer]
    end
    
    subgraph Meta_Cognitive_Layer
        Learning[Learning Engine]
        Strategy[Strategy Engine]
        Evolution[Architecture Evolution]
        WorldModel[World Model]
    end
    
    subgraph Storage_Layer
        PG[(PostgreSQL)]
        Neo[(Neo4j)]
        QD[(Qdrant)]
        Redis[(Redis)]
    end
    
    API --> Orchestrator
    CLI --> API
    Orchestrator --> Research
    Orchestrator --> Execution
    Orchestrator --> Memory
    Orchestrator --> Reflection
    Vision --> Element
    Element --> Visual
    Director --> SubOrch
    Coordinator --> Director
    Distributor --> SubOrch
    Balancer --> SubOrch
    Research --> PG
    Research --> QD
    Memory --> PG
    Memory --> Redis
    Reflection --> Learning
    Learning --> Strategy
    Strategy --> Orchestrator
    Evolution --> Orchestrator
    WorldModel --> Neo
```

---

## 🚀 Phase Implementation

### Phase 7: Multi-Modal Context

**Overview**: Integrates vision models for processing UI screenshots and visual web interaction.

**Components**:
- `VisionProcessor`: Analyzes screenshots using transformers (LayoutLM, DETR)
- `ScreenshotPipeline`: Captures and processes web screenshots via Playwright
- `ElementDetector`: Detects UI elements (buttons, inputs, links) using OpenCV
- `VisualInteractionAgent`: Autonomous web interaction via vision models

**Database Models**:
- `Screenshot`: Captured screenshots with analysis metadata
- `VisualElement`: Detected elements with bounding boxes
- `InteractionLog`: Visual interaction action logs

**API Endpoints**:
- `POST /api/v1/vision/analyze` - Analyze screenshot
- `POST /api/v1/vision/capture` - Capture from URL
- `POST /api/v1/vision/detect-elements` - Detect specific elements

**Flow Diagram**:

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant API
    participant Vision
    participant Screenshot
    participant Element
    
    User->>CLI: modelx vision analyze screenshot.png
    CLI->>API: POST /api/v1/vision/analyze
    API->>Vision: Process image
    Vision->>Screenshot: Capture & analyze
    Screenshot->>Element: Detect UI elements
    Element-->>Vision: Elements detected
    Vision-->>API: Analysis complete
    API-->>CLI: JSON response
    CLI-->>User: Formatted output
```

### Phase 8: Swarm Orchestration

**Overview**: Hierarchical swarm architecture for large-scale goal execution across 50+ parallel agent instances.

**Components**:
- `DirectorAgent`: Top-level agent managing sub-orchestrators
- `SubOrchestrator`: Worker agents executing sub-tasks
- `SwarmCoordinator`: Central coordinator managing multiple directors
- `TaskDistributor`: Capability-based task distribution
- `LoadBalancer`: Multiple load balancing strategies

**Database Models**:
- `DirectorAgent`: Director agent status and metrics
- `SwarmGoal`: High-level swarm goals
- `SubOrchestrator`: Sub-orchestrator state and capabilities
- `SwarmSubTask`: Sub-tasks assigned to sub-orchestrators

**API Endpoints**:
- `POST /api/v1/swarm/goals` - Submit swarm goal
- `GET /api/v1/swarm/status` - Get swarm metrics
- `POST /api/v1/swarm/scale` - Scale swarm
- `POST /api/v1/swarm/initialize` - Initialize swarm
- `POST /api/v1/swarm/shutdown` - Shutdown swarm

**Flow Diagram**:

```mermaid
flowchart TB
    User[User] --> CLI[ModelX CLI]
    CLI --> API[FastAPI API]
    API --> Coordinator[Swarm Coordinator]
    Coordinator --> Director[Director Agent]
    Director --> Decompose[Goal Decomposition]
    Decompose --> Distributor[Task Distributor]
    Distributor --> SubOrch[Sub-Orchestrators]
    SubOrch --> Execute[Parallel Execution]
    Execute --> Monitor[Progress Monitoring]
    Monitor --> Coordinator
    Coordinator --> API
    API --> CLI
    CLI --> User
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/genius-0963/ModelX.git
cd ModelX

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .

# Start infrastructure services
docker-compose up -d

# Run database migrations
alembic upgrade head

# Start the API server
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

### CLI Installation

```bash
# Install CLI globally
pip install -e .

# Verify installation
modelx --version
modelx --help
```

### Quick CLI Usage

```bash
# Configure LLM provider
modelx config add-provider anthropic sk-ant-api03-...

# Create a goal
modelx goal create "Build a web application" --priority 7

# List goals
modelx goal list

# Analyze a screenshot
modelx vision analyze screenshot.png --extract-text --detect-elements

# Submit to swarm
modelx swarm submit "Build SaaS platform" --priority 9 --complexity 10
```

---

## 💻 CLI Usage

### Installation

```bash
pip install -e .
```

### Configuration

```bash
# Add LLM providers
modelx config add-provider anthropic sk-ant-api03-... --model claude-sonnet-4
modelx config add-provider openai sk-proj-... --model gpt-4

# List providers
modelx config list-providers

# Set API URL
modelx config set api_url http://localhost:8000
```

### Goals Management

```bash
# Create goal
modelx goal create "Build a web app" --priority 7 --deadline "2024-12-31"

# List goals
modelx goal list

# Get goal details
modelx goal get <goal_id>

# Delete goal
modelx goal delete <goal_id>
```

### Tasks Management

```bash
# Create task
modelx task create <goal_id> "Implement auth" --priority 8

# List tasks
modelx task list --goal-id <goal_id>

# Execute task
modelx task execute <task_id>
```

### Memory & Knowledge

```bash
# Add memory
modelx memory add "User prefers dark mode" --type episodic

# Search memory
modelx memory search "user preferences"

# Add knowledge
modelx knowledge add "Python async pattern" --tags python,async
```

### Vision Processing (Phase 7)

```bash
# Analyze screenshot
modelx vision analyze screenshot.png --extract-text --detect-elements

# Capture from URL
modelx vision capture https://example.com --width 1920 --height 1080

# Detect elements
modelx vision detect screenshot.png button --min-confidence 0.8
```

### Swarm Orchestration (Phase 8)

```bash
# Initialize swarm
modelx swarm initialize

# Submit goal
modelx swarm submit "Build SaaS platform" --priority 9 --complexity 10

# Get metrics
modelx swarm metrics

# Scale swarm
modelx swarm scale --directors 10 --sub-orchestrators 50

# Shutdown
modelx swarm shutdown
```

### Output Formats

```bash
# Table format (default)
modelx goal list

# JSON format
modelx goal list --output json

# Stream format
modelx task list --output stream
```

For complete CLI documentation, see [docs/CLI_GUIDE.md](docs/CLI_GUIDE.md).

---

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Authentication

Most endpoints require authentication via API key:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:8000/api/v1/goals
```

### Main Endpoints

#### Goals

- `POST /api/v1/goals` - Create goal
- `GET /api/v1/goals` - List goals
- `GET /api/v1/goals/{id}` - Get goal
- `DELETE /api/v1/goals/{id}` - Delete goal

#### Tasks

- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - List tasks
- `GET /api/v1/tasks/{id}` - Get task
- `POST /api/v1/tasks/{id}/execute` - Execute task

#### Memory

- `POST /api/v1/memory` - Add memory
- `GET /api/v1/memory/search` - Search memory
- `GET /api/v1/memory` - List memories

#### Knowledge

- `POST /api/v1/knowledge` - Add knowledge
- `GET /api/v1/knowledge/search` - Search knowledge

#### Vision (Phase 7)

- `POST /api/v1/vision/analyze` - Analyze screenshot
- `POST /api/v1/vision/capture` - Capture from URL
- `POST /api/v1/vision/detect-elements` - Detect elements

#### Swarm (Phase 8)

- `POST /api/v1/swarm/goals` - Submit swarm goal
- `GET /api/v1/swarm/goals/{id}` - Get goal status
- `GET /api/v1/swarm/status` - Get swarm metrics
- `POST /api/v1/swarm/scale` - Scale swarm
- `POST /api/v1/swarm/initialize` - Initialize swarm
- `POST /api/v1/swarm/shutdown` - Shutdown swarm

### Interactive API Documentation

Start the server and visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (see `.env.example`):

```bash
# LLM Configuration
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_MODEL=claude-sonnet-4-20250514
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=agent_platform
POSTGRES_USER=agent
POSTGRES_PASSWORD=agent_secret_password_change_me
DATABASE_URL=postgresql+asyncpg://agent:agent_secret_password_change_me@localhost:5432/agent_platform

# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=

# Cache
REDIS_URL=redis://localhost:6379/0

# CLI Configuration
MODELX_API_URL=http://localhost:8000
MODELX_API_KEY=your-modelx-api-key
```

### CLI Configuration File

CLI configuration is stored in `~/.modelx/config.json`:

```json
{
  "providers": {
    "anthropic": {
      "api_key": "sk-ant-api03-...",
      "model": "claude-sonnet-4"
    },
    "openai": {
      "api_key": "sk-proj-...",
      "model": "gpt-4"
    }
  },
  "api_url": "http://localhost:8000",
  "api_key": "your-api-key"
}
```

---

## 🛠️ Development

### Project Structure

```
ModelX/
├── src/
│   ├── agents/           # Agent implementations
│   ├── api/              # FastAPI routes and middleware
│   ├── cli/              # Command-line interface
│   ├── db/               # Database models and migrations
│   ├── memory/           # Memory subsystems
│   ├── multimodal/       # Phase 7: Vision processing
│   ├── swarm/            # Phase 8: Swarm orchestration
│   ├── world_model/      # World model and belief engine
│   ├── evolution/        # Architecture evolution
│   └── config/           # Configuration management
├── tests/                # Test suites
├── docs/                 # Documentation
├── alembic/              # Database migrations
├── docker-compose.yml    # Infrastructure services
├── Dockerfile            # Production container
├── pyproject.toml        # Python project configuration
└── README.md             # This file
```

### Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/e2e/multimodal/vision_test.py

# Run with coverage
pytest --cov=src --cov-report=html
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Code Style

```bash
# Format code
black src/ tests/

# Lint code
flake8 src/ tests/

# Type check
mypy src/
```

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install in development mode
pip install -e ".[dev]"

# Run pre-commit hooks
pre-commit install
pre-commit run --all-files

# Run tests
pytest
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **LangGraph** - Agent orchestration framework
- **FastAPI** - Modern web framework
- **Anthropic** - Claude AI models
- **OpenAI** - GPT models and embeddings
- **Qdrant** - Vector database
- **Neo4j** - Graph database
- **Redis** - In-memory data store

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **CLI Guide**: [docs/CLI_GUIDE.md](docs/CLI_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/genius-0963/ModelX/issues)
- **Discussions**: [GitHub Discussions](https://github.com/genius-0963/ModelX/discussions)

---

## 🗺️ Roadmap

- [ ] Enhanced vision capabilities (video processing, OCR improvements)
- [ ] Advanced swarm strategies (reinforcement learning-based)
- [ ] Real-time collaboration features
- [ ] Mobile app support
- [ ] Cloud deployment templates
- [ ] Performance optimizations
- [ ] Additional LLM provider integrations

---

<div align="center">
  <p>
    <b>Built with ❤️ for the future of AGI</b>
  </p>
  <p>
    <a href="https://github.com/genius-0963/ModelX/stargazers">
      <img src="https://img.shields.io/github/stars/genius-0963/ModelX?style=social" alt="GitHub Stars">
    </a>
    <a href="https://github.com/genius-0963/ModelX/network/members">
      <img src="https://img.shields.io/github/forks/genius-0963/ModelX?style=social" alt="GitHub Forks">
    </a>
  </p>
</div>
