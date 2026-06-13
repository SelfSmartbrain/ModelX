#!/usr/bin/env bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting ModelX Platform Setup...${NC}\n"

# 1. Check for .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found.${NC}"
    if [ -f .env.example ]; then
        echo "Copying .env.example to .env..."
        cp .env.example .env
        echo -e "${RED}Please update .env with your ANTHROPIC_API_KEY and OPENAI_API_KEY before running again.${NC}"
        exit 1
    else
        echo -e "${RED}Error: .env and .env.example not found.${NC}"
        exit 1
    fi
fi

# 2. Start Core Infrastructure
echo -e "${GREEN}Starting Docker infrastructure (PostgreSQL, Qdrant, Redis, Neo4j)...${NC}"
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    docker compose up -d
else
    echo -e "${RED}Error: docker-compose or docker compose is not installed.${NC}"
    exit 1
fi

# Wait for databases to initialize
echo -e "${YELLOW}Waiting for databases to initialize... (10 seconds)${NC}"
sleep 10

# 3. Setup Virtual Environment
echo -e "${GREEN}Checking Python virtual environment...${NC}"
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# 4. Install Dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
pip install --upgrade pip
pip install -e .[dev]

# 5. Run Database Migrations
echo -e "${GREEN}Running database migrations...${NC}"
alembic upgrade head

# 6. Start the API Server
echo -e "\n${GREEN}ModelX Platform successfully initialized!${NC}"
echo -e "${GREEN}Starting FastAPI server on http://localhost:8000...${NC}"
echo "Press Ctrl+C to stop the server."
uvicorn src.api.main:app --reload
