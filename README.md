# AI Messenger

A local-first macOS desktop chat window inspired by early-2000s instant messengers. It connects to Ollama at `127.0.0.1:11434` and can attach a user-selected desktop snapshot to a vision-capable model.

Project information and updates: [aimessenger.sermocast.com](https://aimessenger.sermocast.com).

## Read before installing

By installing, copying, or using AI Messenger, you agree to the [AI Messenger Terms of Use](TERMS.md) and the [AI Messenger Use License v1.0](LICENSE.md). If you do not agree, do not install or use the application.

AI Messenger is an interface layer (desktop client) for Ollama or another compatible **local** inference server. It is not Ollama, does not provide hosted AI, and does not include or relicense any model. Ollama, downloaded models, Electron, Chromium, and other third-party components remain subject to their own licenses and terms.

AI Messenger may be used for personal, educational, nonprofit, workplace, and business purposes. You may not redistribute, repackage, rebrand, resell, sublicense, modify for distribution, host, or bundle the application into another product or service without prior written permission from the copyright holder.

There is no telemetry, analytics, advertising, or developer reporting. Chat content, attachments, profiles, settings, and history remain on the user's device. The app communicates with the local endpoint configured by the user; if the user attaches an image or file, it is sent to that local model for processing. Users are responsible for the security of their device, Ollama installation, downloaded models, and any network changes they make.

Running several assistant profiles or group chats can use substantial CPU, GPU, memory, and power. Resource use depends on the selected models and hardware; disable assistants or stop generations when they are not needed.

AI output can be inaccurate or unsafe. Do not rely on it as professional, legal, medical, financial, or emergency advice, and do not share secrets or sensitive personal information unless you understand the risks.

Developer credits: Jesada Chandraprasert and Sarawin Chandraprasert. Copyright © 2026 Jesada Chandraprasert. “AI Messenger” and the application artwork are not affiliated with Microsoft or the former MSN Messenger service.

## Run it

```bash
npm install
npm start
```

To create a Finder-launchable app:

```bash
npm run package:mac
```

Open the packaged application in `dist/`.

The first time you choose **Share view**, macOS may request Screen Recording permission. If you grant it from System Settings, restart the app.

## Privacy behavior

- The app connects only to the local Ollama address.
- It does not record the desktop continuously.
- A snapshot is captured only after you click **Share view** and select a screen or window.
- The snapshot is sent only with the next message, as base64 image data to Ollama.
- Chat history and settings are stored locally in the encrypted app vault; no analytics are included.

## Help and Tools reference

The contact list and chat windows expose the same Help pages: Installed Model Guide, Features, Setup Guide, User Guide, License, Terms of Service, and User Data. Tools → Setup local model and the shared font-size and vault controls are available in both windows; chat-only assistant tone and profile configuration remain in the chat window because they apply to its selected assistant.

For docked chats, Detach and the close (×) control are aligned at the upper right of the conversation header. Detach opens the conversation in its own window; × closes only the chat pane and leaves the contact list open.

See the [User Guide](distribution/USER_GUIDE.md) for feature instructions.

The new-assistant flow includes editable Chief of Staff and Misfit presets. Chief of Staff translates broad requests into clear briefs, delegates work to specialist assistants, coordinates group-chat contributions, and checks results. Misfit provides playful, safe contrarian analysis and devil’s-advocate questions without malicious behavior.

## Current scope

This first version can see an attached snapshot and advise you. It cannot click, type, or control other apps. Computer control should be a separate opt-in feature with visible confirmation before each action.

## Specialist team workflows

AI Messenger is designed for groups of complementary assistants. An OCR model can extract text from a photographed recipe, form, or label; a reasoning or math model can check units, scale quantities, reconcile invoice totals, or test pricing and break-even scenarios; a creative vision model can suggest visual directions or variations; and a writing model can turn the reviewed result into clear instructions or polished copy. Use `@Name` to direct a request to one specialist while keeping all work in the shared group thread. Group members can be added or removed without deleting the existing conversation; removed members remain visible with gray names in older messages.
