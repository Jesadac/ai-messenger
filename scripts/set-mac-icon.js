const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const appPath = path.resolve(process.argv[2] || 'dist/Retro Messenger Assistant-darwin-arm64/Retro Messenger Assistant.app');
const sourceIcon = path.resolve('assets/ai-messenger.icns');
const resourcesPath = path.join(appPath, 'Contents', 'Resources');
const destinationIcon = path.join(resourcesPath, 'ai-messenger.icns');
const infoPlist = path.join(appPath, 'Contents', 'Info.plist');

if (!fs.existsSync(sourceIcon) || !fs.existsSync(infoPlist)) {
  throw new Error('The packaged macOS app or AI Messenger icon is missing.');
}

fs.copyFileSync(sourceIcon, destinationIcon);
execFileSync('/usr/bin/plutil', ['-replace', 'CFBundleIconFile', '-string', 'ai-messenger.icns', infoPlist]);
console.log('AI Messenger macOS launcher icon applied.');
