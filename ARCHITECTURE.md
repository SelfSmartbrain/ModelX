# Architecture Documentation

This document provides a deep dive into ModelX Voice Assistant's internal architecture for developers and contributors.

## 📐 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MODELX VOICE ASSISTANT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │   AUDIO      │    │   STT        │    │   BRAIN      │    │   TTS    │  │
│  │   LAYER      │───▶│   (Whisper)  │───▶│   (LLM)      │───▶│  (Piper) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘    └──────────┘  │
│        │                   │                   │                   │         │
│        ▼                   ▼                   ▼                   ▼         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    AUDIO PIPELINE ORCHESTRATOR                        │   │
│  │  • Manages async data flow between components                         │   │
│  │  • Handles backpressure and buffering                                 │   │
│  │  • Coordinates state machine (IDLE→LISTENING→PROCESSING→SPEAKING)    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      CONVERSATION MEMORY                              │   │
│  │  • Persistent JSON storage                                           │   │
│  │  • Token-aware pruning                                               │   │
│  │  • Context window management                                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      CONFIGURATION LAYER                              │   │
│  │  • ConfigManager (load/save/validate)                                │   │
│  │  • KeyringBackend (secure API key storage)                           │   │
│  │  • SetupWizard (interactive configuration)                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎵 Audio Layer

### `AudioCapture` (`modelx_voice/audio/capture.py`)

**Purpose**: Real-time microphone capture with configurable sample rate and chunk size.

```python
class AudioCapture:
    def __init__(
        self,
        sample_rate: int = 16000,      # STT expects 16kHz
        channels: int = 1,              # Mono
        chunk_size: int = 1024,         # ~64ms at 16kHz
        device: Optional[int] = None    # None = default
    )
```

**Key Methods**:
- `start()` — Initialize sounddevice InputStream
- `stop()` — Clean shutdown
- `read_chunk()` — Async read, returns `np.ndarray` (float32, -1.0 to 1.0)
- `get_devices()` — List available input devices

**Implementation Details**:
- Uses `sounddevice.InputStream` with callback
- Callback pushes to thread-safe `queue.Queue`
- `read_chunk()` uses `loop.run_in_executor` for async compatibility
- Buffers automatically handled by sounddevice

### `AudioPlayback` (`modelx_voice/audio/capture.py`)

**Purpose**: Low-latency audio output for TTS playback.

```python
class AudioPlayback:
    def __init__(
        self,
        sample_rate: int = 22050,       # Piper outputs at 22.05kHz
        channels: int = 1,
        device: Optional[int] = None
    )
```

**Key Methods**:
- `start()` — Initialize sounddevice OutputStream
- `play(audio_data)` — Write float32 array to stream
- `stop()` — Clean shutdown

**Implementation Details**:
- Direct stream.write() for minimal latency
- No internal buffering — caller manages streaming
- Sample rate conversion handled by Piper (outputs at 22.05kHz)

### `VoiceActivityDetector` (`modelx_voice/audio/vad.py`)

**Purpose**: Frame-level speech detection using WebRTC VAD.

```python
class VoiceActivityDetector:
    def __init__(
        self,
        sample_rate: int = 16000,
        frame_duration_ms: int = 30,    # 30ms frames (WebRTC requirement)
        aggressiveness: int = 2         # 0-3 (higher = more sensitive)
    )
```

**Method**: `is_speech(audio_chunk) -> bool`
- Accepts int16 or float32 arrays
- Converts to int16 internally
- Returns boolean for each frame

### `StreamingVAD` (`modelx_voice/audio/vad.py`)

**Purpose**: Higher-level streaming VAD with speech segment extraction.

```python
class StreamingVAD:
    def __init__(
        self,
        sample_rate: int = 16000,
        aggressiveness: int = 2,
        padding_ms: int = 300,          # Pre/post speech padding
        min_speech_ms: int = 250,       # Minimum speech duration
        max_silence_ms: int = 1000      # Max silence before segment ends
    )
```

**Method**: `process(audio_chunk) -> Optional[np.ndarray]`
- Returns complete speech segment when silence detected
- Handles padding before/after speech
- Maintains internal state machine

**State Machine**:
```
IDLE → SPEECH_STARTED → COLLECTING → SILENCE_DETECTED → SEGMENT_READY
                      ↑              ↓
                      └──────────────┘ (speech continues)
```

---

## 🎯 Speech-to-Text Layer

### `WhisperTranscriber` (`modelx_voice/stt/whisper_wrapper.py`)

**Purpose**: Wrapper around faster-whisper for single-shot transcription.

