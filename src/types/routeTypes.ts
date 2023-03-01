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
  SetupProfile: {route: string};
  SetupSeedCreate: {
    route: string;
    accountName: string;
    avatarImage: AvatarImage;
    accountTags: string[];
  };
  SetupSeedConfirm: {
    route: string;
    accountName: string;
    avatarImage: AvatarImage;
    hdPath: HDPathType;
    seed: string[];
    accountTags: string[];
  };
  SetupSeedImport: {
    route: string;
    accountName: string;
    avatarImage: AvatarImage;
    accountTags: string[];
  };
  SetupImportLedger: {
    route: string;
    accountName: string;
    avatarImage: AvatarImage;
    accountTags: string[];
  };
  SetupSecurity: {
    route: string;
    avatarImage: AvatarImage;
    hdPath: HDPathType;
    accountName: string;
    seed: string[];
    accountTags: string[];
  };
  SetupSuccess: undefined;
};

export type SetupNavigatorPropsType = StackScreenProps<SetupNavigatorType>;

export type SetupOnboardScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupOnboard'
>;

export type SetupOptionsScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupOptions'
>;

export type SetupProfileScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupProfile'
>;

export type SetupSeedCreateScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupSeedCreate'
>;
export type SetupSeedConfirmScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupSeedConfirm'
>;
export type SetupSeedImportScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupSeedImport'
>;
export type SetupSecurityScreenProps = StackScreenProps<
  SetupNavigatorType,
  'SetupSecurity'
>;
export type SetupSuccessScreenProps = CompositeScreenProps<
  StackScreenProps<SetupNavigatorType, 'SetupSuccess'>,
  BaseNavigatorPropsType
>;
