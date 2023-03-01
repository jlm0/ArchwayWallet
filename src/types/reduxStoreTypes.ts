import {appNetworkNames, appThemeNames} from '../constants';
import {ImageSourcePropType} from 'react-native';
import {CustomNetworkSettingsType} from './networkTypes';
import {SupportedCurrencyType, SupportedLanguageType} from './constantsTypes';
import {AvatarImageType} from './componentTypes';

export type UserDataStateType = {
  accounts: AccountType[];
  activeAccount: AccountType | null;
  activeNetwork: ActiveNetworkType;
  customNetworkSettings: CustomNetworkSettingsType[];
  addressBook: AddressBookEntryType[];
};

export type ActiveNetworkType = {
  name: (typeof appNetworkNames)[number];
  type: 'mainnet' | 'testnet';
  chain_id: string;
};

export type AppSettingsStateType = {
  appActiveTheme: (typeof appThemeNames)[number];
  appActiveLanguage: SupportedLanguageType;
  appActiveCurrency: SupportedCurrencyType;
  appLastOpened: number;
  appLastPasswordPrompt: number;
  appEncryptionKeySettings: KeySettingsType | null;
  appPswHash: {
    hash: string;
    settings: KeySettingsType;
  } | null;
  isBiometricEnabled: boolean;
  isFirstTimeUser: boolean;
  isLoggedIn: boolean;
  isTestnetEnabled: boolean;
  isNotificationsEnabled: boolean;
  isAnalyticsEnabled: boolean;
};

export type ViewingKeyType = {
  key: string;
  createdAt: number;
};

export type ViewingPermitType = {
  key: string;
  createdAt: number;
};

export type TokenType = {
  name: string;
  logo: ImageSourcePropType;
  description: string;
  contractAddress: string;
  denom: string;
  decimals: number;
  symbol: string;
  coingeck_id: string;
  viewingKey: ViewingKeyType | null;
  viewingPermit: ViewingPermitType | null;
};

export type AccountType = {
  id: string;
  name: string;
  tags: string[];
  type: AccountCreationType;
  wallet: WalletType;
  avatar: AvatarImageType;
  delegationStatus: 'active' | 'inactive';
  tokens: TokenType[] | null;
};

export type AccountCreationType = 'imported' | 'ledger' | 'generated';

export type AddressBookEntryType = {
  id: string;
  name: string;
  avatar: AvatarImageType;
  address: string;
  memo: string;
  favorite: boolean;
};

export type WalletType = {
  mnemonic: string; //encrytped
  path: HDPathType;
  keys: {mainnet: WalletKeysType[]; testnet: WalletKeysType[]};
  addresses: {mainnet: WalletAddressType[]; testnet: WalletAddressType[]};
  encryptionSettings: EncryptionSettingsType;
};

export type WalletKeysType = {
  network: (typeof appNetworkNames)[number];
  chain_id: string;
  path: HDPathType;
  slip44: number;
  privateKey: string;
  publicKey: string;
  publicKeyHash: string;
};

export type KeySettingsType = {
  algorithm: string;
  rounds: number;
  length: number;
  salt: string;
};
export type EncryptionSettingsType = {
  algorithm: string;
  iv: string;
};

export type WalletAddressType = {
  network: (typeof appNetworkNames)[number];
  chain_id: string;
  type: 'mainnet' | 'testnet';
  prefix: string;
  address: string;
};

export type HDPathType = {
  account: number;
  change: number;
  index: number;
};
