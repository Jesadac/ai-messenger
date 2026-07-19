# AI Messenger

AI Messenger is a local-first desktop interface for Ollama and other compatible local inference servers. It gives locally installed language models a classic instant-messenger-style contact list and chat window. The application is not a hosted AI service and does not include or redistribute AI models.

Developed by Jesada Chandraprasert and Sarawin Chandraprasert.

## Deployment packages

Download the current packages from the [AI Messenger v1.0.0 release](https://github.com/Jesadac/ai-messenger/releases/tag/v1.0.0):

- `AI-Messenger-mac-arm64.zip` — macOS on Apple silicon
- `AI-Messenger-windows-x64.zip` — 64-bit Windows
- `AI-Messenger-linux-x64.zip` — 64-bit Linux

## Before installation

1. Install Ollama from [ollama.com](https://ollama.com/) or configure another compatible local inference server.
2. Download at least one model in Ollama, for example `ollama pull llama3.2`.
3. Keep the model server available on the local computer. AI Messenger’s default Ollama address is `http://127.0.0.1:11434`.

## Installation

### macOS

1. Unzip `AI-Messenger-mac-arm64.zip`.
2. Move **Retro Messenger Assistant.app** to Applications.
3. Open the app. If macOS shows an approval message for an unsigned local app, use System Settings → Privacy & Security → Open Anyway only if you obtained the package from a source you trust.
4. Open Tools → Setup local model and choose **Detect Ollama automatically**, or enter the local server address manually.

The macOS package is for Apple silicon. Intel Macs require an Intel build or Rosetta-compatible distribution.

### Windows

1. Extract `AI-Messenger-windows-x64.zip` to a folder such as `C:\Program Files\AI Messenger` or your user Applications folder.
2. Launch `ai-messenger.exe`.
3. If Windows Defender SmartScreen displays a warning, verify the package source and publisher before choosing to continue.
4. Open Tools → Setup local model and detect or enter the local Ollama address.

The Windows package is portable; it does not use an installer and can be removed by deleting the extracted folder. User data is stored separately in the application’s user-data directory.

### Linux

1. Extract `AI-Messenger-linux-x64.zip`.
2. From the extracted directory, run `./ai-messenger`.
3. If the executable is not permitted to run, use `chmod +x ai-messenger`.
4. Open Tools → Setup local model and detect or enter the local Ollama address.

The Linux package is portable and targets 64-bit Linux systems. Desktop-menu integration can be created by the user through their desktop environment.

## First-run setup

1. Start Ollama.
2. Open **Tools → Setup local model**.
3. Choose automatic detection or enter the local server URL, then select **Test Connection** and **Save & Connect**.
4. Review **Help → Installed Model Guide** to see model footprint and recommended uses.
5. Press **+** in the contact list to create an AI profile from an installed model.
6. Open **Tools → About Me** to set the shared user profile used for personalization.

## Main features

- Messenger-inspired contact list for installed local models
- Individual AI profiles with custom names, images, tones, language gender, Soul/personality prompts, and skills
- Private chats, concurrent model chat windows, and docked chat mode
- Group chats with multiple assistants and `@Name` addressing inside the group
- Group member management: add or remove assistants while retaining the shared chat history; messages from removed assistants remain visible with gray names
- Immediate user-message display and streaming model responses
- Stop and Stop All controls for active generations
- Image/file attachments and explicitly selected desktop or application snapshots
- Emoji picker, copy/cut/paste, adjustable chat-pane divider, and model picker
- Saved encrypted chat history, with a warning when loading older context
- Tools → All Chat Logs for opening saved conversations across assistants and groups
- Time-based idle suspension with wake-on-open and manual right-click suspend/wake
- Light/dark themes and 50%, 100%, and 125% font-size options
- Installed-model footprint and capability guidance
- Specialty-model notices when starting a new chat, including OCR, embedding, and coding model guidance
- Help pages for Features, User Guide, Setup Guide, License, Terms of Service, and User Data

## Specialist team workflows

Create a group of assistants with different jobs instead of asking one model to do everything. For a photographed recipe or document, an OCR assistant can extract the source text, a reasoning or math assistant can verify units and scale quantities, a creative vision assistant can suggest variations or presentation, and a writing assistant can turn the reviewed result into polished instructions or copy. The same pattern works for invoices and planning: extract figures, reconcile totals or test scenarios, then have a writing model explain the checked result. Use `@Name` to focus a request on one specialist while keeping the shared context in the group.

## Built on

- **Electron** for the cross-platform desktop shell and isolated renderer windows
- **Chromium** through Electron for the user interface
- **Node.js** for the application main process and local integration
- **Ollama HTTP API** (or a compatible local endpoint) for model discovery and generation
- **AES-256-GCM with scrypt-derived keys** for the app’s encrypted local vault
- A custom HTML/CSS/JavaScript interface styled after early-2000s Messenger applications

## Privacy and security

AI Messenger has no built-in telemetry, analytics, advertising, developer reporting, or remote user account. Chats, profiles, settings, and history remain on the user’s device. Prompts and explicitly attached files or images are sent to the local endpoint selected in Setup. The desktop is not continuously recorded; snapshots are captured only when the user explicitly chooses one.

The app does not use macOS Keychain, Windows Credential Manager, or Linux keyrings. Optional non-Ollama credentials are kept in the app’s standalone encrypted vault. Protect the computer account and vault passphrase, and do not share sensitive information unless you understand the risks.

## Local date and time

Each model request includes the computer’s current local date, time, weekday, and time zone so assistants can answer basic questions about “today” or “tomorrow.” This is read from the device clock and is not guaranteed to be accurate; it is not used as an authoritative source for deadlines or other high-stakes decisions.

## Resource use and model choice

Each active model can use substantial CPU, GPU memory, system memory, battery, and storage. Multiple assistants and group chats increase resource usage. Use the Installed Model Guide, stop unused generations, suspend assistants, or choose smaller models when performance matters.

AI output can be inaccurate. Validate important information and do not rely on model responses as professional, legal, medical, financial, or emergency advice.

## License and notices

Use is subject to the accompanying [LICENSE.md](LICENSE.md), [TERMS.md](TERMS.md), and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). AI Messenger is not affiliated with Microsoft or the former MSN Messenger service.
