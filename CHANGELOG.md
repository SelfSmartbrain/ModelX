# Changelog

All notable changes to ModelX Voice Assistant are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Initial project structure and core architecture
- Multi-provider LLM support (Anthropic, OpenAI, OpenRouter, Ollama)
- Local STT with faster-whisper
- Local TTS with Piper (3 voice profiles)
- WebRTC VAD for voice activity detection
- Rich terminal UI with live transcription
- Conversation memory with token-aware pruning
- Secure API key storage via system keyring
- Interactive setup wizard
- Voice command processor
- Cross-platform installer script

---

## [1.0.0] - 2025-07-01

### Added
- **Core Pipeline**: End-to-end voice processing (Audio → VAD → STT → LLM → TTS → Audio)
- **LLM Providers**:
  - Anthropic (Claude 3.5 Sonnet, Opus, Haiku)
  - OpenAI (GPT-4o, GPT-4, GPT-3.5)
  - OpenRouter (100+ models)
  - Ollama (local models: Llama 3.2, Mistral, etc.)
- **Speech-to-Text**: faster-whisper with base/small models
- **Text-to-Speech**: Piper TTS with 3 bundled voices:
  - Professional (Male - Lessac)
  - Casual (Female - Amy)
  - Clear (Female - LibriTTS)
- **Voice Activity Detection**: WebRTC VAD with configurable aggressiveness
- **Terminal UI**: Rich-based interface with:
  - Live transcription display
  - Real-time VU meter
  - Status panel with provider/model/token stats
  - Keyboard shortcuts (Ctrl+Space, Ctrl+C, Ctrl+L, Ctrl+S)
- **Voice Commands**: Stop, Pause, Clear, Save, Help, Switch Voice, Status, Repeat
- **Configuration**: 
  - Secure keyring storage (macOS Keychain, Windows Credential Manager, libsecret)
  - YAML/JSON config at `~/.modelx-voice/config.json`
  - Interactive setup wizard with audio device detection
- **Memory**: Conversation history with:
  - Persistent storage (JSON)
  - Token-aware pruning (configurable limit)
  - Export to file
- **Cross-Platform**: macOS, Linux (Debian/Ubuntu/Fedora/Arch), Windows
- **Installation**: 
  - PyPI package (`pip install modelx-voice`)
  - Source install with `./install.sh`
  - Docker support

### Security
- API keys never written to disk (stored in system keyring)
- Local audio processing (no cloud STT/TTS)
- Optional fully offline mode with Ollama

### Documentation
- Comprehensive README with diagrams
- CONTRIBUTING.md for developers
- Architecture documentation
- Troubleshooting guide

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2025-07-01 | Initial release |

---

## Upgrade Guide

### From 0.x to 1.0.0

This is the initial release. No upgrade path needed.

---

## Support Policy

| Version | Status | Supported Until |
|---------|--------|-----------------|
| 1.0.x | Active | 2026-07-01 |

---

## Links

- [GitHub Releases](https://github.com/modelx/modelx-voice/releases)
- [PyPI](https://pypi.org/project/modelx-voice/)
- [Issues](https://github.com/modelx/modelx-voice/issues)