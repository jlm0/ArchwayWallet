import crypto from 'react-native-quick-crypto';
import {
  EncryptionSettingsType,
  KeySettingsType,
} from '../types/reduxStoreTypes';
import {bufferToUint8, uint8ToBase64} from './encoding';

/**
 * Generates a random number of bytes.
 * @param {number} numBytes - The number of bytes to generate.
 * @param {'buffer'|'Uin8Array'} output - The output type either Buffer or Uint8Array
 * @returns {Promise<Buffer>} - A promise that resolves to a Buffer containing the random bytes.
 */
export function generateRandomBytes(
  numBytes: number,
  output: 'buffer' | 'Uint8Array' = 'Uint8Array',
): Promise<Uint8Array | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(numBytes, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          output === 'buffer'
            ? (buf as ArrayBuffer)
            : bufferToUint8(buf as ArrayBuffer),
        );
      }
    });
  });
}

/**
Creates a PBKDF2 key using the provided password and salt, with the given number of iterations and desired key length. Returns a Promise that resolves with the derived key as a Uint8Array or rejects with an error if something goes wrong.
@param {string} password - The password to use for generating the PBKDF2 key.
@param {string | Uint8Array} salt - The salt to use for generating the PBKDF2 key.
@param {number} [iterations=262144] - The number of iterations to use for generating the PBKDF2 key.
@param {number} [keyLength=32] - The desired length of the generated PBKDF2 key.
@param {number} [ algorithm = 'sha512'] - The hashing algorithm to use.
@returns {Promise<Uint8Array>} - A Promise that resolves with the derived key as a Uint8Array.
@throws {Error} - If an error occurs during encryption.
*/
export function createPBKDF2Key(
  password: string,
  salt: string | Buffer | ArrayBuffer,
  iterations = 262144,
  keyLength = 32,
  algorithm = 'sha512',
): Promise<{
  key: Uint8Array;
  settings: KeySettingsType;
}> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      algorithm,
      (err, derivedKey) => {
        if (err || !derivedKey) {
          reject(err);
        } else {
          resolve({
            key: bufferToUint8(derivedKey),
            settings: {
              algorithm: algorithm,
              rounds: iterations,
              length: keyLength,
              salt:
                typeof salt === 'string'
                  ? salt
                  : uint8ToBase64(bufferToUint8(salt)),
            },
          });
        }
      },
    );
  });
}

/**
 * Returns the hash160 hash of the input string.
 * @param {Uint8Array} input - The input string to be hashed.
 * @returns {Uint8Array} - The hash160 hash of the input string.
 */
export const hash160 = (input: Uint8Array): Uint8Array => {
  return bufferToUint8(
    crypto
      .createHash('rmd160')
      .update(crypto.createHash('sha256').update(input).digest())
      .digest(),
  );
};

/**
  Asynchronously encrypts data using a given key.
  @param {(Uint8Array|string)} data - The data to encrypt.
  @param {Uint8Array} key - The key to use for encryption.
  @param {Uint8Array} iv - The initialization vector to use for encryption.
  @param {string} algorithm - The algorithm to use for encryption. Defaults to aes-256-cbc.
  @returns {Promise<Uint8Array>} - A promise that resolves to the encrypted data as a Buffer.
  @throws {Error} - If an error occurs during encryption.
  */
export const encrypt = (
  key: Uint8Array,
  data: Uint8Array | string,
  iv: Buffer | ArrayBuffer,
  algorithm = 'aes-256-cbc',
): Promise<{
  cipher: Uint8Array;
  settings: EncryptionSettingsType;
}> => {
  return new Promise((resolve, reject) => {
    try {
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = new Uint8Array(
        Buffer.concat([
          new Uint8Array(cipher.update(data) as ArrayBuffer),
          new Uint8Array(cipher.final()),
        ]),
      );

      resolve({
        cipher: encrypted,
        settings: {algorithm, iv: uint8ToBase64(bufferToUint8(iv))},
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
  Asynchronously encrypts data using a given key.
  @param {(Uint8Array|string)} data - The data to decrypt.
  @param {Uint8Array} key - The key to use for decryption.
  @param {Uint8Array} iv - The initialization vector to use for decryption.
  @param {string} algorithm - The algorithm to use for encryption. Defaults to aes-256-cbc.
  @returns {Promise<Uint8Array>} - A promise that resolves to the encrypted data as a Uint8Array.
  @throws {Error} - If an error occurs during decryption.
  */
export const decrypt = (
  key: Uint8Array,
  data: Uint8Array | string,
  iv: Buffer | ArrayBuffer,
  algorithm = 'aes-256-cbc',
): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    try {
      const cipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = new Uint8Array(
        Buffer.concat([
          new Uint8Array(cipher.update(data) as ArrayBuffer),
          new Uint8Array(cipher.final()),
        ]),
      );

      resolve(decrypted);
    } catch (err) {
      reject(err);
    }
  });
};