```python
class WhisperTranscriber:
    def __init__(
        self,
        model_size: str = "base",       # tiny, base, small, medium, large
        device: str = "auto",           # auto, cpu, cuda
        compute_type: str = "auto",     # auto, int8, float16, float32
        language: Optional[str] = None  # None = auto-detect
    )
```

**Method**: `transcribe(audio_data) -> str`
- Lazy-loads model on first use
- Normalizes input to float32, -1.0 to 1.0
- Uses VAD filter for silence removal
- Returns concatenated segment text

**Method**: `transcribe_async(audio_data) -> str`
- Runs in thread pool executor
- Non-blocking for async pipeline

### `StreamingTranscriber` (`modelx_voice/stt/whisper_wrapper.py`)

**Purpose**: Incremental transcription for streaming (not currently used in pipeline).

```python
class StreamingTranscriber:
    def __init__(self, ..., chunk_length: int = 30)
    def add_audio(audio_chunk)
    def get_transcription() -> Optional[str]
    def reset()
```

---

## 🧠 Brain Layer

### `LLMProvider` Abstract Base (`modelx_voice/brain/llm_client.py`)

```python
class LLMProvider(ABC):
    @abstractmethod
    async def chat_completion(
        self,
        messages: List[Message],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> LLMResponse: ...

    @abstractmethod
    async def stream_chat_completion(
        self,
        messages: List[Message],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> AsyncGenerator[str, None]: ...

    @abstractmethod
    async def close(self): ...
```

### Provider Implementations

| Provider | Class | Auth | Streaming |
|----------|-------|------|-----------|
| Anthropic | `AnthropicProvider` | API Key | ✅ |
| OpenAI | `OpenAIProvider` | API Key | ✅ |
| OpenRouter | `OpenRouterProvider` | API Key | ✅ |
| Ollama | `OllamaProvider` | None (local) | ✅ |

**Anthropic** (`modelx_voice/brain/llm_client.py:40-100`):
- Uses `anthropic.AsyncAnthropic`
- System prompt separated from messages
- Returns usage stats (input/output tokens)

**OpenAI** (`modelx_voice/brain/llm_client.py:102-170`):
- Uses `openai.AsyncOpenAI`
- Standard chat completions API
- Streaming via `stream=True`

**OpenRouter** (`modelx_voice/brain/llm_client.py:172-235`):
- OpenAI-compatible endpoint
- Adds required headers (Referer, X-Title)
- Supports 100+ models

**Ollama** (`modelx_voice/brain/llm_client.py:237-305`):
- HTTP client to local Ollama server
- `/api/chat` endpoint
- Streaming via HTTP chunked response

### Factory Functions

```python
def get_provider(name: str, api_key: str = None, base_url: str = None) -> LLMProvider
def get_default_model(provider: str) -> str
def list_providers() -> List[str]
```

### `ConversationMemory` (`modelx_voice/brain/context.py`)

**Purpose**: Manages conversation history with persistence and token budgeting.

```python
class ConversationMemory:
    def __init__(
        self,
        max_turns: int = 20,            # Max conversation turns
        max_tokens: int = 8000,         # Token budget
        persistence_file: Optional[Path] = None
    )
```

**Key Methods:
    def add_exchange(user_input, ai_response, tokens_used=None):
        """Add exchange, auto-prune by turns and tokens."""
        self.history.append(ConversationExchange(...))
        self._prune_by_tokens()
        if self.persistence_file:
            self.save()

def _prune_by_tokens(self):
        """Remove oldest exchanges until under token budget."""
        while self._total_tokens > self.max_tokens and len(self.history) > 1:
            removed = self.history.popleft()
            self._total_tokens -= removed.tokens_used...

def get_context(self, recent_turns: int = 5) -> List[Message]:
        """Get recent conversation for LLM context."""
        context = []
        for exchange in self.history[-recent_turns:]:
            context.append(Message(role="user", content=exchange.user))
            context.append(Message(role="assistant", content=exchange.assistant))
        return context
```

**Persistence**: Auto-saves to JSON on each exchange (configurable path)
**Token Tracking**: Estimates from provider usage data

### `ModelXBrain` (`modelx_voice/brain/context.py`)

**Purpose**: High-level interface combining LLM + Memory.

```python
class ModelXBrain:
    def __init__(
        self,
        provider: str,
        api_key: str = None,
        base_url: str = None,
        model: str = None,
        memory: ConversationMemory = None,
        system_prompt: str = None
    )
