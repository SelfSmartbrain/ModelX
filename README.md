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

- **Phase 13: Cognitive Operating System** - Unified cognitive organism with centralized attention, memory abstraction, and reasoning orchestration
- **Phase 7: Multi-Modal Context** - Vision models for UI screenshot analysis and visual web interaction
- **Phase 8: Swarm Orchestration** - Hierarchical swarm architecture for large-scale goal execution
- **CLI Tool** - Comprehensive command-line interface for all ModelX capabilities

---

## ✨ Key Features

### Core Capabilities

- **Cognitive Operating System**: Unified cognitive organism with centralized attention, memory abstraction, and reasoning orchestration
- **Multi-Agent Orchestration**: LangGraph-based coordination of specialized agents (Research, Execution, Memory, Reflection)
- **Hierarchical Memory System**: Redis (working), PostgreSQL (episodic/procedural), Qdrant (semantic), Neo4j (structural)
- **Meta-Learning**: System learns how to learn, caching successful strategies
- **World Model**: Bayesian belief updates and causal reasoning
- **Autonomous Tool Creation**: Agents generate, test, and deploy their own Python tools
- **Architecture Evolution**: Self-rewriting LangGraph topologies based on performance

### Cognitive OS Features (Phase 13)

- **Cognitive Kernel**: Central brain for global context, attention allocation, and cognitive resource scheduling
- **Unified Memory Graph**: Single abstraction layer over PostgreSQL, Redis, Neo4j, and Qdrant
- **Cognitive Attention**: Biological attention system with salience detection and priority management
- **Unified Reasoning**: System 1 & 2 thinking, counterfactual reasoning, planning, and debate modes
- **Agent Society**: Multi-agent collaboration with reputation, delegation, and cooperation
- **Long-Term Identity**: Self-awareness, capability tracking, and mission management
- **Research Programs**: Long-running autonomous research with scheduling and memory
- **Autonomous Development**: Self-analysis, code improvement, and repository optimization

### Vision & Swarm Features (Phase 7 & 8)

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

    subgraph Cognitive_Layer
        Kernel[Cognitive Kernel]
        Attention[Attention Engine]
        Reasoning[Reasoning Hub]
        MemoryGraph[Memory Graph]
        Society[Agent Society]
        Identity[Identity System]
        Research[Research Programs]
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
    FastAPI --> Kernel
    Kernel --> Attention
    Kernel --> Reasoning
    Kernel --> MemoryGraph
    Kernel --> Society
    Kernel --> Identity
    Kernel --> Research
    Kernel --> Orchestrator
    Orchestrator --> Agents
    Orchestrator --> Swarm
    Screenshots --> Vision
    Vision --> Element
    Element --> Visual
    MemoryGraph --> PostgreSQL
    MemoryGraph --> Neo4j
    MemoryGraph --> Qdrant
    MemoryGraph --> Redis
    Agents --> PostgreSQL
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
    
    subgraph Cognitive_Layer
        Kernel[Cognitive Kernel]
        Scheduler[Cognitive Scheduler]
        Attention[Attention Manager]
        Bus[Cognitive Bus]
        Context[Context Manager]
    end
    
    subgraph Memory_Layer
        Fabric[Memory Fabric]
        Router[Memory Router]
        Index[Memory Index]
    end
    
    subgraph Attention_Layer
        Engine[Attention Engine]
        Salience[Salience Detector]
        Priority[Priority Manager]
    end
    
    subgraph Reasoning_Layer
        Hub[Reasoning Hub]
        Planner[Planner]
        Deliberation[Deliberation Engine]
        Counterfactual[Counterfactual Reasoner]
    end
    
    subgraph Communication_Layer
        Events[Cognitive Events]
        Protocol[Agent Protocol]
        Broker[Message Broker]
    end
    
    subgraph Society_Layer
        Runtime[Society Runtime]
        Registry[Agent Registry]
        Marketplace[Task Marketplace]
    end
    
    subgraph Identity_Layer
        IdentityEngine[Identity Engine]
        SelfModel[Self Model]
        Mission[Mission Manager]
    end
    
    subgraph Research_Layer
        Program[Research Program]
        ProgramScheduler[Program Scheduler]
        ProgramMemory[Program Memory]
    end
    
    subgraph Development_Layer
        SelfDev[Self Development]
        CodeImprove[Code Improvement]
        RepoOpt[Repo Optimizer]
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
    
    API --> Kernel
    CLI --> API
    Kernel --> Scheduler
    Kernel --> Attention
    Kernel --> Bus
    Kernel --> Context
    Kernel --> Fabric
    Kernel --> Engine
    Kernel --> Hub
    Kernel --> Events
    Kernel --> Runtime
    Kernel --> IdentityEngine
    Kernel --> Program
    Kernel --> SelfDev
    Kernel --> Orchestrator
    Fabric --> Router
    Router --> Index
    Index --> PG
    Index --> Neo
    Index --> QD
    Index --> Redis
    Engine --> Salience
    Engine --> Priority
    Hub --> Planner
    Hub --> Deliberation
    Hub --> Counterfactual
    Events --> Protocol
    Events --> Broker
    Runtime --> Registry
    Runtime --> Marketplace
    IdentityEngine --> SelfModel
    IdentityEngine --> Mission
    Program --> ProgramScheduler
    Program --> ProgramMemory
    SelfDev --> CodeImprove
    SelfDev --> RepoOpt
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

