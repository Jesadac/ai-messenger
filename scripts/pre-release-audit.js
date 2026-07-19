#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const asar = require('@electron/asar');

const root = path.resolve(__dirname, '..');
const distributionRoot = process.env.AIM_RELEASE_DIR || path.join(root, 'distribution');
const packageDir = path.join(distributionRoot, 'deploymentpackages');
const internalDir = path.join(root, 'internal-release-records');
const requiredDocs = ['README.md', 'LICENSE.md', 'TERMS.md', 'SECURITY.md', 'DISTRIBUTION.md', 'THIRD-PARTY-NOTICES.md', 'RELEASE_CHECKLIST.md'];
const mirroredPackageDocs = ['LICENSE.md', 'TERMS.md', 'THIRD-PARTY-NOTICES.md'];
const packages = [
  'AI-Messenger-mac-arm64.zip',
  'AI-Messenger-windows-x64.zip',
  'AI-Messenger-linux-x64.zip',
];
const forbidden = /(?:tmp|cache|credentials|keychain|history|localstorage|\.env|(?:^|\/)\.git(?:\/|$)|codex-clipboard|TemporaryItems)/i;
const forbiddenBundleText = /(?:\/Users\/art|TemporaryItems|codex-clipboard|internal-release-records|RELEASE_CHECKLIST\.md|userName\s*:\s*['"]Art['"])/i;

function run(command, args) {
  console.log(`> ${command} ${args.join(' ')}`);
  execFileSync(command, args, { cwd: root, stdio: 'inherit' });
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function archiveEntries(file) {
  return execFileSync('unzip', ['-Z1', file], { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
}

function verifyMirroredPackageDocs() {
  const mismatches = [];
  for (const file of mirroredPackageDocs) {
    const canonicalPath = path.join(root, file);
    const distributionPath = path.join(packageDir, file);
    if (!fs.existsSync(distributionPath)) mismatches.push(`${file} is missing from deploymentpackages`);
    else if (fs.readFileSync(canonicalPath, 'utf8') !== fs.readFileSync(distributionPath, 'utf8')) mismatches.push(`${file} differs from the canonical project copy`);
  }
  return mismatches;
}

function scanPackagedBundles() {
  const findings = [];
  const distRoot = path.join(root, 'dist');
  if (!fs.existsSync(distRoot)) return findings;
  for (const platformDir of fs.readdirSync(distRoot)) {
    const asarPath = path.join(distRoot, platformDir, 'resources', 'app.asar');
    if (!fs.existsSync(asarPath)) continue;
    for (const entry of asar.listPackage(asarPath)) {
      if (forbidden.test(entry)) findings.push(`${platformDir}: ${entry}`);
      if (!/\.(?:js|html|json|md|txt|css)$/.test(entry)) continue;
      try {
        const text = asar.extractFile(asarPath, entry).toString('utf8');
        if (forbiddenBundleText.test(text)) findings.push(`${platformDir}: personal or internal text in ${entry}`);
      } catch {
        // Ignore binary or unreadable bundle entries.
      }
    }
  }
  return findings;
}

function main() {
  fs.mkdirSync(internalDir, { recursive: true });
  run('npm', ['run', 'check']);
  run('npm', ['run', 'security:smoke']);
  run('npm', ['run', 'security:audit']);

  const missingDocs = requiredDocs.filter((file) => !fs.existsSync(path.join(root, file)));
  if (missingDocs.length) throw new Error(`Missing release documents: ${missingDocs.join(', ')}`);
  if (!fs.existsSync(packageDir)) throw new Error(`Deployment folder not found: ${packageDir}`);
  const mirroredDocMismatches = verifyMirroredPackageDocs();
  if (mirroredDocMismatches.length) throw new Error(`Distribution documentation is out of sync:\n${mirroredDocMismatches.join('\n')}`);

  const checksums = [];
  const archiveFindings = [];
  for (const file of packages) {
    const fullPath = path.join(packageDir, file);
    if (!fs.existsSync(fullPath)) throw new Error(`Missing deployment package: ${fullPath}`);
    const entries = archiveEntries(fullPath);
    const hits = entries.filter((entry) => forbidden.test(entry));
    if (hits.length) archiveFindings.push(`${file}: ${hits.slice(0, 8).join(', ')}`);
    checksums.push(`${sha256(fullPath)}  ${file}`);
  }
  archiveFindings.push(...scanPackagedBundles());
  if (archiveFindings.length) throw new Error(`Deployment archive hygiene findings:\n${archiveFindings.join('\n')}`);

  fs.writeFileSync(path.join(packageDir, 'SHA256SUMS.txt'), `${checksums.join('\n')}\n`);
  const report = `# AI Messenger Automated Pre-release Audit\n\nGenerated: ${new Date().toISOString()}\n\n## Passed\n\n- Source syntax validation\n- Encrypted-vault smoke test\n- npm dependency audit\n- Required release-document check\n- Deployment package presence check\n- Deployment archive and packaged-app hygiene scan\n- SHA-256 checksums written to distribution/deploymentpackages/SHA256SUMS.txt\n\n## Manual release gates\n\n- Platform code signing and macOS notarization\n- Clean-machine testing on macOS, Windows, and Linux\n- Final review of checksums after signing\n\nThese remaining gates require platform identities or target operating systems and cannot be safely completed by this local audit.\n`;
  const reportPath = path.join(internalDir, 'RELEASE_AUDIT_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\nRelease audit passed. Report: ${reportPath}`);
  console.log(`Checksums: ${path.join(packageDir, 'SHA256SUMS.txt')}`);
}

try {
  main();
} catch (error) {
  console.error(`\nRelease audit failed: ${error.message}`);
  process.exitCode = 1;
}
