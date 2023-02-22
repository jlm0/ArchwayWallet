import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckIcon from '../../assets/Icons/Check.svg';
import {useTheme} from '../../themes';
import {ThemePropertiesType} from '../../types';
import Pressable from './Pressable';

type SwitchProps = {
  initialValue: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Switch = ({initialValue, onValueChange}: SwitchProps) => {
  const [value, setValue] = React.useState(initialValue);
  const theme = useTheme();

  const toggleSwitch = () => {
    const newValue = !value;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <>
      {value ? (
        <Pressable
          onPress={toggleSwitch}
          style={[styles(theme).container, styles(theme).toggledContainer]}>
          <View style={[styles(theme).toggle, styles(theme).toggled]}></View>
        </Pressable>
      ) : (
        <Pressable onPress={toggleSwitch} style={styles(theme).container}>
          <View style={styles(theme).toggle}></View>
        </Pressable>
      )}
    </>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    container: {
      width: 48,
      height: 24,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 4,
      backgroundColor: theme.colors.surfaceVariant,
    },
    toggledContainer: {
      borderWidth: 0,
      borderColor: undefined,
      backgroundColor: theme.colors.primary,
      alignItems: 'flex-end',
    },
    toggle: {
      width: 12,
      height: 12,
      borderRadius: 12,
      backgroundColor: theme.colors.outline,
    },
    toggled: {
      width: 16,
      height: 16,
      borderRadius: 16,
      backgroundColor: theme.colors.onPrimary,
    },
  });
