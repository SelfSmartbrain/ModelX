"""ModelX CLI - Command Line Interface for ModelX AGI Platform."""

from __future__ annotations

import click
from rich.console import Console
from rich.table import Table

from src.cli.config import ConfigManager
from src.cli.api_client import ModelXClient
from src.cli.formatters import OutputFormatter

console = Console()
formatter = OutputFormatter()


@click.group()
@click.version_option(version="1.0.0")
@click.option("--api-url", envvar="MODELX_API_URL", default="http://localhost:8000", help="ModelX API URL")
@click.option("--api-key", envvar="MODELX_API_KEY", help="ModelX API key")
@click.option("--output", type=click.Choice(["table", "json", "stream"]), default="table", help="Output format")
@click.pass_context
def cli(ctx, api_url, api_key, output):
    """ModelX CLI - Interact with the ModelX AGI Platform."""
    ctx.ensure_object(dict)
    ctx.obj["api_url"] = api_url
    ctx.obj["api_key"] = api_key
    ctx.obj["output"] = output
    ctx.obj["client"] = ModelXClient(api_url, api_key)
    ctx.obj["config"] = ConfigManager()


# ---------------------------------------------------------------------------
# Configuration Commands
# ---------------------------------------------------------------------------


@cli.group()
def config():
    """Manage ModelX CLI configuration."""
    pass


@config.command()
@click.argument("provider", type=click.Choice(["anthropic", "openai", "custom"]))
@click.argument("api_key")
@click.option("--model", help="Default model for this provider")
@click.pass_context
def add_provider(ctx, provider, api_key, model):
    """Add an LLM provider with API key."""
    config_manager = ctx.obj["config"]
    config_manager.add_provider(provider, api_key, model)
    console.print(f"[green]✓[/green] Added {provider} provider")


@config.command()
@click.argument("provider", type=click.Choice(["anthropic", "openai", "custom"]))
@click.pass_context
def remove_provider(ctx, provider):
    """Remove an LLM provider."""
    config_manager = ctx.obj["config"]
    config_manager.remove_provider(provider)
    console.print(f"[green]✓[/green] Removed {provider} provider")


@config.command()
@click.pass_context
def list_providers(ctx):
    """List all configured providers."""
    config_manager = ctx.obj["config"]
    providers = config_manager.list_providers()
    
    table = Table(title="Configured LLM Providers")
    table.add_column("Provider", style="cyan")
    table.add_column("Model", style="magenta")
    table.add_column("API Key", style="green")
    
    for p in providers:
        table.add_row(p["provider"], p.get("model", "N/A"), p["api_key"][:10] + "...")
    
    console.print(table)


@config.command()
@click.argument("key")
@click.argument("value")
@click.pass_context
def set(ctx, key, value):
    """Set a configuration value."""
    config_manager = ctx.obj["config"]
    config_manager.set(key, value)
    console.print(f"[green]✓[/green] Set {key} = {value}")


@config.command()
@click.argument("key")
@click.pass_context
def get(ctx, key):
    """Get a configuration value."""
    config_manager = ctx.obj["config"]
    value = config_manager.get(key)
    console.print(f"{key}: {value}")


# ---------------------------------------------------------------------------
# Goals Commands
# ---------------------------------------------------------------------------


@cli.group()
def goal():
    """Manage goals."""
    pass


@goal.command()
@click.argument("description")
@click.option("--priority", type=int, default=5, help="Goal priority (1-10)")
@click.option("--deadline", help="Goal deadline")
@click.pass_context
def create(ctx, description, priority, deadline):
    """Create a new goal."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "description": description,
        "priority": priority
    }
    if deadline:
        data["deadline"] = deadline
    
    result = client.create_goal(data)
    formatter.output(result, output_format)


@goal.command()
@click.pass_context
def list(ctx):
    """List all goals."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    goals = client.list_goals()
    formatter.output(goals, output_format)


