import React from 'react';
import {StyleSheet} from 'react-native';
import CheckIcon from '../../assets/Icons/Check.svg';
import {useTheme} from '../../themes';
import {ThemePropertiesType} from '../../types';
import Pressable from './Pressable';
type CheckboxProps = {
  initialValue: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Checkbox = ({
  initialValue = false,
  onValueChange,
}: CheckboxProps) => {
  const [value, setValue] = React.useState(initialValue);
  const theme = useTheme();

  const toggleCheckbox = () => {
    const newValue = !value;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Pressable
      style={[
        styles(theme).container,
        value ? styles(theme).checkedContainer : undefined,
      ]}
      onPress={toggleCheckbox}>
      {value && (
        <CheckIcon width={14} height={14} color={theme.colors.onPrimary} />
      )}
    </Pressable>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    container: {
      height: 20,
      width: 20,
      borderWidth: 1,
      borderColor: theme.colors.onSurfaceVariant,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    checkedContainer: {
      backgroundColor: theme.colors.primary,
      borderColor: undefined,
      borderWidth: 0,
    },
  });