### Phase 13: Cognitive Operating System

**Overview**: Transforms ModelX from a collection of intelligent components into a unified cognitive organism with centralized attention, memory abstraction, and reasoning orchestration.

**Architecture Shift**:
- **Before**: Research Agent, Execution Agent, Reflection Agent, Memory Agent operate separately
- **After**: Cognitive Kernel coordinates all agents through unified cognitive systems

**Components**:

**13A - Cognitive Kernel** (5 files)
- `CognitiveKernel`: Central orchestrator for cognitive operations
- `CognitiveScheduler`: Priority-based task scheduling with timeouts and retries
- `AttentionManager`: Cognitive attention allocation and focus management
- `CognitiveBus`: Event-driven communication system
- `ContextManager`: Global cognitive context across all agents

**13B - Unified Memory Graph** (3 files)
- `MemoryFabric`: Unified API over PostgreSQL, Redis, Neo4j, Qdrant
- `MemoryRouter`: Intelligent routing to optimal backends
- `MemoryIndex`: Unified indexing across all memory systems

**13C - Cognitive Attention System** (3 files)
- `AttentionEngine`: Core attention allocation with bottom-up/top-down modes
- `SalienceDetector`: Identifies important information (novelty, urgency, importance)
- `PriorityManager`: Task priority management with escalation and decay

**13D - Unified Reasoning Engine** (4 files)
- `ReasoningHub`: Orchestrates different reasoning modes
- `Planner`: Goal-oriented planning and execution
- `DeliberationEngine`: System 2 slow, deliberate reasoning
- `CounterfactualReasoner`: What-if scenario analysis

**13E - Cognitive Communication Bus** (3 files)
- `CognitiveEventSystem`: Event definition, emission, subscription
- `AgentProtocol`: Standardized message formats and conversation management
- `MessageBroker`: Central message routing and queuing

**13F - Agent Society Runtime** (3 files)
- `SocietyRuntime`: Manages agent society lifecycle and collaboration
- `AgentRegistry`: Agent registration, discovery, capability tracking
- `TaskMarketplace`: Task posting, bidding, and delegation

**13G - Long-Term Identity System** (3 files)
- `IdentityEngine`: Maintains persistent identity and tracks capabilities
- `SelfModel`: Models own capabilities and limitations
- `MissionManager`: Defines and tracks long-term missions

**13H - Persistent Research Programs** (3 files)
- `ResearchProgram`: Defines research programs with hypotheses and experiments
- `ProgramScheduler`: Schedules and executes research programs
- `ProgramMemory`: Stores research insights and knowledge

**13I - Autonomous Development Mode** (3 files)
- `SelfDevelopment`: Self-analysis with safety controls
- `CodeImprovement`: Code quality analysis and suggestions
- `RepoOptimizer`: Repository optimization and maintenance

**13J - Terminal-Native Interface** (CLI updates)
- `cognitive` commands: status, reason, attend
- `society` commands: create, list, add-agent
- `identity` commands: status, create-mission, missions
- `research` commands: create-program, schedule, list
- `develop` commands: analyze, optimize, improve

**Database Models** (7 new models):
- `CognitiveTask`: Cognitive tasks managed by kernel
- `AttentionRecord`: Attention allocation records
- `MemoryLink`: Links between memories in unified graph
- `ResearchProgram`: Long-running research programs
- `AgentIdentity`: Agent identity information
- `MissionState`: Long-term mission states
- `CognitiveMetric`: Cognitive performance metrics

**LangGraph Nodes** (6 new nodes):
- `attention_allocation_node`: Allocate cognitive attention
- `memory_consolidation_node`: Consolidate short-term to long-term memory
- `deliberation_node`: System 2 deliberative reasoning
- `society_planning_node`: Multi-agent collaboration planning
- `identity_update_node`: Update long-term identity
- `program_execution_node`: Execute research programs

