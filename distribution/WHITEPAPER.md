# AI Messenger — Project White Paper

**Version:** 1.0
**Project:** AI Messenger
**Developers:** Jesada Chandraprasert and Sarawin Chandraprasert
**Status:** Desktop application for local model use

## Abstract

AI Messenger is a cross-platform desktop interface for locally running language models. It presents installed Ollama models as Messenger-style contacts, allowing people to create personalized AI profiles, hold individual or group conversations, attach selected images or desktop snapshots, and keep control of their data on the local computer.

The project focuses on approachable interaction rather than building another model runtime. Ollama performs model discovery and inference; AI Messenger provides the user interface, conversation orchestration, profile configuration, local history, and resource controls around it.

## Problem and motivation

Local model tools are powerful but often expose command-line or developer-oriented interfaces. New users may find it difficult to understand which models are installed, what each model is suited for, how to personalize them, or how to switch between several assistants without losing context.

AI Messenger addresses that usability gap with a familiar contact-list metaphor while preserving the benefits of local inference: the user chooses the models, controls the endpoint, and keeps conversations on their own device.

## Project goals

1. Make local AI models approachable through a familiar desktop chat interface.
2. Keep model communication local by default and avoid built-in telemetry.
3. Separate persistent model identity from user-created assistant profiles.
4. Support individual, concurrent, docked, and multi-assistant group conversations.
5. Give users clear controls for context, attachments, resource usage, and history.
6. Remain portable across macOS, Windows, and Linux.

## System overview

```text
User
  │
  ▼
AI Messenger renderer windows
  │  profile, group, history, attachment, and UI state
  ▼
Electron preload bridge
  │  restricted IPC operations
  ▼
Electron main process
  │  local server requests, windows, vault, snapshots
  ▼
Ollama or compatible local inference endpoint
  │
  ▼
Installed model(s)
```

The renderer does not call arbitrary remote services. The main process owns privileged desktop operations and mediates local model requests through the preload bridge. The configured endpoint is intended to be localhost; users remain responsible for any endpoint they manually configure.

## Core capabilities

### Model and profile management

- Discover installed models and display their footprint and capabilities.
- Create multiple saved AI profiles backed by the same or different models.
- Give each profile its own name, image, tone, language gender, Soul/personality, instructions, and skills.
- Preserve model metadata independently from profile customization.
- Suspend profiles manually or automatically after inactivity to reduce resource use.

### Conversation modes

- Individual conversations with restored history.
- Separate concurrent windows for different assistants.
- Docked chat attached to the contact list, with model switching.
- Group chats with multiple assistants and `@Name` addressing that remains in the group.
- Add or remove group participants without removing their earlier messages; removed participants remain identifiable in the transcript.
- Immediate rendering of user messages and streamed assistant output.
- Stop and Stop All controls for active generations.

## Specialist-team workflows

The advanced use case for AI Messenger is a group of assistants with complementary jobs, rather than one model attempting every task. Each participant remains a distinct profile with its own model, instructions, and capabilities, while the shared conversation provides the working context.

For example, a recipe or document team can combine:

1. An OCR model that extracts source text from a photograph, scan, label, or handwritten page.
2. A reasoning or math model that checks units, scales quantities, converts measurements, identifies inconsistencies, and explains the calculations.
3. A creative vision or image-capable model that proposes presentation ideas, substitutions, layouts, or visual directions.
4. A writing model that turns the reviewed material into clear instructions, product copy, a menu description, or a publishable draft.

The math assistant is useful beyond recipes. A team can give it OCR-extracted figures from an invoice or spreadsheet, ask it to reconcile totals and tax, test alternative pricing or staffing scenarios, calculate break-even points, or verify a forecast. A writing assistant can then present the checked result in plain language while the original extraction and reasoning remain visible for review.

This workflow is collaborative rather than autonomous: the user can address one specialist with `@Name`, compare responses, correct an extraction, and decide which result is carried forward. Model selection remains visible, so an OCR model is not silently treated as a general-purpose reasoning model.

