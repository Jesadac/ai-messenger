const crypto = require('node:crypto');
const { promisify } = require('node:util');

const scrypt = promisify(crypto.scrypt);
const KEY_BYTES = 32;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const SCRYPT_OPTIONS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

async function createKey(passphrase, salt = crypto.randomBytes(SALT_BYTES)) {
  if (typeof passphrase !== 'string' || passphrase.length < 10 || passphrase.length > 1024) {
    throw new Error('Your vault passphrase must be between 10 and 1,024 characters.');
  }
  if (!Buffer.isBuffer(salt) || salt.length !== SALT_BYTES) throw new Error('The encrypted vault has an invalid salt.');
  const key = await scrypt(passphrase, salt, KEY_BYTES, SCRYPT_OPTIONS);
  return { key, salt };
}

function encryptWithKey(plainText, key, salt) {
  if (!Buffer.isBuffer(key) || key.length !== KEY_BYTES) throw new Error('The local vault is locked.');
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]);
  return JSON.stringify({
    version: 1,
    algorithm: 'aes-256-gcm',
    kdf: 'scrypt',
    kdfParameters: { N: SCRYPT_OPTIONS.N, r: SCRYPT_OPTIONS.r, p: SCRYPT_OPTIONS.p },
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
    ciphertext: ciphertext.toString('base64'),
  });
}

function decryptWithKey(serializedEnvelope, key) {
  let envelope;
  try {
    envelope = JSON.parse(serializedEnvelope);
  } catch {
    throw new Error('The encrypted vault file is damaged or invalid.');
  }
  if (envelope.version !== 1 || envelope.algorithm !== 'aes-256-gcm' || envelope.kdf !== 'scrypt') {
    throw new Error('This vault format is not supported.');
  }
  if (envelope.kdfParameters?.N !== SCRYPT_OPTIONS.N || envelope.kdfParameters?.r !== SCRYPT_OPTIONS.r || envelope.kdfParameters?.p !== SCRYPT_OPTIONS.p) {
    throw new Error('This vault uses unsupported key-derivation settings.');
  }
  try {
    const iv = Buffer.from(envelope.iv, 'base64');
    const tag = Buffer.from(envelope.tag, 'base64');
    if (iv.length !== IV_BYTES || tag.length !== 16) throw new Error('Invalid authenticated-encryption metadata.');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([
      decipher.update(Buffer.from(envelope.ciphertext, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  } catch {
    throw new Error('The vault passphrase is incorrect or the encrypted file has been changed.');
  }
}

async function unlockEnvelope(serializedEnvelope, passphrase) {
  let envelope;
  try {
    envelope = JSON.parse(serializedEnvelope);
  } catch {
    throw new Error('The encrypted vault file is damaged or invalid.');
  }
  if (typeof envelope.salt !== 'string') throw new Error('The encrypted vault file has no valid salt.');
  const { key, salt } = await createKey(passphrase, Buffer.from(envelope.salt, 'base64'));
  return { key, salt, plainText: decryptWithKey(serializedEnvelope, key) };
}

module.exports = { createKey, decryptWithKey, encryptWithKey, unlockEnvelope };
