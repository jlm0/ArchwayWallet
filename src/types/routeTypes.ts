import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {AccountType, AddressBookEntryType, HDPathType} from './reduxStoreTypes';

export type BaseNavigatorType = {
  AppLogin: undefined;
  AppHome: undefined;
  AccountSetup: undefined;
};

export type BaseNavigatorPropsType = StackScreenProps<BaseNavigatorType>;

export type DrawerNavigatorType = {
  Wallet: undefined;
  Governance: undefined;
  Accounts: undefined;
  AddressBook: undefined;
  AccountHistory: undefined;
  AppSettings: undefined;
};

export type DrawerNavigatorPropsType = DrawerScreenProps<DrawerNavigatorType>;

export type TabNavigatorType = {
  WalletTab: undefined;
  TokensTab: undefined;
  StakingTab: undefined;
  DappsTab: undefined;
};

export type TabNavigatorPropsType = BottomTabScreenProps<TabNavigatorType>;

export type SetupNavigatorType = {
  SetupOnboard: undefined;
  SetupOptions: undefined;
  SetupProfile: undefined;
  SetupSeedCreate: undefined;
  SetupSeedConfirm: undefined;
  SetupSeedImport: undefined;
  SetupSecurity: undefined;
  SetupSuccess: undefined;
};

export type SetupNavigatorPropsType = StackScreenProps<SetupNavigatorType>;

export type SetupOnboardScreenPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
export type SetupOptionsScreenPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
export type SetupSeedCreateScreenPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
export type SetupSeedConfirmScreenPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
export type SetupSecuirtyPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
export type SetupSuccessPropsType = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;
