# Cross-Platform Distribution Checklist

AI Messenger is designed for independent distribution on macOS, Windows, and Linux. The application vault is standalone and does not depend on platform credential stores.

Every release must be accompanied by `README.md`, `TERMS.md`, `LICENSE.md`, and `THIRD-PARTY-NOTICES.md`. Users must be given the README and terms before installation or first use. Preserve the copyright notice and third-party notices. The AI Messenger Use License permits personal and workplace use but does not permit redistribution, repackaging, resale, hosting, sublicensing, or modified distribution without written permission.

Automatic login is optional. When enabled, AI Messenger stores a derived vault-unlock key—not the user's raw passphrase—in its local user-data folder. This convenience reduces protection if another person can access the same operating-system account or application files; users can turn it off from Tools at any time.

## Build targets

- `npm run package:mac` — macOS Apple silicon build
- `npm run package:win` — Windows x64 build
- `npm run package:linux` — Linux x64 build
- `npm run package:all` — all currently configured targets

Each build packages application code into ASAR and applies verified Electron security fuses. Public releases still require platform signing credentials, which must be stored outside this repository.

## Release sequence

1. Update the app version and release notes.
2. Run `npm ci` from the committed dependency lockfile.
3. Run `npm run check`, `npm run security:smoke`, and `npm run security:audit`.
4. Build each supported target and test it on that operating system.
5. Sign the final artifact using the platform's official distribution identity.
6. Publish signed installers over HTTPS with SHA-256 checksums.

For the repeatable local portion, run `npm run release:audit`. It runs the source and security checks, verifies the release documents and deployment archives, generates `distribution/deploymentpackages/SHA256SUMS.txt`, and writes an audit report beside the deployment folder.

## macOS

Use an Apple Developer ID Application certificate, enable the hardened runtime, submit the app for Apple notarization, staple the ticket, and verify it with Gatekeeper. The ad-hoc development signature is not suitable for public distribution.

## Windows

Create a signed installer, Authenticode-sign the executable and installer with a trusted code-signing certificate, apply a timestamp, and verify the signature on a clean Windows machine.

## Linux

Create the chosen packages, such as AppImage, `.deb`, or `.rpm`. Sign release checksums or repository metadata and test on the supported distributions.

Never commit certificates, private keys, signing passwords, API keys, vault passphrases, or notarization credentials.
