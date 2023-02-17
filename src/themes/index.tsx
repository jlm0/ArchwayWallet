export {lightTheme} from './lightTheme';
import React, {
  createContext,
  useContext,
  useMemo,
  PropsWithChildren,
} from 'react';
import {ThemePropertiesType} from '../types';
import {AppThemes} from '../constants';
import {DefaultTheme} from '@react-navigation/native';
import {useAppSelector} from '../redux';

const lightTheme = AppThemes['light'].theme;

const ThemeContext = createContext<ThemePropertiesType>(lightTheme);

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const activeTheme = useAppSelector(state => state.appSettings.appActiveTheme);
  const theme = useMemo(() => AppThemes[activeTheme].theme, [activeTheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('No theme found');
  }
  return theme;
};

export const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export {darkTheme} from './darkTheme';
