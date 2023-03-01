import React from 'react';
import {Text as RNText} from 'react-native';
import {useTheme} from '../../themes';
import {ThemeTypographySize, ThemeTypographyTypes} from '../../types';

type TextProps = {
  children: string;
  color: string;
  type: ThemeTypographyTypes[number];
  size: ThemeTypographySize[number];
  textAlign?: 'center' | 'left' | 'right';
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  backgroundColor?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
};

export const Text = ({
  children,
  color = '#000000',
  type = 'body',
  size = 'large',
  textAlign = 'center',
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  backgroundColor,
  textTransform,
}: TextProps) => {
  const theme = useTheme();
  return (
    <RNText
      style={{
        ...theme.typography[type][size],
        color,
        textAlign,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        backgroundColor,
        textTransform,
      }}>
      {children}
    </RNText>
  );
};
