#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const distRoot = path.join(root, 'dist');
const packageDir = path.join(root, 'distribution', 'deploymentpackages');

function copyFile(source, destination) {
  if (!fs.existsSync(source)) throw new Error(`Missing build artifact: ${source}`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function zipDirectory(sourceDirectory, destination) {
  if (!fs.existsSync(sourceDirectory)) throw new Error(`Missing build folder: ${sourceDirectory}`);
  fs.rmSync(destination, { force: true });
  execFileSync('zip', ['-qry', destination, path.basename(sourceDirectory)], { cwd: path.dirname(sourceDirectory), stdio: 'inherit' });
}

function main() {
  fs.mkdirSync(packageDir, { recursive: true });
  copyFile(path.join(distRoot, 'AI-Messenger-mac-arm64.zip'), path.join(packageDir, 'AI-Messenger-mac-arm64.zip'));
  zipDirectory(path.join(distRoot, 'Retro Messenger Assistant-win32-x64'), path.join(packageDir, 'AI-Messenger-windows-x64.zip'));
  process.stdout.write(`Deployment packages staged in ${packageDir}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
}
