import crypto from 'react-native-quick-crypto';

import {HDKey} from './Bip32';
import {bech32} from '@scure/base';
import {
  AccountCreationType,
  AccountType,
  EncryptionSettingsType,
  HDPathType,
  WalletAddressType,
  WalletKeysType,
} from '../types/reduxStoreTypes';
import * as Keychain from 'react-native-keychain';
import {uint8ToBase64} from './encoding';
import {createPBKDF2Key, encrypt} from './crypto';
import {appNetworkNames, AppNetworks} from '../constants';
import {AvatarImageType} from '../types';

/**
 * Generate the public and private key pairs from a mnemonic and path.
 * @param {string} mnemonic
 * @param {HDPathType} path
 * @returns
 */
export async function generateWalletKeys(
  mnemonic: string,
  path: HDPathType,
  slip44: number,
): Promise<{
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  publicKeyHash: Uint8Array;
}> {
  return new Promise((resolve, reject) => {
    try {
      createPBKDF2Key(mnemonic, 'mnemonic', 2048, 64, 'sha512')
        .then(seed => {
          return HDKey.fromMasterSeed(seed.key).derive(
            `m/44'/${slip44}'/${path.account}'/${path.change}/${path.index}`,
          );
        })
        .then(node => {
          const privateKey = node.privateKey as Uint8Array;
          const publicKey = node.publicKey as Uint8Array;
          const publicKeyHash = node.pubKeyHash as Uint8Array;
          resolve({
            privateKey,
            publicKey,
            publicKeyHash,
          });
        });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 *
 * @param {string} prefix - A network bech32 prefix to be used for the address.
 * @param publicKeyHash - A Uint8Array of the hash160 of the publickey.
 * @returns {string} - The resulting network address.
 */

export function getAddress(prefix: string, publicKeyHash: Uint8Array): string {
  return bech32.encode(prefix, bech32.toWords(publicKeyHash));
}

/**
 *
 * @param {string} prefix - A network bech32 prefix to be used for the address.
 * @param publicKeyHash - A Uint8Array of the hash160 of the publickey.
 * @returns {string} - The resulting network address.
 */

export function validateAddress(address: string): boolean {
  const mainnetPrefix = appNetworkNames.map(
    name => AppNetworks[name].mainnet.bech32_prefix,
  );
  const testnetPrefix = appNetworkNames
    .map(name => AppNetworks[name].testnet.map(net => net.bech32_prefix))
    .flat();

  try {
    const decoded = bech32.decode(address);
    return (
      mainnetPrefix.includes(decoded.prefix) ||
      testnetPrefix.includes(decoded.prefix)
    );
  } catch (error) {
    return false;
  }
}

/**
 * Generates a random RFC 4122 version 4 UUID. The UUID is generated using a cryptographic pseudorandom number generator.
 * @returns {string} - A random UUID.
 */
export function randomID() {
  return crypto.randomUUID();
}

/**
 * Return an account creation type depending on the creation path.
 * @param path
 * @returns
 */

export function accountCreationType(path: string): AccountCreationType {
  switch (path) {
    case 'NewSeed':
      return 'generated';

    case 'ImportLedger':
      return 'ledger';

    case 'ImportSeed':
      return 'imported';

    default:
      return 'generated';
  }
}

/**
 * Creates an Account Instance.
 * @param accountName - A string to be used as the name for the account.
 * @param avatarImage - An AvatarImage type for the avatar image for the account.
 * @param routeSource - The route used to create the account to know if its imported or generated.
 * @param seed - A BIP39 mnemonic seed phrase.
 * @param hdPath - An HDPath object used for deriving the key path.
 * @param kdf - The pbkdf2 key to be used for encrypting.
 * @param iv - The initilization vector to be used for encrypting.
 * @param privateKey
 * @param publicKey
 * @param publicKeyHash
 * @returns
 */

export async function createNewAccount(
  accountName: string,
  avatarImage: AvatarImageType,
  accountTags: string[],
  routeSource: string,
  seed: string,
  hdPath: HDPathType,
  kdf: Uint8Array,
  iv: Buffer | ArrayBuffer,
): Promise<AccountType> {
  const MainnetKeys: WalletKeysType[] = [];
  const Testnetkeys: WalletKeysType[] = [];
  const MainnetAddresses: WalletAddressType[] = [];
  const TestnetAddresses: WalletAddressType[] = [];
  const encryptedMnemonic = await encrypt(kdf, seed, iv);
  const encryptionSettings: EncryptionSettingsType = encryptedMnemonic.settings;

  for (const networkName of appNetworkNames) {
    const mainnet = AppNetworks[networkName].mainnet;
    const mainnetKey = await generateWalletKeys(seed, hdPath, mainnet.slip44);
    const encryptedMainnetPrivKey = await encrypt(
      kdf,
      mainnetKey.privateKey,
      iv,
    );

    MainnetKeys.push({
      network: networkName,
      chain_id: mainnet.chain_id,
      path: hdPath,
      slip44: mainnet.slip44,
      privateKey: uint8ToBase64(encryptedMainnetPrivKey.cipher),
      publicKey: uint8ToBase64(mainnetKey.publicKey),
      publicKeyHash: uint8ToBase64(mainnetKey.publicKeyHash),
    });

    MainnetAddresses.push({
      network: networkName,
      chain_id: mainnet.chain_id,
      type: 'mainnet',
      prefix: mainnet.bech32_prefix,
      address: getAddress(mainnet.bech32_prefix, mainnetKey.publicKeyHash),
    });

    const testnets = AppNetworks[networkName].testnet;

    for (const testnet of testnets) {
      if (
        mainnet.bech32_prefix == testnet.bech32_prefix &&
        mainnet.slip44 === testnet.slip44
      ) {
        // If prefixs and slip44 are the same then just use the mainnet keys instead of redoing the derivation.
        Testnetkeys.push({
          network: networkName,
          chain_id: testnet.chain_id,
          path: hdPath,
          slip44: testnet.slip44,
          privateKey: uint8ToBase64(encryptedMainnetPrivKey.cipher),
          publicKey: uint8ToBase64(mainnetKey.publicKey),
          publicKeyHash: uint8ToBase64(mainnetKey.publicKeyHash),
        });

        TestnetAddresses.push({
          network: networkName,
          chain_id: testnet.chain_id,
          type: 'testnet',
          prefix: testnet.bech32_prefix,
          address: getAddress(mainnet.bech32_prefix, mainnetKey.publicKeyHash),
        });
        continue;
      }

      const testnetKey = await generateWalletKeys(seed, hdPath, testnet.slip44);
      const encryptedTestnetKey = await encrypt(kdf, testnetKey.privateKey, iv);

      Testnetkeys.push({
        network: networkName,
        chain_id: testnet.chain_id,
        path: hdPath,
        slip44: testnet.slip44,
        privateKey: uint8ToBase64(encryptedTestnetKey.cipher),
        publicKey: uint8ToBase64(testnetKey.publicKey),
        publicKeyHash: uint8ToBase64(testnetKey.publicKeyHash),
      });

      TestnetAddresses.push({
        network: networkName,
        chain_id: testnet.chain_id,
        type: 'testnet',
        prefix: testnet.bech32_prefix,
        address: getAddress(mainnet.bech32_prefix, mainnetKey.publicKeyHash),
      });
    }
  }

  return {
    id: randomID(),
    name: accountName,
    tags: accountTags,
    type: accountCreationType(routeSource),
    wallet: {
      mnemonic: uint8ToBase64(encryptedMnemonic.cipher),
      keys: {
        mainnet: MainnetKeys,
        testnet: Testnetkeys,
      },
      addresses: {
        mainnet: MainnetAddresses,
        testnet: TestnetAddresses,
      },
      encryptionSettings,
      path: hdPath,
    },
    avatar: avatarImage,
    delegationStatus: 'inactive',
    tokens: null,
  };
}

export async function setKeyChain(key: string) {
  try {
    let result = await Keychain.setGenericPassword('KrypticKeychain', key, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      authenticationPrompt: {
        title: 'Set Biometric',
        subtitle: 'Secures Keys with Fingerprint',
        cancel: 'Cancel',
      },
    });
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function getKeyChainKey(
  title: string,
  subtitle: string,
  cancel: string,
) {
  try {
    let result = await Keychain.getGenericPassword({
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      authenticationPrompt: {
        title,
        subtitle,
        cancel,
      },
    });
    if (!result) {
      return false;
    }
    return result.password;
  } catch (error) {
    return false;
  }
}

export async function getKeyChainLogin(
  title: string,
  subtitle: string,
  cancel: string,
) {
  try {
    let result = await Keychain.getGenericPassword({
      authenticationPrompt: {
        title,
        subtitle,
        cancel,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function supportsFingerprintBiometry() {
  let type = await Keychain.getSupportedBiometryType();
  return (
    type === Keychain.BIOMETRY_TYPE.TOUCH_ID ||
    type === Keychain.BIOMETRY_TYPE.FINGERPRINT
  );
}

export function prettyAddress(address: string) {
  return address.slice(0, 12) + '...' + address.slice(-6);
}
