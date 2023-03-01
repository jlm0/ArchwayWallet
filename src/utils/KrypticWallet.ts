import crypto from 'react-native-quick-crypto';
import {
  toByteArray as fromBase64,
  fromByteArray as toBase64,
} from 'react-native-quick-base64';
import {SignDoc} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/tx/v1beta1/tx_pb.js';

import {concatBytes} from '@noble/hashes/utils';
import * as secp256k1 from '@noble/secp256k1';

secp256k1.utils.hmacSha256Sync = (key, ...msgs) =>
  Uint8Array.from(
    crypto
      .createHmac('SHA256', key)
      .update(concatBytes(...msgs))
      .digest(),
  );

export interface PubKey {
  readonly type:
    | 'tendermint/PubKeySecp256k1'
    | 'tendermint/PubKeyEd25519'
    | 'tendermint/PubKeySr25519'
    | 'tendermint/PubKeyMultisigThreshold';
  readonly value: any;
}

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}

export type Algo = 'secp256k1' | 'ed25519' | 'sr25519';

export interface DirectSignResponse {
  readonly signed: SignDoc;
  readonly signature: StdSignature;
}

export class KrypticWallet {
  privKey: Uint8Array;
  pubKey: Uint8Array;

  constructor(privKey: Uint8Array, pubKey: Uint8Array) {
    this.privKey = privKey;
    this.pubKey = pubKey;
  }

  async signDirect(
    address: string,
    signDoc: SignDoc,
  ): Promise<DirectSignResponse> {
    const signBytes = this.makeSignBytes(signDoc);

    const hashedMessage = new Uint8Array(
      crypto.createHash('sha256').update(signBytes).digest(),
    );

    const signature = secp256k1.signSync(hashedMessage, this.privKey, {
      extraEntropy: true,
      der: false,
    });

    const signResponse = {
      signed: signDoc,
      signature: this.encodeSecp256k1Signature(this.pubKey, signature),
    };

    return signResponse;
  }

  makeSignBytes({
    accountNumber,
    authInfoBytes,
    bodyBytes,
    chainId,
  }: SignDoc): Uint8Array {
    const signDoc = SignDoc.create({
      accountNumber,
      authInfoBytes,
      bodyBytes,
      chainId,
    });
    return SignDoc.toBinary(signDoc);
  }

  encodeSecp256k1Signature(
    pubkey: Uint8Array,
    signature: Uint8Array,
  ): StdSignature {
    if (signature.length !== 64) {
      throw new Error(
        'Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.',
      );
    }
    return {
      pub_key: encodeSecp256k1Pubkey(pubkey),
      signature: toBase64(signature),
    };
  }
}

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error(
      'Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03',
    );
  }
  return {
    type: 'tendermint/PubKeySecp256k1',
    value: toBase64(pubkey),
  };
}