@goal.command()
@click.argument("goal_id")
@click.pass_context
def get(ctx, goal_id):
    """Get goal details."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    goal = client.get_goal(goal_id)
    formatter.output(goal, output_format)


@goal.command()
@click.argument("goal_id")
@click.pass_context
def delete(ctx, goal_id):
    """Delete a goal."""
    client = ctx.obj["client"]
    
    client.delete_goal(goal_id)
    console.print(f"[green]✓[/green] Deleted goal {goal_id}")


# ---------------------------------------------------------------------------
# Tasks Commands
# ---------------------------------------------------------------------------


@cli.group()
def task():
    """Manage tasks."""
    pass


@task.command()
@click.argument("goal_id")
@click.argument("description")
@click.option("--priority", type=int, default=5, help="Task priority (1-10)")
@click.pass_context
def create(ctx, goal_id, description, priority):
    """Create a new task for a goal."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "goal_id": goal_id,
        "description": description,
        "priority": priority
    }
    
    result = client.create_task(data)
    formatter.output(result, output_format)


@task.command()
@click.option("--goal-id", help="Filter by goal ID")
@click.option("--status", help="Filter by status")
@click.pass_context
def list(ctx, goal_id, status):
    """List all tasks."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    tasks = client.list_tasks(goal_id=goal_id, status=status)
    formatter.output(tasks, output_format)


@task.command()
@click.argument("task_id")
@click.pass_context
def get(ctx, task_id):
    """Get task details."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    task = client.get_task(task_id)
    formatter.output(task, output_format)


@task.command()
@click.argument("task_id")
@click.pass_context
def execute(ctx, task_id):
    """Execute a task."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    result = client.execute_task(task_id)
    formatter.output(result, output_format)


# ---------------------------------------------------------------------------
# Memory Commands
# ---------------------------------------------------------------------------


@cli.group()
def memory():
    """Manage memory operations."""
    pass


@memory.command()
@click.argument("content")
@click.option("--type", default="episodic", help="Memory type (episodic, procedural, semantic)")
@click.pass_context
def add(ctx, content, type):
    """Add a memory entry."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "content": content,
        "memory_type": type
    }
    
    result = client.add_memory(data)
    formatter.output(result, output_format)


@memory.command()
@click.argument("query")
@click.option("--limit", type=int, default=10, help="Number of results")
@click.pass_context
def search(ctx, query, limit):
    """Search memory."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    results = client.search_memory(query, limit)
    formatter.output(results, output_format)


@memory.command()
@click.pass_context
def list(ctx):
    """List all memories."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    memories = client.list_memories()
    formatter.output(memories, output_format)


# ---------------------------------------------------------------------------
# Knowledge Commands
# ---------------------------------------------------------------------------


@cli.group()
def knowledge():
    """Manage knowledge base."""
    pass


@knowledge.command()
@click.argument("content")
@click.option("--tags", help="Comma-separated tags")
@click.pass_context
def add(ctx, content, tags):
    """Add knowledge entry."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "content": content,
        "tags": tags.split(",") if tags else []
    }
    
    result = client.add_knowledge(data)
    formatter.output(result, output_format)


@knowledge.command()
@click.argument("query")
@click.pass_context
def search(ctx, query):
    """Search knowledge base."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    results = client.search_knowledge(query)
    formatter.output(results, output_format)


# ---------------------------------------------------------------------------
# Meta-Learning Commands
# ---------------------------------------------------------------------------


@cli.group()
def meta():
    """Meta-learning operations."""
    pass


@meta.command()
@click.pass_context
def analyze(ctx):
    """Analyze learning patterns."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    result = client.analyze_meta_learning()
    formatter.output(result, output_format)


@meta.command()
@click.pass_context
def strategies(ctx):
    """List learned strategies."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    strategies = client.list_strategies()
    formatter.output(strategies, output_format)


# ---------------------------------------------------------------------------
# Reflections Commands
# ---------------------------------------------------------------------------


@cli.group()
def reflect():
    """Reflection operations."""
    pass


@reflect.command()
@click.argument("topic")
@click.pass_context
def create(ctx, topic):
    """Create a reflection."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {"topic": topic}
    result = client.create_reflection(data)
    formatter.output(result, output_format)


@reflect.command()
@click.pass_context
def list(ctx):
    """List all reflections."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    reflections = client.list_reflections()
    formatter.output(reflections, output_format)


# ---------------------------------------------------------------------------
# Autonomous Commands
# ---------------------------------------------------------------------------


@cli.group()
def autonomous():
    """Autonomous execution operations."""
    pass


