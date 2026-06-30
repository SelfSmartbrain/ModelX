# Contributing to ModelX Voice Assistant

Thank you for your interest in contributing! This document outlines the process and standards for contributing to ModelX Voice Assistant.

## 🎯 Ways to Contribute

- **Bug Reports** — Found an issue? [Open a bug report](https://github.com/modelx/modelx-voice/issues/new?template=bug_report.md)
- **Feature Requests** — Have an idea? [Request a feature](https://github.com/modelx/modelx-voice/issues/new?template=feature_request.md)
- **Code Contributions** — Fix bugs, add features, improve performance
- **Documentation** — Improve docs, add examples, translate
- **Testing** — Test on different platforms, report compatibility
- **Voice Models** — Find/contribute Piper-compatible voices

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Git
- System audio dependencies (see [README#installation](README.md#installation))

### Development Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/modelx-voice
cd modelx-voice

# 2. Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 3. Install in development mode with dev dependencies
pip install -e ".[dev]"

# 4. Install pre-commit hooks
pre-commit install

# 5. Run tests to verify setup
pytest
```

### Project Structure

```
modelx_voice/
├── audio/          # Audio capture, playback, VAD
├── stt/            # Speech-to-text (Whisper)
├── tts/            # Text-to-speech (Piper)
├── brain/          # LLM integration, memory
├── config/         # Configuration, setup wizard
├── ui/             # Terminal UI, commands
├── voices/         # Voice models + downloader
├── pipeline.py     # Main audio pipeline
└── main.py         # CLI entry point
```

## 📝 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Write code following our style guide
- Add tests for new functionality
- Update documentation if needed

### 3. Run Quality Checks

```bash
# Format code
black modelx_voice/
isort modelx_voice/

# Lint
ruff modelx_voice/
mypy modelx_voice/

# Run tests
pytest

# All pre-commit checks
pre-commit run --all-files
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add amazing feature

- Brief description of what changed
- Why this change was made
- Any breaking changes noted"
```

### 5. Push and Create PR

```bash
git push origin feat/your-feature-name
# Open PR on GitHub
```

## ✨ Code Style Guide

### Python Standards

- **Formatter**: Black (line length 100)
- **Imports**: isort (Black-compatible)
- **Linting**: Ruff (fast, comprehensive)
- **Type Hints**: Required for all public APIs
- **Docstrings**: Google style for public functions/classes

### Example

```python
async def process_audio(self, audio_data: np.ndarray) -> Optional[str]:
    """Process audio chunk through the pipeline.

    Args:
        audio_data: Raw audio samples at 16kHz, mono, float32.

    Returns:
        Transcribed text if speech detected, None otherwise.

    Raises:
        AudioProcessingError: If audio format is invalid.
    """
    if audio_data.dtype != np.float32:
        audio_data = audio_data.astype(np.float32)

    return await self._transcribe(audio_data)
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:
```
feat(audio): add push-to-talk mode support
fix(tts): handle empty synthesis result gracefully
docs(readme): add Windows installation instructions
perf(pipeline): reduce VAD latency by 30%
```

## 🧪 Testing Guidelines

### Test Structure

```
tests/
├── unit/           # Fast, isolated tests
│   ├── test_config.py
│   ├── test_commands.py
│   └── test_memory.py
├── integration/    # Component integration tests
│   ├── test_pipeline.py
│   └── test_brain.py
├── audio/          # Hardware-dependent tests (marked)
│   └── test_capture.py
└── fixtures/       # Test data
```

### Writing Tests

```python
import pytest
from modelx_voice.brain import ConversationMemory

class TestConversationMemory:
    def test_add_exchange_increments_count(self):
        memory = ConversationMemory()
        memory.add_exchange("Hello", "Hi there!")
        assert memory.turn_count == 1

    def test_token_pruning(self):
        memory = ConversationMemory(max_tokens=100)
        # ... test token-based pruning
```

### Running Tests

```bash
# All tests
pytest

# Unit only (fast)
pytest tests/unit/

# With coverage
pytest --cov=modelx_voice --cov-report=term-missing

# Skip audio tests (CI)
pytest -k "not audio"
```

## 🐛 Bug Report Template

When filing a bug, include:

1. **Environment**: OS, Python version, install method
2. **Steps to Reproduce**: Minimal, clear steps
3. **Expected vs Actual**: What should happen vs what happens
4. **Logs**: Relevant output (sanitize API keys!)
5. **Config**: `~/.modelx-voice/config.json` (redacted)

## 💡 Feature Request Template

For features, describe:

1. **Problem**: What use case does this solve?
2. **Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Scope**: Core feature or plugin/extension?

## 🔧 Adding New Providers

### LLM Provider

1. Create `modelx_voice/brain/providers/your_provider.py`
2. Implement `LLMProvider` abstract class:

```python
from modelx_voice.brain.llm_client import LLMProvider, Message, LLMResponse
from typing import AsyncGenerator, List

class YourProvider(LLMProvider):
    async def chat_completion(
        self,
        messages: List[Message],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> LLMResponse:
        # Implementation
        pass

    async def stream_chat_completion(
        self,
        messages: List[Message],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> AsyncGenerator[str, None]:
        # Streaming implementation
        yield ""
        return

    async def close(self):
        # Cleanup
        pass
```

3. Register in `modelx_voice/brain/llm_client.py`:

```python
_PROVIDERS["your_provider"] = YourProvider
_DEFAULT_MODELS["your_provider"] = "default-model-name"
```

4. Add tests in `tests/unit/test_providers.py`

### Voice Model

1. Find Piper-compatible ONNX model on HuggingFace
2. Download `.onnx` + `.onnx.json` to `modelx_voice/voices/`
3. Add to `modelx_voice/voices/voice_config.json`
4. Update `PiperSynthesizer.VOICE_CONFIG` in `piper_wrapper.py`

## 📚 Documentation

### Updating README

- Keep sections in logical order
- Use tables for comparisons
- Include code examples for all features
- Update version badges when releasing

### Docstrings

All public APIs must have docstrings:

```python
class AudioPipeline:
    """Main audio processing pipeline orchestrating STT → LLM → TTS.

    Manages the complete voice interaction loop including voice activity
    detection, transcription, response generation, and speech synthesis.

    Example:
        >>> pipeline = AudioPipeline(config, config_manager, brain, ui)
        >>> await pipeline.initialize()
        >>> await pipeline.run()
    """
```

## 🏷️ Release Process

Maintainers only:

1. Update version in `pyproject.toml`
2. Update `CHANGELOG.md`
3. Create release tag: `git tag v1.2.0`
4. Push tag: `git push origin v1.2.0`
5. GitHub Actions builds and publishes to PyPI
6. Create GitHub Release with notes

## 📞 Getting Help

- **Discord**: [ModelX Community](https://discord.gg/modelx) — #development channel
- **GitHub Discussions**: [Q&A](https://github.com/modelx/modelx-voice/discussions)
- **Email**: dev@modelx.ai

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ModelX Voice Assistant!** 🎤