#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const distRoot = path.join(root, 'dist');
const packageDir = path.join(root, 'distribution', 'deploymentpackages');
const appName = 'AI Messenger';
const packageName = 'ai-messenger';
const productFolder = 'Retro Messenger Assistant';
const version = require(path.join(root, 'package.json')).version;
const builds = [
  { electronArch: 'x64', debArch: 'amd64' },
  { electronArch: 'arm64', debArch: 'arm64' },
];
const targets = ['debian', 'ubuntu'];

function run(command, args, options = {}) {
  execFileSync(command, args, { stdio: 'inherit', ...options });
}

async function writeFile(filename, content, mode) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, content);
  if (mode) await fs.chmod(filename, mode);
}

async function fileExists(filename) {
  return fs.access(filename).then(() => true).catch(() => false);
}

async function sha256(filename) {
  const data = await fs.readFile(filename);
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function directorySize(filename) {
  const stats = await fs.stat(filename);
  if (!stats.isDirectory()) return stats.size;
  const entries = await fs.readdir(filename);
  const sizes = await Promise.all(entries.map((entry) => directorySize(path.join(filename, entry))));
  return sizes.reduce((sum, size) => sum + size, 0);
}

async function buildDeb({ electronArch, debArch }, target) {
  const sourceApp = path.join(distRoot, `${productFolder}-linux-${electronArch}`);
  if (!(await fileExists(path.join(sourceApp, 'ai-messenger')))) {
    throw new Error(`Missing Linux ${electronArch} build: ${sourceApp}`);
  }

  const stagingRoot = await fs.mkdtemp(path.join(os.tmpdir(), `ai-messenger-${target}-${debArch}-`));
  const packageRoot = path.join(stagingRoot, 'package');
  const dataRoot = path.join(stagingRoot, 'data');
  const controlRoot = path.join(stagingRoot, 'control');
  const optApp = path.join(dataRoot, 'opt', packageName);
  const debName = `AI-Messenger-${target}-${debArch}.deb`;
  const debPath = path.join(packageDir, debName);

  try {
    await fs.mkdir(packageRoot, { recursive: true });
    await fs.mkdir(path.dirname(optApp), { recursive: true });
    await fs.cp(sourceApp, optApp, { recursive: true, force: true, verbatimSymlinks: true });
    await fs.chmod(path.join(optApp, 'ai-messenger'), 0o755);

    await fs.mkdir(path.join(dataRoot, 'usr', 'bin'), { recursive: true });
    await fs.symlink(`/opt/${packageName}/ai-messenger`, path.join(dataRoot, 'usr', 'bin', packageName));

    await fs.mkdir(path.join(dataRoot, 'usr', 'share', 'icons', 'hicolor', '512x512', 'apps'), { recursive: true });
    await fs.cp(
      path.join(root, 'assets', 'ai-messenger-1024.png'),
      path.join(dataRoot, 'usr', 'share', 'icons', 'hicolor', '512x512', 'apps', `${packageName}.png`),
      { force: true },
    );

    await writeFile(path.join(dataRoot, 'usr', 'share', 'applications', `${packageName}.desktop`), `[Desktop Entry]
Name=${appName}
Comment=Local-first messenger-style desktop assistant for local AI models
Exec=${packageName}
Icon=${packageName}
Terminal=false
Type=Application
Categories=Utility;Office;
StartupWMClass=Retro Messenger Assistant
`, 0o644);

    await writeFile(path.join(controlRoot, 'control'), `Package: ${packageName}
Version: ${version}
Section: utils
Priority: optional
Architecture: ${debArch}
Maintainer: AI Messenger <support@aimessenger.sermocast.com>
Installed-Size: ${Math.ceil((await directorySize(sourceApp)) / 1024)}
Depends: libgtk-3-0, libnss3, libxss1, libasound2 | libasound2t64, libgbm1, libnotify4, libx11-xcb1, xdg-utils
Homepage: https://aimessenger.sermocast.com
Description: Local-first messenger-style desktop assistant for local AI models
 AI Messenger provides a classic instant-messenger-style desktop interface for
 local Ollama and compatible model servers. It stores user data in the operating
 system application data directory, outside the release package.
`, 0o644);

    await writeFile(path.join(packageRoot, 'debian-binary'), '2.0\n', 0o644);
    run('tar', ['-czf', path.join(packageRoot, 'control.tar.gz'), '-C', controlRoot, '.']);
    run('tar', ['-czf', path.join(packageRoot, 'data.tar.gz'), '-C', dataRoot, '.']);
    await fs.mkdir(packageDir, { recursive: true });
    await fs.rm(debPath, { force: true });
    run('ar', ['qS', debPath, 'debian-binary', 'control.tar.gz', 'data.tar.gz'], { cwd: packageRoot });

    return { name: debName, hash: await sha256(debPath) };
  } finally {
    await fs.rm(stagingRoot, { recursive: true, force: true });
  }
}

async function main() {
  const packages = [];
  for (const build of builds) {
    for (const target of targets) packages.push(await buildDeb(build, target));
  }
  const manifestPath = path.join(packageDir, 'LINUX_DEB_SHA256SUMS.txt');
  await writeFile(manifestPath, `${packages.map((entry) => `${entry.hash}  ${entry.name}`).join('\n')}\n`, 0o644);
  process.stdout.write(`Linux Debian/Ubuntu packages written to ${packageDir}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
