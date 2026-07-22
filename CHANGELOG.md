# Changelog

## Unreleased

## v1.0.8 - 2026-07-22

- Fixed Windows dark-mode contrast for dialog buttons and chat/contact controls.
- Fixed selected and highlighted contacts in dark mode so assistant names and metadata remain readable.
- Restored the contact window before docked chat switches so changing chats does not leave the host window minimized or hidden.

## v1.0.7 - 2026-07-21

- Added preset roles for Operations Assistant, Social Media Marketing Expert, AI Productivity Specialist, Automation Engineer, and HR Specialist.
- Added editable Soul, behavior, tone, instruction, and skills content for each new role.
- Added Product Manager, Software Architect, Senior Software Engineer, QA Engineer, Business Analyst, Research Analyst, Technical Writer, Finance & Business Controller, Legal & Compliance Specialist, Customer Success Specialist, UI/UX Designer, SEO & Content Strategist, Executive Research Assistant, DevOps & Infrastructure Engineer, and Data Analyst presets.
- Added Tools → AI Profile Management for CSV export of custom/imported profiles and bulk CSV import; built-in preset profiles and profile images are excluded from exports.
- Added the Cybersecurity Analyst role preset for risk assessment, secure configuration, threat modeling, vulnerability triage, and incident-response preparation.
- Added on-demand read-only workspace search for Chief of Staff profiles: matching friend-list entries and relevant saved-chat excerpts are provided only when the user asks about agents, chats, history, or prior work.
- Added read-only Chat History transcript popups and optional context-capacity controls, including Start New Chat when the model context is full.
- Added release guardrails so packaged apps refuse to store personal user data inside release artifacts.
- Tightened packaging exclusions for local encrypted vault and auto-unlock files.
- Added Debian and Ubuntu package build automation for Linux variants pending separate testing.

## v1.0.6

- Fixed dark-theme contrast for contact names, subtitles, timestamps, and button labels.
- Forced the interface to use its selected light or dark control palette instead of inheriting unsuitable system-control colors.

## v1.0.5

- Limited published deployment packages to macOS Apple Silicon and Windows x64.
- Removed Linux packages and Linux installation guidance from the public release.

## v1.0.4

- Improved the portable Linux launch configuration.

## v1.0.3

- Added an ARM64 Linux package.
- Clarified platform-specific installation guidance.

## v1.0.2

- Added the official X account to Help → Contact Us.
- Refreshed macOS, Windows, and Linux packages and checksums.

## v1.0.1

- Updated the use license to allow personal, educational, nonprofit, workplace, and business use.
- Kept redistribution, repackaging, resale, sublicensing, hosted service use, and modified distribution restricted without permission.
- Tightened release packaging to exclude local and internal material.

## v1.0.0

- Initial AI Messenger release with local-model profiles, individual and group chats, customization controls, encrypted local storage, and classic messenger-inspired interface.
