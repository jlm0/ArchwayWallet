import {darkTheme, lightTheme} from '../themes';
import {AppThemesType} from '../types';

export const appThemeNames = ['light', 'dark'] as const;

export const AppThemes: AppThemesType = {
  light: {
    name: 'Light',
    theme: lightTheme,
  },
  dark: {
    name: 'Dark',
    theme: darkTheme,
  },
};
