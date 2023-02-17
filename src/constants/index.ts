import {darkTheme, lightTheme} from '../themes';
import {AppThemesType} from '../types';
import {SupportedLanguageType} from '../types/constantsTypes';

export const appThemeNames = ['light'] as const;

export const AppLanguages: SupportedLanguageType[] = [
  {id: 'en', name: 'English'},
  {id: 'es', name: 'Spanish'},
  // {id: 'fr', name: 'French'},
  // {id: 'pt', name: 'Portuguese'},
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
