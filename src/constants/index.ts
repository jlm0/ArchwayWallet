import {lightTheme} from '../themes/lightTheme';
import CommonPasswordList from './CommonPasswords.json';
import TermsAndConditions from './TermsAndConditions';
import {
  AppThemesType,
  SupportedCurrencyType,
  SupportedLanguageType,
  SupportedNetworksType,
} from '../types';

import {Archway} from './networks/';

export {TermsAndConditions};

export {CommonPasswordList};

export const appThemeNames = ['light'] as const;

export const appNetworkNames = [
  'archway',
  // 'axelar',
  // 'bandchain',
  // 'cosmoshub',
  // 'evmos',
  // 'fetchhub',
  // 'gravitybridge',
  // 'injective',
  // 'jackal',
  // 'juno',
  // 'kujira',
  // 'osmosis',
  // 'secretnetwork',
  // 'stargaze',
  // 'umee',
] as const;

export const AppLanguages: SupportedLanguageType[] = [
  {id: 'en', name: 'English'},
  {id: 'es', name: 'Spanish'},
  // {id: 'fr', name: 'French'},
  // {id: 'pt', name: 'Portuguese'},
];

export const AppCurrencies: SupportedCurrencyType[] = [
  {id: 'USD', name: 'US Dollar'},
  // {id: 'EUR', name: 'Euro'},
  // {id: 'GBP', name: 'Pound'},
];

export const AppThemes: AppThemesType = {
  light: {
    name: 'Light',
    theme: lightTheme,
  },
  // dark: {
  //   name: 'Dark',
  //   theme: darkTheme,
  // },
};

export const AppNetworks: SupportedNetworksType = {
  archway: Archway,
};
