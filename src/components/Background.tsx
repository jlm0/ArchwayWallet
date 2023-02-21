import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {useTheme} from '../themes';

export const Background = ({children}: PropsWithChildren) => {
  const theme = useTheme();
  return (
    <View style={{backgroundColor: theme.colors.background, flex: 1}}>
      {children}
    </View>
  );
};