**Flow Diagram**:

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Kernel
    participant Attention
    participant Memory
    participant Reasoning
    participant Society
    
    User->>CLI: modelx cognitive reason "Analyze data"
    CLI->>Kernel: Request reasoning
    Kernel->>Attention: Allocate attention
    Attention-->>Kernel: Attention granted
    Kernel->>Memory: Retrieve context
    Memory-->>Kernel: Context returned
    Kernel->>Reasoning: Perform reasoning
    Reasoning-->>Kernel: Result
    Kernel->>Society: Plan collaboration if needed
    Society-->>Kernel: Plan ready
    Kernel-->>CLI: Final result
    CLI-->>User: Formatted output
```

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

### Cognitive OS (Phase 13)

```bash
# Get cognitive kernel status
modelx cognitive status

# Perform reasoning
modelx cognitive reason "Analyze the data trends"

# Allocate attention to task
modelx cognitive attend "Data analysis task" --priority 0.8
```

### Agent Society (Phase 13)

```bash
# Create agent society
modelx society create "Research Team" "Collaborative research"

# List societies
modelx society list

# Add agent to society
modelx society add-agent soc_001 agent_123
```

### Identity & Missions (Phase 13)

```bash
# Get identity status
modelx identity status

# Create mission
modelx identity create-mission "AI Safety Research" "Develop safe AI systems"

# List missions
modelx identity missions
```

### Research Programs (Phase 13)

```bash
# Create research program
modelx research create-program "AI Alignment" "Safety"

# Schedule program
modelx research schedule prog_001 --frequency daily

# List programs
modelx research list
```

### Autonomous Development (Phase 13)

```bash
# Analyze component
modelx develop analyze cognitive_kernel

# Optimize repository
modelx develop optimize

# Generate improvement plan
modelx develop improve --safety-level moderate
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

#### Cognitive OS (Phase 13)

- `GET /api/v1/cognitive/status` - Get cognitive kernel status
- `POST /api/v1/cognitive/reason` - Perform reasoning
- `POST /api/v1/cognitive/attend` - Allocate attention to task
- `GET /api/v1/cognitive/attention` - Get attention records
- `GET /api/v1/cognitive/metrics` - Get cognitive metrics

#### Agent Society (Phase 13)

- `POST /api/v1/society/create` - Create agent society
- `GET /api/v1/society/list` - List societies
- `POST /api/v1/society/add-agent` - Add agent to society
- `GET /api/v1/society/{id}` - Get society details

#### Identity & Missions (Phase 13)

- `GET /api/v1/identity/status` - Get identity status
- `POST /api/v1/identity/missions` - Create mission
- `GET /api/v1/identity/missions` - List missions
- `GET /api/v1/identity/missions/{id}` - Get mission details

#### Research Programs (Phase 13)

- `POST /api/v1/research/programs` - Create research program
- `GET /api/v1/research/programs` - List programs
- `POST /api/v1/research/programs/{id}/schedule` - Schedule program
- `GET /api/v1/research/programs/{id}` - Get program details

#### Autonomous Development (Phase 13)

- `POST /api/v1/development/analyze` - Analyze component
- `GET /api/v1/development/optimize` - Get optimization opportunities
- `POST /api/v1/development/improve` - Generate improvement plan

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
│   ├── agents/           # Agent implementations and LangGraph nodes
│   ├── api/              # FastAPI routes and middleware
│   ├── cli/              # Command-line interface
│   ├── db/               # Database models and migrations
│   ├── memory/           # Memory subsystems
│   ├── cognitive_kernel/ # Phase 13A: Cognitive Kernel
│   ├── cognitive_attention/ # Phase 13C: Attention System
│   ├── reasoning/        # Phase 13D: Unified Reasoning Engine
│   ├── cognitive_communication/ # Phase 13E: Communication Bus
│   ├── agent_society/    # Phase 13F: Agent Society Runtime
│   ├── identity/          # Phase 13G: Long-Term Identity
│   ├── research_programs/ # Phase 13H: Research Programs
│   ├── autonomous_development/ # Phase 13I: Self-Development
│   ├── multimodal/       # Phase 7: Vision processing
│   ├── swarm/            # Phase 8: Swarm orchestration
│   ├── world_model/      # World model and belief engine
│   ├── evolution/        # Architecture evolution
│   └── config/           # Configuration management
├── tests/
│   └── integration/      # Integration tests (Phase 13)
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

- [x] Phase 13: Cognitive Operating System - Unified cognitive organism
- [x] Phase 7: Multi-Modal Context - Vision processing
- [x] Phase 8: Swarm Orchestration - Large-scale agent coordination
- [ ] Enhanced vision capabilities (video processing, OCR improvements)
- [ ] Advanced swarm strategies (reinforcement learning-based)
- [ ] Real-time collaboration features
- [ ] Mobile app support
- [ ] Cloud deployment templates
- [ ] Performance optimizations
- [ ] Additional LLM provider integrations
- [ ] Cognitive OS enhancements (advanced reasoning, better attention models)

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
