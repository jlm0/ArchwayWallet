import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../themes';
import {Button} from './Base';

export const Placeholder = ({route}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{color: theme.colors.onBackground, marginBottom: 8}}>
        {route.name}
      </Text>
      <Button
        type="primary"
        onPress={() => console.log('Primary button pressed')}>
        Primary Button
      </Button>

      <Button
        type="secondary"
        onPress={() => console.log('Secondary button pressed')}>
        Secondary Button
      </Button>

      <Button
        type="outline"
        onPress={() => console.log('Outline button pressed')}>
        Outline Button
      </Button>

      <Button type="text" onPress={() => console.log('Text button pressed')}>
        Text Button
      </Button>
    </View>
  );
};
