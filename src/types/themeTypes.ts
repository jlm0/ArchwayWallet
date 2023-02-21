import {appThemeNames} from '../constants';

export type AppThemesType = {
  [k in (typeof appThemeNames)[number]]: {
    name: string;
    theme: ThemePropertiesType;
  };
};

export type fontWeight = '400' | '500' | '800';

export type ThemeColors = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
};

export type ThemeElevation = {
  surface: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
};

export type ThemeTypographyTypes = readonly [
  'headline',
  'display',
  'title',
  'label',
  'body',
];
export type ThemeTypographySize = readonly ['small', 'medium', 'large'];
export type ThemeTypographyProperties = {
  fontFamily: string;
  fontWeight: fontWeight;
  lineHeight: number;
  fontSize: number;
};

export type ThemeTypography = {
  [K in ThemeTypographyTypes[number]]: {
    [K in ThemeTypographySize[number]]: ThemeTypographyProperties;
  };
};

export type ThemePropertiesType = {
  colors: ThemeColors;
  elevation: ThemeElevation;
  typography: ThemeTypography;
};