### Visual and file assistance

- Upload, paste, or drag images and text files into a conversation.
- Select a desktop or application-window snapshot explicitly before sharing it.
- Send attached content only with the user’s message; there is no continuous desktop recording.

### Personalization and usability

- Shared About Me profile for user name, image, background, goals, and working preferences.
- Per-assistant tone presets: Kind, Sarcastic, To the point, and Helpful.
- Emoji picker, copy/cut/paste, adjustable chat-pane divider, themes, and font-size controls.
- Installed Model Guide to help match a model to a task.
- User Guide, Setup Guide, Features, License, Terms of Service, and User Data pages in both primary windows.

## Data and privacy model

AI Messenger is local-first. It has no built-in analytics, advertising, telemetry, developer reporting, or hosted user account. Chat messages, profiles, settings, and saved history are stored on the user’s device in the application vault.

Prompts and explicitly attached files or images are sent to the model endpoint selected by the user. A desktop snapshot is captured only after the user requests sharing and selects a screen or window. Ollama models and their licenses are separate from AI Messenger.

The application does not use macOS Keychain, Windows Credential Manager, or Linux keyrings. Optional credentials for compatible local servers are kept in the standalone encrypted vault. Users should protect their operating-system account, vault passphrase, and any manually configured network endpoint.

Each model request also includes the device’s current local date, time, weekday, and time zone for basic relative-date interpretation. This context is derived from the local system clock and is advisory rather than authoritative.

## Security design

- Electron context isolation and a restricted preload IPC bridge.
- No remote web content or arbitrary remote script loading.
- Local vault encryption using AES-256-GCM with scrypt-derived keys.
- Electron security fuses applied during packaging.
- Dependency audit and encrypted-vault smoke tests included in the release checks.
- Explicit user action required before desktop capture or attachment sharing.

These controls reduce application risk but do not secure a compromised operating system, malicious model, unsafe endpoint, or stolen user account. The application is not a substitute for endpoint security or independent security review.

## Technology stack

- Electron and Chromium for the desktop shell and renderer windows
- Node.js for the main process and local integrations
- HTML, CSS, and JavaScript for the interface
- Ollama HTTP API or another compatible local inference API
- AES-256-GCM and scrypt for encrypted local state
- Electron Packager for macOS ARM64, Windows x64, and Linux x64 artifacts

## Performance model

Inference cost is dominated by the selected models and hardware, not the interface. Multiple active assistants, vision requests, and group chats can use substantial CPU, GPU memory, system memory, battery, and storage. AI Messenger reduces avoidable overhead by stopping or suspending inactive profiles, allowing users to stop individual or all generations, and keeping chat orchestration lightweight.

## Limitations

- The application does not itself train, download, or manage model weights.
- Model quality, speed, context limits, and vision support depend on Ollama and the selected model.
- Desktop access is visual assistance only; the current application does not click, type, or control other applications.
- Output can be inaccurate and must be reviewed by the user.
- Platform signing, notarization, and enterprise distribution requirements vary by operating system.

## Distribution and licensing

AI Messenger may be used for personal and workplace purposes under the AI Messenger Use License v1.0. Redistribution, repackaging, resale, hosting, sublicensing, and modified distribution require prior written permission from Jesada Chandraprasert.

Ollama, Electron, Chromium, Node.js, downloaded models, and other dependencies remain under their own licenses. AI Messenger is not affiliated with Microsoft or the former MSN Messenger service.

## Project direction

Future work may include signed installers, broader architecture builds, improved model capability detection, export/import tools, and additional opt-in integrations. Any feature that could transmit data or control another application should remain explicitly user-controlled and clearly disclosed.

## Related documents

- [User README](README.md)
- [Skills authoring guide](SKILLS_GUIDE.md)
- [Deployment packages](deploymentpackages/)
- [License](LICENSE.md)
- [Terms of use](TERMS.md)
- [Security information](SECURITY.md)
- [Third-party notices](THIRD-PARTY-NOTICES.md)
