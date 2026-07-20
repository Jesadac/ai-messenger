# AI Messenger Pre-release Audit

**Audit date:** 2026-07-18
**Source version:** 0.1.0

Run `npm run release:audit` to repeat the automated checks, validate the deployment archives, generate `distribution/deploymentpackages/SHA256SUMS.txt`, and write a report beside the deployment folder.

## Completed checks

- [x] JavaScript syntax validation: `npm run check`
- [x] Encrypted-vault round trip: `npm run security:smoke`
- [x] Dependency audit: `npm run security:audit` — 0 high or critical vulnerabilities reported
- [x] Dependency tree reviewed with `npm ls --depth=0`
- [x] Electron security fuses applied and verified for macOS, Windows, and Linux builds
- [x] Application code packaged in ASAR for all configured targets
- [x] Launcher artwork verified against the custom AI-Messenger flower asset
- [x] Deployment archives checked for build-machine cache, credentials, history, local settings, and temporary files
- [x] README, License, Terms, Security, Distribution, Third-party Notices, Skills Guide, and White Paper reviewed and linked where appropriate
- [x] Help pages and User Guide available in both primary application windows

## Release artifacts

- macOS Apple silicon: `AI-Messenger-mac-arm64.zip`
- Windows x64: `AI-Messenger-windows-x64.zip`
- Linux x64: `AI-Messenger-linux-x64.zip`

## Remaining release controls

These are distribution controls that require platform identities or clean target machines and are not performed by the local development build:

- [ ] Code-sign and notarize the macOS application; verify with Gatekeeper.
- [ ] Authenticode-sign a Windows installer or executable and verify on a clean Windows machine.
- [ ] Produce and sign the selected Linux package format and verify on supported distributions.
- [ ] Generate SHA-256 checksums and publish them with the release.
- [ ] Test Ollama detection and model generation on each target operating system.
- [ ] Confirm the final public package is built from a clean checkout and the locked dependencies.

No signing certificates, private keys, API keys, vault passphrases, or platform credentials belong in the repository or deployment archives.
