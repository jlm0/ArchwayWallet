import {QueryClient as AuthQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/auth/v1beta1/query_pb.client';
import {QueryClient as AuthzQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/authz/v1beta1/query_pb.client';
import {QueryClient as BankQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/bank/v1beta1/query_pb.client';
import {QueryClient as DistributionQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/distribution/v1beta1/query_pb.client';
import {QueryClient as EvidenceQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/evidence/v1beta1/query_pb.client';
import {QueryClient as FeeGrantQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/feegrant/v1beta1/query_pb.client';
import {QueryClient as GovQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/gov/v1beta1/query_pb.client';
import {QueryClient as MintQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/mint/v1beta1/query_pb.client';
import {QueryClient as NFTQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/nft/v1beta1/query_pb.client';
//import {QueryClient as ParamsQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/params/v1beta1/query_pb.client';
import {QueryClient as SlashingQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/slashing/v1beta1/query_pb.client';
import {QueryClient as StakingQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/staking/v1beta1/query_pb.client';
//import {QueryClient as UpgradeQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/upgrade/v1beta1/query_pb.client';
import {ServiceClient as TendermintQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/base/tendermint/v1beta1/query_pb.client';
import {ServiceClient as NodeQuerier} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/base/node/v1beta1/query_pb.client';
import {ServiceClient as TxService} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/tx/v1beta1/service_pb.client';
import {BroadcastMode} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/tx/v1beta1/service_pb';

import {MsgSend} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/bank/v1beta1/tx_pb';
import {Any} from '@buf/googleapis_googleapis.community_timostamm-protobuf-ts/google/protobuf/any_pb';
import {TxResponse} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/base/abci/v1beta1/abci_pb';
import {
  AuthInfo,
  SignDoc,
  SignerInfo,
  TxBody,
  TxRaw,
} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/tx/v1beta1/tx_pb';

import crypto from 'react-native-quick-crypto';
import {Coin} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/base/v1beta1/coin_pb';
import {BaseAccount} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/auth/v1beta1/auth_pb';
import {PubKey as PublicKey} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/crypto/secp256k1/keys_pb';
import {LegacyAminoPubKey} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/crypto/multisig/keys_pb';
import {SignMode} from '@buf/cosmos_cosmos-sdk.community_timostamm-protobuf-ts/cosmos/tx/signing/v1beta1/signing_pb';

import {encodeSecp256k1Pubkey, KrypticWallet, PubKey} from './KrypticWallet';
import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport';
import {
  toByteArray as fromBase64,
  fromByteArray as toBase64,
} from 'react-native-quick-base64';

export type ClientQuerier = {
  auth: AuthQuerier;
  authz: AuthzQuerier;
  bank: BankQuerier;
  distribution: DistributionQuerier;
  evidence: EvidenceQuerier;
  feegrant: FeeGrantQuerier;
  gov: GovQuerier;
  mint: MintQuerier;
  nft: NFTQuerier;
  //   params: ParamsQuerier;
  slashing: SlashingQuerier;
  staking: StakingQuerier;
  //ugprade: UpgradeQuerier;
  tendermint: TendermintQuerier;
  node: NodeQuerier;
};

export type TxMsg<T> = {
  (params: T, txOptions?: TxOptions): Promise<TxResponse>;
};

export type ClientMessenger = {
  // auth: AuthMessenger;
  // authz: AuthzMessenger;
  service: TxService;
  bank: {
    send: TxMsg<MsgSend>;
  };
  // distribution: DistributionMessenger;
  // evidence: EvidenceMessenger;
  // feegrant: FeeGrantMessenger;
  // gov: GovMessenger;
  // mint: MintMessenger;
  // nft: NFTMessenger;
  //params: ParamsQuerier;
  // slashing: SlashingMessenger;
  // staking: StakingMessenger;
  //ugprade: UpgradeMessenger;
};

export type SignerData = {
  readonly accountNumber: number;
  readonly sequence: number;
  readonly chainId: string;
};

export type StdFee = {
  readonly amount: readonly Coin[];
  readonly gas: string;
  readonly granter?: string;
};

export type TxOptions = {
  gasLimit?: number;
  gasPriceInFeeDenom?: number;
  feeDenom: string;
  feeGranter?: string;
  memo?: string;
};

export type KrypticClientConfig = {
  grpcWebEndpoint: string;
  signerClient: KrypticWallet;
  signerAddress: string;
  chain_id: string;
};

export class KrypticClient {
  query: ClientQuerier;
  tx: ClientMessenger;
  signerClient: KrypticWallet;
  signerAddress: string;
  chain_id: string;

  constructor({
    signerAddress,
    chain_id,
    grpcWebEndpoint,
    signerClient,
  }: KrypticClientConfig) {
    if (!signerAddress || !chain_id || !grpcWebEndpoint || !signerClient) {
      throw new Error('Incomplete config params.');
    }
    if (!grpcWebEndpoint.startsWith('https://')) {
      throw new Error("Client requires 'https://' gRPC-wweb endpoint.");
    }
    this.signerAddress = signerAddress;
    this.chain_id = chain_id;
    this.signerClient = signerClient;

    const grpcWebTransport = new GrpcWebFetchTransport({
      format: 'binary',
      baseUrl: grpcWebEndpoint,
    });

    this.query = {
      auth: new AuthQuerier(grpcWebTransport),
      authz: new AuthzQuerier(grpcWebTransport),
      bank: new BankQuerier(grpcWebTransport),
      distribution: new DistributionQuerier(grpcWebTransport),
      evidence: new EvidenceQuerier(grpcWebTransport),
      feegrant: new FeeGrantQuerier(grpcWebTransport),
      gov: new GovQuerier(grpcWebTransport),
      mint: new MintQuerier(grpcWebTransport),
      nft: new NFTQuerier(grpcWebTransport),
      //   params: new ParamsQuerier(grpcWebTransport),
      slashing: new SlashingQuerier(grpcWebTransport),
      staking: new StakingQuerier(grpcWebTransport),
      //   ugprade: new UpgradeQuerier(grpcWebTransport),
      tendermint: new TendermintQuerier(grpcWebTransport),
      node: new NodeQuerier(grpcWebTransport),
    };

    this.tx = {
      service: new TxService(grpcWebTransport),
      bank: {
        send: (params: MsgSend, txOptions?: TxOptions) =>
          this.signAndBroadcast(
            [
              Any.create({
                typeUrl: '/cosmos.bank.v1beta1.MsgSend',
                value: MsgSend.toBinary(params),
              }),
            ],
            txOptions,
          ),
      },
    };

    // this.tx = {
    //   auth: new AuthMessenger(grpcWebTransport),
    //   authz: new AuthzMessenger(grpcWebTransport),
    //   bank: new BankMessenger(grpcWebTransport),
    //   distribution: new DistributionMessenger(grpcWebTransport),
    //   evidence: new EvidenceMessenger(grpcWebTransport),
    //   feegrant: new FeeGrantMessenger(grpcWebTransport),
    //   gov: new GovMessenger(grpcWebTransport),
    //   mint: new MintMessenger(grpcWebTransport),
    //   nft: new NFTMessenger(grpcWebTransport),
    //   slashing: new SlashingMessenger(grpcWebTransport),
    //   staking: new StakingMessenger(grpcWebTransport),
    //   //ugprade: UpgradeMessenger;
    // };
  }

  async prepareAndSign(
    messages: Any[],
    txOptions?: TxOptions,
  ): Promise<Uint8Array> {
    const gasLimit = txOptions?.gasLimit ?? 100000;

    const gasPriceInFeeDenom = txOptions?.gasPriceInFeeDenom ?? 0.01;

    const feeDenom = txOptions?.feeDenom ?? 'uconst';

    const memo = txOptions?.memo ?? '';

    const feeGranter = txOptions?.feeGranter;

    // this.simulate(
    //   messages,
    //   {
    //     gas: String(gasLimit),
    //     amount: [
    //       {
    //         amount: String(this.gasToFee(gasLimit, gasPriceInFeeDenom)),
    //         denom: feeDenom,
    //       },
    //     ],
    //     granter: feeGranter,
    //   },
    //   memo,
    // );

    const txRaw = await this.sign(
      messages,
      {
        gas: String(gasLimit),
        amount: [
          {
            amount: String(this.gasToFee(gasLimit, gasPriceInFeeDenom)),
            denom: feeDenom,
          },
        ],
        granter: feeGranter,
      },
      memo,
    );

    return TxRaw.toBinary(txRaw);
  }

  async signAndBroadcast(
    messages: Any[],
    txOptions?: TxOptions,
  ): Promise<TxResponse> {
    const txBytes = await this.prepareAndSign(messages, txOptions);
    return this.broadcastTx(txBytes);
  }

  async simulate(messages: Any[], fee: StdFee, memo: string): Promise<number> {
    const txRaw = await this.sign(messages, fee, memo);
    console.log(txRaw);
    const {
      response: {gasInfo},
    } = await this.tx.service.simulate({txBytes: TxRaw.toBinary(txRaw)});

    console.log(gasInfo);

    return Number(gasInfo?.gasUsed);
  }

  async sign(messages: Any[], fee: StdFee, memo: string): Promise<TxRaw> {
    const {
      response: {account},
    } = await this.query.auth.account({address: this.signerAddress});

    if (!account) {
      throw new Error(
        `Account '${this.signerAddress}' does not exist on chain. Send some tokens there before trying to query sequence.`,
      );
    }
    if (account.typeUrl !== '/cosmos.auth.v1beta1.BaseAccount') {
      throw new Error(
        `Cannot sign with account of type "${account.typeUrl}", can only sign with "/cosmos.auth.v1beta1.BaseAccount".`,
      );
    }

    const baseAccount = BaseAccount.fromBinary(account?.value);

    const signerData: SignerData = {
      accountNumber: Number(baseAccount.accountNumber),
      sequence: Number(baseAccount.sequence),
      chainId: this.chain_id,
    };

    return this.signDirect(messages, fee, memo, signerData);
  }

  async signDirect(
    messages: Any[],
    fee: StdFee,
    memo: string,
    {accountNumber, sequence, chainId}: SignerData,
  ): Promise<TxRaw> {
    const pubkey = await this.encodePubkey(
      encodeSecp256k1Pubkey(this.signerClient.pubKey),
    );
    const txBody = TxBody.create({
      messages,
      memo,
    });

    const txBodyBytes = TxBody.toBinary(txBody);

    const gasLimit = Number(fee.gas);

    const authInfoBytes = await this.makeAuthInfoBytes(
      [{pubkey, sequence}],
      fee.amount,
      gasLimit,
      fee.granter,
    );

    const signDoc = this.makeSignDocProto(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    );

    const {signature, signed} = await this.signerClient.signDirect(
      this.signerAddress,
      signDoc,
    );

    return TxRaw.create({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  async broadcastTx(txBytes: Uint8Array): Promise<TxResponse> {
    const txhash = crypto.createHash('sha256').update(txBytes).digest('hex');

    const start = Date.now();
    const {
      response: {txResponse},
    } = await this.tx.service.broadcastTx({
      txBytes,
      mode: BroadcastMode.SYNC,
    });

    console.log('TxResponse@broadcastTx', txResponse);

    if (txResponse?.code !== 0) {
      throw new Error(
        `Broadcasting transaction failed with code ${txResponse?.code} (codespace: ${txResponse?.codespace}). Log: ${txResponse?.rawLog}`,
      );
    }

    await this.sleep(3000);

    while (true) {
      console.log('searching...');
      const {
        response: {txResponse},
      } = await this.tx.service.getTx({hash: txhash});

      if (txResponse) {
        return txResponse;
      }
      if (start + 30000 < Date.now()) {
        throw new Error(
          `Transaction ID ${txhash} was submitted but was not yet found on the chain. You might want to check later or increase broadcastTimeoutMs from '${3000}'.`,
        );
      }
      await this.sleep(3000);
    }
  }

  async makeAuthInfoBytes(
    signers: ReadonlyArray<{
      readonly pubkey: Any;
      readonly sequence: number;
    }>,
    feeAmount: readonly Coin[],
    gasLimit: number,
    feeGranter?: string,
    signMode?: SignMode,
  ): Promise<Uint8Array> {
    if (!signMode) {
      signMode = SignMode.DIRECT;
    }

    const authInfo = AuthInfo.create({
      signerInfos: this.makeSignerInfos(signers, signMode),
      fee: {
        amount: [...feeAmount],
        gasLimit: String(gasLimit),
        granter: feeGranter ?? '',
        payer: '',
      },
    });

    return AuthInfo.toBinary(authInfo);
  }

  makeSignerInfos(
    signers: ReadonlyArray<{
      readonly pubkey: Any;
      readonly sequence: number;
    }>,
    signMode: SignMode,
  ): SignerInfo[] {
    return signers.map(
      ({pubkey, sequence}): SignerInfo =>
        SignerInfo.create({
          publicKey: pubkey,
          sequence: String(sequence),
          modeInfo: {
            sum: {
              oneofKind: 'single',
              single: {
                mode: signMode,
              },
            },
          },
        }),
    );
  }
  makeSignDocProto(
    bodyBytes: Uint8Array,
    authInfoBytes: Uint8Array,
    chainId: string,
    accountNumber: number,
  ): SignDoc {
    return {
      bodyBytes: bodyBytes,
      authInfoBytes: authInfoBytes,
      chainId: chainId,
      accountNumber: String(accountNumber),
    };
  }

  async encodePubkey(pubkey: PubKey): Promise<Any> {
    if (pubkey.type === 'tendermint/PubKeySecp256k1') {
      const pubkeyProto = PublicKey.create({
        key: fromBase64(pubkey.value),
      });
      return Any.create({
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
        value: PublicKey.toBinary(pubkeyProto),
      });
    } else if (pubkey.type === 'tendermint/PubKeyMultisigThreshold') {
      const pubkeyProto = LegacyAminoPubKey.create({
        threshold: Number(pubkey.value.threshold),
        publicKeys: pubkey.value.pubkeys.map(this.encodePubkey),
      });
      return Any.create({
        typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
        value: LegacyAminoPubKey.toBinary(pubkeyProto),
      });
    } else {
      throw new Error(`Pubkey type ${pubkey.type} not recognized`);
    }
  }

  sleep(ms: number) {
    return new Promise(accept => setTimeout(accept, ms));
  }
  gasToFee(gasLimit: number, gasPrice: number): number {
    return Math.ceil(gasLimit * gasPrice);
  }
}
