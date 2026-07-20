# AI Messenger Security Policy

## Security model

AI Messenger is a local-first Electron application. It only connects to model servers on `localhost`, does not load remote web content, and does not grant the model direct filesystem or desktop-control access.

Local Ollama does not require an API key. Optional credentials for other OpenAI-compatible local servers are encrypted in a separate standalone vault using a user-provided passphrase. AI Messenger does not use macOS Keychain, Windows Credential Manager, Linux keyrings, or another external credential store.

Electron's Chromium runtime is explicitly started with its macOS mock-keychain backend and Linux basic password-store backend. This prevents Chromium from creating or requesting access to platform “Safe Storage” credentials. AI Messenger does not use Chromium storage for secrets; its standalone AES-256-GCM vault remains separate.

Chat history, assistant instructions, skills, display names, preferences, and profile pictures are encrypted at rest with AES-256-GCM. By default, the encryption key is derived from the user's passphrase with scrypt and held only in memory while the app is running. The passphrase cannot be recovered by the app.

The optional “Don’t ask again on this device” setting stores the derived automatic-unlock key and vault salt—not the raw passphrase—in AI Messenger's private user-data folder with owner-only file permissions where the operating system supports them. This is a convenience tradeoff: anyone who can access that device account and its application files may be able to unlock the vault. Users can remove the stored key through Tools → Require vault passphrase next launch.

## Release security gates

Every public release must:

1. Pass `npm run check`, `npm run security:smoke`, and `npm run security:audit`.
2. Package application code inside ASAR and verify Electron security fuses.
3. Use a stable bundle identifier and version.
4. Be code-signed using the target platform's official distribution process.
5. Pass Apple notarization and Gatekeeper checks on macOS, Authenticode verification on Windows, and package-signature verification on Linux.
7. Be built from a clean dependency lockfile with no high or critical vulnerabilities.

The current verification run (2026-07-18) passed `npm run check`, `npm run security:smoke` (standalone encrypted-vault round trip), and `npm run security:audit` (0 reported vulnerabilities). These checks validate the source and dependency state; they do not replace platform code signing, notarization, or an independent penetration test.

## Data handling

- Desktop and uploaded images are sent only to the selected local model endpoint.
- Chat history records that an image was used but does not retain the image itself.
- Model connections are restricted to `localhost`, `127.0.0.1`, and `::1`.
- The app does not include analytics or advertising trackers.
- Users should be given controls to delete all stored application data before a public release.

## Reporting vulnerabilities

Security reports should be handled privately by Jesada Chandraprasert. Do not publish unpatched vulnerabilities or private user data.