```

**Methods**:
- `process_input(user_text) -> str` — Single-shot response
- `stream_response(user_text) -> AsyncGenerator[str]` — Streaming
- `clear_memory()` — Reset conversation
- `get_stats() -> Dict` — Provider, model, turns, tokens

---

## 🔊 Text-to-Speech Layer

### `PiperSynthesizer` (`modelx_voice/tts/piper_wrapper.py`)

**Purpose**: ONNX Runtime-based neural TTS using Piper models.

```python
class PiperSynthesizer:
    VOICE_CONFIG = {
        "professional": "en_US-lessac-medium.onnx",
        "casual": "en_US-amy-low.onnx",
        "clear": "en_US-libritts-medium.onnx",
    }
```

**Method**: `synthesize(text) -> np.ndarray`
- Lazy-loads voice model
- Creates `SynthesisConfig` with length/noise scales
- Iterates `voice.synthesize(text, syn_config=config)`
- Concatenates `audio_float_array` from each chunk
- Returns float32 normalized audio

**Method**: `synthesize_stream(text) -> Generator[np.ndarray]`
- Yields chunks for streaming playback

**Method**: `set_voice(voice_name)` — Switch voice at runtime

### `VoiceManager` (`modelx_voice/tts/piper_wrapper.py`)

**Purpose**: Manages multiple synthesizer instances.

```python
def get_synthesizer(voice_profile: str) -> PiperSynthesizer:
    """Cached synthesizer per voice profile."""

def list_available_voices() -> Dict[str, str]:
    """Scan voices directory for downloaded models."""
```

---

## ⚙️ Configuration Layer

### `ConfigManager` (`modelx_voice/config/manager.py`)

**Purpose**: Load/save/validate configuration with secure key storage.

```python
class ConfigManager:
    KEYRING_SERVICE = "modelx-voice"
    
    def load() -> ModelXConfig:
        """Load config, resolve API keys from keyring."""
        
    def save():
        """Save config, store API keys to keyring."""
        
    def get_api_key(provider) -> str:
        """Retrieve from system keyring."""
        
    def save_api_key(provider, key):
        """Store in system keyring."""
```

**Config Structure** (`ModelXConfig` dataclass):
```python
@dataclass
class APIConfig:
    provider: str = "anthropic"
    api_key: str = ""           # Never written to disk
    model: str = ""
    base_url: str = ""

@dataclass
class VoiceConfig:
    selected_voice: str = "clear"
    speed: float = 1.0
    pitch: float = 1.0

@dataclass
class AudioConfig:
    input_device: Optional[int] = None
    output_device: Optional[int] = None
    sample_rate: int = 16000

@dataclass
class BehaviorConfig:
    wake_word: str = "hey modelx"
    auto_listen: bool = True
    response_delay: float = 0.5
    vad_aggressiveness: int = 2
```

### `SetupWizard` (`modelx_voice/config/setup_wizard.py`)

**Purpose**: Rich-based interactive configuration.

**Flow**:
1. Provider selection (table with descriptions)
2. API key input (password field)
3. Model selection (default per provider)
4. Voice profile selection
5. Audio device detection & selection
6. Behavior settings (wake word, auto-listen, VAD sensitivity)
7. Save to disk + keyring

---

## 🎮 Pipeline Orchestration

### `AudioPipeline` (`modelx_voice/pipeline.py`)

**Purpose**: Coordinates all components into a working voice assistant.

```python
class PipelineState(Enum):
    IDLE = "idle"
    LISTENING = "listening"
    PROCESSING = "processing"
    SPEAKING = "speaking"

class AudioPipeline:
    def __init__(self, config, config_manager, brain, ui)
```

**Main Loop** (`_listen_loop`):
```
while running:
    audio_chunk = await capture.read_chunk()
    speech_segment = vad.process(audio_chunk)
    if speech_segment:
        await transcribe_and_respond(speech_segment)
```

**Processing Flow** (`_transcribe_and_respond`):
```
1. Set state = PROCESSING
2. text = await transcriber.transcribe_async(audio)
3. If text empty → back to LISTENING
4. Check for voice commands
5. response = await brain.process_input(text)
6. Set state = SPEAKING
7. audio = await synthesizer.synthesize_async(response)
8. await playback.play(audio)
9. Back to LISTENING (if auto_listen)
```

**Push-to-Talk Mode** (`_push_to_talk_loop`):
- Waits for Enter key
- Records until silence detected (2s timeout)
- Processes single utterance

### `PipelineConfig` (`modelx_voice/pipeline.py`)

```python
@dataclass
class PipelineConfig:
    sample_rate: int = 16000
    vad_aggressiveness: int = 2
    min_speech_ms: int = 250
    max_silence_ms: int = 1000
    whisper_model: str = "base"
    voice_profile: str = "clear"
    auto_listen: bool = True
