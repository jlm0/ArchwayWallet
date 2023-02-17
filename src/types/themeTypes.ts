import {appThemeNames} from '../constants';

export type AppThemesType = {
  [k in (typeof appThemeNames)[number]]: {
    name: string;
    theme: ThemePropertiesType;
  };
};

type fontWeight = '400' | '500' | '800';

export type ThemePropertiesType = {
  colors: {
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
  elevation: {
    surface: string;
    surface1: string;
    surface2: string;
    surface3: string;
    surface4: string;
    surface5: string;
  };
  typography: {
    display: {
      small: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
    };
    headline: {
      small: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
    };
    title: {
      small: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
    };
    body: {
      small: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
    };
    label: {
      small: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: fontWeight;
        lineHeight: number;
        fontSize: number;
      };
    };
  };
};
