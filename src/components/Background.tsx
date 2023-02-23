import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {useTheme} from '../themes';

type BackgroundProps = {
  backgroundColor?: string;
};

export const Background = ({
  children,
  backgroundColor,
}: BackgroundProps & PropsWithChildren) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: backgroundColor
          ? backgroundColor
          : theme.colors.background,
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}>
      {children}
    </View>
  );
};