```

---

## 💻 Terminal UI

### `SimpleVoiceUI` (`modelx_voice/ui/terminal.py`)

**Purpose**: Lightweight console output for basic usage.

**Methods**:
- `print_status(message, style)`
- `print_user(text)`
- `print_assistant(text, end)`
- `print_listening()` / `print_processing()` (with carriage return)
- `clear_line()`
- `print_error(message)`
- `print_info(message)`

### `VoiceTerminalUI` (`modelx_voice/ui/terminal.py`)

**Purpose**: Full-screen Rich Live UI with panels.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Title + Status + VU Meter                          │
├─────────────────────────────────────────────────────────────┤
│ Main: Conversation (User + Assistant text)                 │
├─────────────────────────────────────────────────────────────┤
│ Footer: Stats + Controls                                   │
└─────────────────────────────────────────────────────────────┘
```

**Live Updates**: 10 FPS via `rich.Live`
**VU Meter**: 20-bar visualization from audio level

### `CommandProcessor` (`modelx_voice/ui/commands.py`)

**Purpose**: Natural language command detection.

```python
COMMAND_PATTERNS = {
    CommandType.STOP: [r"^(stop|quit|exit|goodbye|bye)$", ...],
    CommandType.PAUSE: [r"^(pause|wait|hold on)$", ...],
    CommandType.CLEAR: [r"^(clear|clear history|reset|forget)$", ...],
    CommandType.SAVE: [r"^(save|save conversation|export)$", ...],
    CommandType.HELP: [r"^(help|commands|what can you do)$", ...],
    CommandType.SWITCH_VOICE: [r"^(switch voice|change voice|use voice)\s+(\w+)$", ...],
    CommandType.STATUS: [r"^(status|stats|info)$", ...],
    CommandType.REPEAT: [r"^(repeat|say that again|say again)$", ...],
}
```

**Voice Aliases**:
```python
VOICE_ALIASES = {
    "professional": "professional", "pro": "professional", "male": "professional",
    "casual": "casual", "friendly": "casual", "female": "casual",
    "clear": "clear", "clarity": "clear", "neutral": "clear",
}
```

---

## 🔄 Data Flow Details

### Audio Format Conversions

```
Microphone (int16, 16kHz)
    │
    ▼ sounddevice callback
float32 [-1.0, 1.0] (AudioCapture)
    │
    ▼ VAD processing (converts to int16 internally)
    │
    ▼ Whisper (expects float32, 16kHz)
    │
    ▼ Text → LLM → Response text
    │
    ▼ Piper TTS (outputs float32, 22.05kHz)
    │
    ▼ sounddevice OutputStream (float32)
    │
    ▼ Speakers
```

### Async Architecture

```
Main Thread (asyncio event loop)
├── AudioCapture callback (thread) → Queue → read_chunk() (async)
├── AudioPlayback write() (thread pool)
├── Whisper transcribe() (thread pool)
├── Piper synthesize() (thread pool)
├── LLM API calls (async HTTP)
└── UI updates (main thread, 10 FPS)
```

### Backpressure Handling

- VAD only outputs complete speech segments
- Pipeline processes one utterance at a time
- TTS synthesis runs before playback (no streaming yet)
- Memory bounds: max_turns=20, max_tokens=8000

---

## 🧩 Extension Points

### Adding Audio Effects

```python
# In pipeline.py _transcribe_and_respond
# Before VAD or after capture
processed = noise_reduction(audio_chunk)
```

### Custom Wake Word

```python
# In pipeline.py _listen_loop
if wake_word_detected(audio_chunk):
    await self._process_speech_segment()
```

### Plugin System (Future)

```
modelx_voice/
├── plugins/
│   ├── __init__.py       # Plugin registry
│   ├── base.py           # Plugin base class
│   └── commands.py       # Command plugin interface
```

---

## 📊 Performance Considerations

### Latency Budget (Target: <2s first response)

| Stage | Typical | Optimization |
|-------|---------|--------------|
| Capture + VAD | 20ms | — |
| STT (base) | 380ms | Use tiny model for speed |
| LLM first token | 1.2s | Stream tokens, smaller model |
| TTS | 210ms | — |
| Playback start | 10ms | — |
| **Total** | **~1.8s** | |

### Memory Management

- Whisper model: ~142MB (base) loaded once
- Piper voice: ~48MB loaded per voice
- Conversation history: bounded by max_turns/max_tokens
- Audio buffers: chunked, not accumulated

### CPU Optimization

