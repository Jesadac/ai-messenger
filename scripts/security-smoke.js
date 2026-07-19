const { createKey, decryptWithKey, encryptWithKey, unlockEnvelope } = require('../src/secure-store');

async function main() {
  const passphrase = 'standalone-security-test-passphrase';
  const created = await createKey(passphrase);
  const encrypted = encryptWithKey('AI Messenger security check', created.key, created.salt);
  if (encrypted.includes('AI Messenger security check')) throw new Error('Encrypted output contains plaintext.');
  if (decryptWithKey(encrypted, created.key) !== 'AI Messenger security check') throw new Error('Vault round-trip failed.');
  const unlocked = await unlockEnvelope(encrypted, passphrase);
  if (unlocked.plainText !== 'AI Messenger security check') throw new Error('Passphrase unlock failed.');
  let rejectedWrongPassphrase = false;
  try {
    await unlockEnvelope(encrypted, 'incorrect-standalone-passphrase');
  } catch {
    rejectedWrongPassphrase = true;
  }
  if (!rejectedWrongPassphrase) throw new Error('Vault accepted an incorrect passphrase.');
  process.stdout.write('Standalone encrypted-vault round-trip passed.\n');
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
