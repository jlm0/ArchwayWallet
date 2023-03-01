import {fromByteArray, toByteArray} from 'react-native-quick-base64';

export function bufferToUint8(input: ArrayBuffer | Buffer): Uint8Array {
  if (!(input instanceof ArrayBuffer || input instanceof Buffer)) {
    throw new Error(
      `Input must be an ArrayBuffer or a Buffer. Got ${typeof input}`,
    );
  }

  let buffer: Buffer;
  if (input instanceof ArrayBuffer) {
    buffer = Buffer.from(input);
  } else {
    buffer = input;
  }

  return new Uint8Array(buffer);
}

/**
Converts a Uint8Array to a Buffer.
@param {Uint8Array} uint8Array - The Uint8Array to convert.
@return {Buffer} The converted Buffer.
*/
export function uInt8ToBuffer(arr: Uint8Array): Buffer {
  return Buffer.from(arr.buffer as ArrayBuffer);
}

/**
 * Converts Uint8Array to base64 string
 * @param {Uint8Array} uint8array - The Uint8Array to be converted to base64 string
 * @returns {string} - The base64 string representation of the Uint8Array
 */
export function uint8ToBase64(uint8array: Uint8Array): string {
  return fromByteArray(uint8array);
}

/**
 * Converts a base64 string to a Uint8Array
 * @param {string} base64String - The base64 string to convert
 * @return {Uint8Array} The resulting Uint8Array
 */

export function base64ToUint8(base64String: string): Uint8Array {
  return toByteArray(base64String);
}

/**
 * Converts a Uint8Array to a UTF-8 string.
 * @param {Uint8Array} arr The Uint8Array to convert.
 * @returns {string} The resulting UTF-8 string.
 */
export function uint8ToUtf8(arr: Uint8Array): string {
  return Buffer.from(arr).toString('utf8');
}
