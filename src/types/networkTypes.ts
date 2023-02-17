import {appNetworkNames} from '../constants';
import {ImageSourcePropType} from 'react-native';

export type SupportedNetworksType = {
  [K in (typeof appNetworkNames)[number]]: NetworkDefinitionType;
};

export type NetworkDefinitionType = {
  mainnet: NetworkSchemaType;
  testnet: NetworkSchemaType[];
};

export type NetworkSchemaType = {
  chain_name: (typeof appNetworkNames)[number];
  chain_id: string;
  pretty_name: string;
  website: string;
  logo: ImageSourcePropType;
  git_repo: string;
  network_type: 'mainnet' | 'testnet';
  slip44: number;
  bech32_prefix: string;
  symbol: string;
  display: string;
  denom: string;
  decimals: number;
  coingeck_id: string;
  explorer: BlockExplorerType;
  api: NetworkApiType;
};

export type NetworkApiType = {rpc: ApiType[]; lcd: ApiType[]; grpc: ApiType[]};

export type ApiType = {
  url: string;
  provider: string;
};
export type BlockExplorerType = {
  provider: string;
  url: string;
  tx_page: string;
  account_page: string;
};

export type CustomNetworkSettingsType = {
  chain_name: (typeof appNetworkNames)[number];
  chain_id: string;
  network_type: 'mainnet' | 'testnet';
  api: {rpc: string; lcd: string; grpc: string};
};
