import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import RevealIcon from '../../assets/Icons/Reveal.svg';
import HideIcon from '../../assets/Icons/Hide.svg';
import {ThemePropertiesType} from '../../types';
import {useTheme} from '../../themes';
import {Text} from './Text';
import {SvgProps} from 'react-native-svg';
import {Pressable} from './Pressable';

type Props = {
  type: 'filled' | 'outline';
  isPassword?: boolean;
  label: string;
  placeholder: string;
  LeftIcon?: React.FC<SvgProps>;
  marginBottom?: string | number;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
};

export const TextField: React.FC<Props> = ({
  type,
  isPassword = false,
  label,
  placeholder,
  LeftIcon,
  marginBottom,
  onChangeText,
  error = false,
  success = false,
  errorMessage,
}) => {
  const theme = useTheme();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(isPassword);

  const toggleSecureEntry = () => {
    setSecureTextEntry(prev => !prev);
  };

  return (
    <View style={[styles(theme).container, {marginBottom}]}>
      <Text
        type="label"
        size="small"
        color={theme.colors.onSurfaceVariant}
        marginBottom={8}
        textAlign="left">
        {label}
      </Text>
      <View
        style={[
          styles(theme).inputContainer,
          type === 'filled'
            ? styles(theme).filledContainer
            : styles(theme).outlineContainer,
          error &&
            !success && {borderWidth: 1, borderColor: theme.colors.error},
          success &&
            !error && {borderWidth: 1, borderColor: theme.colors.success},
        ]}>
        {LeftIcon && (
          <LeftIcon
            color={theme.colors.onSurfaceVariant}
            style={styles(theme).leftIcon}
          />
        )}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[styles(theme).input]}
          secureTextEntry={secureTextEntry}
        />
        {isPassword && (
          <Pressable
            style={styles(theme).passwordIcon}
            onPress={toggleSecureEntry}>
            {secureTextEntry ? (
              <RevealIcon color={theme.colors.onSurfaceVariant} />
            ) : (
              <HideIcon color={theme.colors.onSurfaceVariant} />
            )}
          </Pressable>
        )}
      </View>
      {!success && error && errorMessage && (
        <Text
          marginTop={8}
          type="label"
          size="small"
          color={theme.colors.error}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      width: '100%',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
    filledContainer: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    outlineContainer: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    input: {
      flexGrow: 1,
      fontSize: theme.typography.body.large.fontSize,
      marginRight: 8,
    },
    leftIcon: {
      marginRight: 8,
    },
    passwordIcon: {
      padding: 4,
    },
  });
