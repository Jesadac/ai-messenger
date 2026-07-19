#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const sourceApp = path.join(projectRoot, 'dist', 'Retro Messenger Assistant-darwin-arm64', 'Retro Messenger Assistant.app');
const userHome = os.homedir();
const installedApp = path.join(userHome, 'Applications', 'AI Messenger.app');
const desktopLink = path.join(userHome, 'Desktop', 'AI Messenger.app');
const backupDirectory = path.join(userHome, '.Trash', 'AI Messenger patched versions');
const backupApp = path.join(backupDirectory, `AI Messenger.app.${new Date().toISOString().replace(/[:.]/g, '-')}`);

if (!fs.existsSync(sourceApp)) {
  throw new Error(`Packaged app not found: ${sourceApp}`);
}

try {
  execFileSync('osascript', ['-e', 'tell application id "com.jesadachandraprasert.ai-messenger" to quit'], { stdio: 'ignore' });
} catch {
  // The app may not be running. Either way, continue with the refresh.
}

Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 750);
fs.mkdirSync(path.dirname(installedApp), { recursive: true });
fs.mkdirSync(backupDirectory, { recursive: true });

if (fs.existsSync(installedApp)) fs.renameSync(installedApp, backupApp);
execFileSync('/usr/bin/ditto', ['--norsrc', sourceApp, installedApp], { stdio: 'inherit' });

try {
  const launcherStats = fs.lstatSync(desktopLink);
  if (launcherStats.isSymbolicLink() || launcherStats.isFile()) {
    fs.unlinkSync(desktopLink);
  } else {
    fs.renameSync(desktopLink, path.join(backupDirectory, `Desktop AI Messenger.app.${Date.now()}`));
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
fs.symlinkSync(installedApp, desktopLink, 'dir');

execFileSync('codesign', ['--verify', '--deep', '--strict', installedApp], { stdio: 'inherit' });
execFileSync('open', [installedApp], { stdio: 'inherit' });
console.log('Installed and relaunched AI Messenger.');
