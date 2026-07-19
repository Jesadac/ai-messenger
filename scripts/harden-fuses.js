const path = require('node:path');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const { flipFuses, FuseState, FuseVersion, FuseV1Options, getCurrentFuseWire } = require('@electron/fuses');

const defaultAppPath = path.join(
  __dirname,
  '..',
  'dist',
  'Retro Messenger Assistant-darwin-arm64',
  'Retro Messenger Assistant.app',
);
const appPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultAppPath;
const targetPlatform = process.argv[3] || process.platform;

const fuseConfig = {
  version: FuseVersion.V1,
  resetAdHocDarwinSignature: targetPlatform === 'darwin',
  strictlyRequireAllFuses: false,
  [FuseV1Options.RunAsNode]: false,
  [FuseV1Options.EnableCookieEncryption]: true,
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
  [FuseV1Options.EnableNodeCliInspectArguments]: false,
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
  [FuseV1Options.OnlyLoadAppFromAsar]: true,
  [FuseV1Options.LoadBrowserProcessSpecificV8Snapshot]: false,
  // The renderer is loaded from packaged file:// URLs. Keep the required file
  // privileges enabled; CSP, navigation blocking, sandboxing, and IPC sender
  // validation constrain those trusted local pages.
  [FuseV1Options.GrantFileProtocolExtraPrivileges]: true,
};

function stripExtendedAttributes(target) {
  const paths = execFileSync('/usr/bin/find', [target, '-print0']).toString().split('\0').filter(Boolean);
  for (const attribute of ['com.apple.FinderInfo', 'com.apple.ResourceFork', 'com.apple.fileprovider.fpfs#P', 'com.apple.provenance', 'com.apple.quarantine']) {
    for (const file of paths) {
      try {
        execFileSync('/usr/bin/xattr', ['-d', attribute, file], { stdio: 'ignore' });
      } catch {
        // The attribute is optional and xattr exits non-zero when it is absent.
      }
    }
  }
}

async function main() {
  const verifyFuses = async (target) => {
    const current = await getCurrentFuseWire(target);
    for (const [option, expected] of Object.entries(fuseConfig)) {
      const expectedState = expected ? FuseState.ENABLE : FuseState.DISABLE;
      if (!/^\d+$/.test(option) || current[option] === expectedState) continue;
      throw new Error(`Electron security fuse ${option} was not applied.`);
    }
  };

  if (targetPlatform !== 'darwin') {
    await flipFuses(appPath, fuseConfig);
    await verifyFuses(appPath);
    process.stdout.write(`Electron security fuses applied and verified for ${targetPlatform}.\n`);
    return;
  }

  const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-messenger-harden-'));
  const hardenedAppPath = path.join(temporaryRoot, path.basename(appPath));
  try {
    execFileSync('/usr/bin/ditto', ['--norsrc', appPath, hardenedAppPath]);
    stripExtendedAttributes(hardenedAppPath);
    await flipFuses(hardenedAppPath, fuseConfig);
    await verifyFuses(hardenedAppPath);
    execFileSync('/usr/bin/codesign', ['--verify', '--deep', '--strict', hardenedAppPath]);
    const releaseArchive = path.join(temporaryRoot, 'AI-Messenger-mac-arm64.zip');
    execFileSync('/usr/bin/ditto', ['-c', '-k', '--norsrc', '--keepParent', hardenedAppPath, releaseArchive]);
    await fs.copyFile(releaseArchive, path.join(__dirname, '..', 'dist', 'AI-Messenger-mac-arm64.zip'));
    await fs.rm(appPath, { recursive: true, force: true });
    execFileSync('/usr/bin/ditto', ['--norsrc', hardenedAppPath, appPath]);
    stripExtendedAttributes(appPath);
  } finally {
    await fs.rm(temporaryRoot, { recursive: true, force: true });
  }
  process.stdout.write('Electron security fuses applied and verified for macOS.\n');
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
