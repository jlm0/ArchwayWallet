import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppCurrencies, AppLanguages, appThemeNames} from '../constants';
import {AppSettingsStateType, KeySettingsType} from '../types/reduxStoreTypes';

const initialState: AppSettingsStateType = {
  appActiveTheme: 'dark',
  appActiveLanguage: {id: 'en', name: 'English'},
  appActiveCurrency: {id: 'USD', name: 'US Dollar'},
  appLastOpened: 0,
  appLastPasswordPrompt: 0,
  appEncryptionKeySettings: null,
  appPswHash: null,
  isBiometricEnabled: false,
  isFirstTimeUser: true,
  isLoggedIn: false,
  isTestnetEnabled: false,
  isNotificationsEnabled: false,
  isAnalyticsEnabled: false,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setAppActiveTheme: (
      state,
      action: PayloadAction<(typeof appThemeNames)[number]>,
    ) => {
      state.appActiveTheme = action.payload;
    },
    setAppActiveLanguage: (state, action: PayloadAction<string>) => {
      const activeLanguage = AppLanguages.find(
        language => language.id === action.payload,
      );
      if (activeLanguage) {
        state.appActiveLanguage = activeLanguage;
      }
    },
    setAppActiveCurrency: (state, action: PayloadAction<string>) => {
      const activeCurrency = AppCurrencies.find(
        currency => currency.id === action.payload,
      );
      if (activeCurrency) {
        state.appActiveCurrency = activeCurrency;
      }
    },
    setAppLastOpened: (state, action: PayloadAction<number>) => {
      state.appLastOpened = action.payload;
    },
    setAppLastPasswordPrompt: (state, action: PayloadAction<number>) => {
      state.appLastPasswordPrompt = action.payload;
    },
    setAppEncryptionKeySettings: (
      state,
      action: PayloadAction<KeySettingsType>,
    ) => {
      state.appEncryptionKeySettings = action.payload;
    },

    setAppPswHash: (
      state,
      action: PayloadAction<{hash: string; settings: KeySettingsType}>,
    ) => {
      state.appPswHash = action.payload;
    },
    setIsBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.isBiometricEnabled = action.payload;
    },
    setIsFirstTimeUser: (state, action: PayloadAction<boolean>) => {
      state.isFirstTimeUser = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsTestnetEnabled: (state, action: PayloadAction<boolean>) => {
      state.isTestnetEnabled = action.payload;
    },
    setIsNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.isNotificationsEnabled = action.payload;
    },
    setIsAnalyticsEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAnalyticsEnabled = action.payload;
    },
  },
});

export const {
  setAppActiveTheme,
  setAppActiveLanguage,
  setAppActiveCurrency,
  setIsBiometricEnabled,
  setAppLastOpened,
  setAppLastPasswordPrompt,
  setIsFirstTimeUser,
  setIsLoggedIn,
  setAppEncryptionKeySettings,
  setAppPswHash,
  setIsTestnetEnabled,
  setIsNotificationsEnabled,
  setIsAnalyticsEnabled,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