@autonomous.command()
@click.argument("goal")
@click.option("--budget", type=int, help="Token budget")
@click.option("--duration", type=int, help="Duration in seconds")
@click.pass_context
def run(ctx, goal, budget, duration):
    """Run autonomous execution."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "goal": goal
    }
    if budget:
        data["budget"] = budget
    if duration:
        data["duration"] = duration
    
    result = client.run_autonomous(data)
    formatter.output(result, output_format)


@autonomous.command()
@click.argument("execution_id")
@click.pass_context
def status(ctx, execution_id):
    """Get autonomous execution status."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    status = client.get_execution_status(execution_id)
    formatter.output(status, output_format)


# ---------------------------------------------------------------------------
# Vision Commands (Phase 7)
# ---------------------------------------------------------------------------


@cli.group()
def vision():
    """Vision processing operations."""
    pass


@vision.command()
@click.argument("image_path")
@click.option("--extract-text", is_flag=True, help="Extract text from image")
@click.option("--detect-elements", is_flag=True, help="Detect UI elements")
@click.pass_context
def analyze(ctx, image_path, extract_text, detect_elements):
    """Analyze a screenshot/image."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    with open(image_path, "rb") as f:
        files = {"file": f}
        data = {
            "extract_text": extract_text,
            "detect_elements": detect_elements
        }
        
        result = client.analyze_image(files, data)
        formatter.output(result, output_format)


@vision.command()
@click.argument("url")
@click.option("--width", type=int, default=1920, help="Viewport width")
@click.option("--height", type=int, default=1080, help="Viewport height")
@click.pass_context
def capture(ctx, url, width, height):
    """Capture screenshot from URL."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "url": url,
        "viewport_width": width,
        "viewport_height": height
    }
    
    result = client.capture_web_page(data)
    formatter.output(result, output_format)


@vision.command()
@click.argument("image_path")
@click.argument("element_type")
@click.option("--min-confidence", type=float, default=0.5, help="Minimum confidence")
@click.pass_context
def detect(ctx, image_path, element_type, min_confidence):
    """Detect specific elements in image."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    with open(image_path, "rb") as f:
        files = {"file": f}
        data = {
            "element_type": element_type,
            "min_confidence": min_confidence
        }
        
        result = client.detect_elements(files, data)
        formatter.output(result, output_format)


# ---------------------------------------------------------------------------
# Swarm Commands (Phase 8)
# ---------------------------------------------------------------------------


@cli.group()
def swarm():
    """Swarm orchestration operations."""
    pass


@swarm.command()
@click.argument("description")
@click.option("--priority", type=int, default=5, help="Goal priority")
@click.option("--complexity", type=int, default=5, help="Estimated complexity")
@click.option("--capabilities", help="Comma-separated required capabilities")
@click.pass_context
def submit(ctx, description, priority, complexity, capabilities):
    """Submit a goal to the swarm."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {
        "description": description,
        "priority": priority,
        "estimated_complexity": complexity
    }
    if capabilities:
        data["required_capabilities"] = capabilities.split(",")
    
    result = client.submit_swarm_goal(data)
    formatter.output(result, output_format)


@swarm.command()
@click.argument("goal_id")
@click.pass_context
def status(ctx, goal_id):
    """Get swarm goal status."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    status = client.get_swarm_goal_status(goal_id)
    formatter.output(status, output_format)


@swarm.command()
@click.pass_context
def metrics(ctx):
    """Get swarm metrics."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    metrics = client.get_swarm_metrics()
    formatter.output(metrics, output_format)


@swarm.command()
@click.option("--directors", type=int, help="Target number of directors")
@click.option("--sub-orchestrators", type=int, help="Target sub-orchestrators per director")
@click.pass_context
def scale(ctx, directors, sub_orchestrators):
    """Scale the swarm."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    data = {}
    if directors:
        data["target_directors"] = directors
    if sub_orchestrators:
        data["target_sub_orchestrators_per_director"] = sub_orchestrators
    
    result = client.scale_swarm(data)
    formatter.output(result, output_format)


@swarm.command()
@click.pass_context
def initialize(ctx):
    """Initialize the swarm."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    result = client.initialize_swarm()
    formatter.output(result, output_format)


@swarm.command()
@click.pass_context
def shutdown(ctx):
    """Shutdown the swarm."""
    client = ctx.obj["client"]
    output_format = ctx.obj["output"]
    
    result = client.shutdown_swarm()
    formatter.output(result, output_format)


# ---------------------------------------------------------------------------
# Main Entry Point
# ---------------------------------------------------------------------------


if __name__ == "__main__":
    cli()
