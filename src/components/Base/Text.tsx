import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {useTheme} from '../../themes';
import {ThemeTypographySize, ThemeTypographyTypes} from '../../types';

type TextProps = {
  children: string;
  color: string;
  type: ThemeTypographyTypes[number];
  size: ThemeTypographySize[number];
};

export const Text = ({children, color, type, size}: TextProps) => {
  const theme = useTheme();
  return (
    <RNText style={{...theme.typography[type][size], color}}>{children}</RNText>
  );
};