- VAD runs in C (WebRTC)
- Whisper uses CTranslate2 (optimized)
- Piper uses ONNX Runtime (optimized)
- Consider `WHISPER_MODEL=tiny` for low-end hardware

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY BOUNDARIES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  USER SPACE                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │  Microphone │→ │   Pipeline  │→ │    LLM Provider    │  │
│  │  (Hardware) │  │  (Process)  │  │  (Network/HTTPS)   │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
│        │                │                     │             │
│        │                │                     ▼             │
│        │                │              ┌─────────────┐      │
│        │                │              │  Piper TTS  │      │
│        │                │              │  (Local)    │      │
│        │                │              └─────────────┘      │
│        │                │                     │             │
│        │                │                     ▼             │
│        │                │              ┌─────────────┐      │
│        │                │              │  Speakers   │      │
│        │                │              │ (Hardware)  │      │
│        │                │              └─────────────┘      │
│        │                │                                    │
│        ▼                ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           CONFIG STORAGE (~/.modelx-voice/)          │    │
│  │  • config.json (NO API KEYS)                        │    │
│  │  • voices/ (ONNX models)                            │    │
│  │  • conversation.json (LOCAL ONLY)                   │    │
│  └─────────────────────────────────────────────────────┘    │
│        │                                                    │
│        ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           SYSTEM KEYRING (ENCRYPTED)                 │    │
│  │  • macOS: Keychain                                   │    │
│  │  • Windows: Credential Manager                       │    │
│  │  • Linux: libsecret/gnome-keyring                    │    │
│  │  • Stores: API keys ONLY                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Architecture

### Unit Tests (Fast, Isolated)

```python
# tests/unit/test_commands.py
def test_command_processor():
    cp = CommandProcessor()
    assert cp.process("stop").type == CommandType.STOP
    assert cp.process("hello").type == CommandType.NONE
```

### Integration Tests (Component Interaction)

```python
# tests/integration/test_pipeline.py
@pytest.mark.asyncio
async def test_pipeline_initialization():
    pipeline = AudioPipeline(...)
    await pipeline.initialize()
    assert pipeline.state == PipelineState.IDLE
    await pipeline.cleanup()
```

### Audio Tests (Hardware-Dependent)

```python
# tests/audio/test_capture.py
@pytest.mark.audio
def test_microphone_access():
    devices = sd.query_devices()
    assert any(d['max_input_channels'] > 0 for d in devices)
```

---

## 📦 Packaging & Distribution

### PyPI Package Structure

```
modelx_voice-1.0.0/
├── modelx_voice/
│   ├── __init__.py
│   ├── audio/
│   ├── stt/
│   ├── tts/
│   ├── brain/
│   ├── config/
│   ├── ui/
│   ├── voices/
│   │   ├── voice_config.json
│   │   ├── en_US-lessac-medium.onnx
│   │   ├── en_US-lessac-medium.onnx.json
│   │   ├── en_US-amy-low.onnx
│   │   └── en_US-amy-low.onnx.json
│   ├── pipeline.py
│   └── main.py
├── pyproject.toml
├── README.md
├── LICENSE
└── CHANGELOG.md
```

### Wheel Building

```bash
pip install build
python -m build
# Creates dist/modelx_voice-1.0.0-py3-none-any.whl
# Plus dist/modelx_voice-1.0.0.tar.gz
```

### Voice Model Inclusion

```toml
# pyproject.toml
[tool.hatch.build.targets.wheel]
packages = ["modelx_voice"]
include = ["modelx_voice/voices/*.onnx", "modelx_voice/voices/*.json"]
```

---

## 🔮 Future Architecture Plans

### v1.1 - Streaming TTS
```
Current: Synthesize entire response → Play
Future:  Stream chunks → Play immediately (reduce perceived latency by 50%)
```

### v1.2 - Plugin System
```
modelx_voice/
├── plugins/
│   ├── registry.py
│   ├── base.py
│   ├── stt/
│   ├── tts/
│   ├── brain/
│   └── commands/
```

### v2.0 - Distributed
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Gateway    │────▶│  Workers    │
│  (Terminal) │     │  (API)      │     │  (GPU)      │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 📚 References

- [faster-whisper docs](https://github.com/guillaumekln/faster-whisper)
- [Piper TTS docs](https://github.com/rhasspy/piper)
- [WebRTC VAD](https://webrtc.github.io/vad/)
- [Rich Terminal UI](https://rich.readthedocs.io/)
- [sounddevice](https://python-sounddevice.readthedocs.io/)
- [ONNX Runtime](https://onnxruntime.ai/)
- [CTranslate2](https://github.com/OpenNMT/CTranslate2)