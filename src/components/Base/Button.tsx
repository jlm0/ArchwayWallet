import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../themes';
import {ThemePropertiesType} from '../../types';
import Pressable from './Pressable';
import {Text} from './Text';

export type ButtonPropsType = {
  children: string;
  type: 'primary' | 'secondary' | 'outline' | 'text';
  icon?: (color: string) => React.ReactElement;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  children = 'Text',
  type = 'primary',
  icon,
  onPress,
  disabled = false,
  fullWidth = false,
}: ButtonPropsType) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  let buttonStyle, textStyle;

  switch (type) {
    case 'primary':
      buttonStyle = styles(theme).primaryButton;
      textStyle = styles(theme).primaryText;
      break;
    case 'secondary':
      buttonStyle = styles(theme).secondaryButton;
      textStyle = styles(theme).secondaryText;
      break;
    case 'outline':
      buttonStyle = styles(theme).outlineButton;
      textStyle = styles(theme).outlineText;
      break;
    case 'text':
      buttonStyle = styles(theme).textButton;
      textStyle = styles(theme).textText;
      break;
    default:
      buttonStyle = styles(theme).primaryButton;
      textStyle = styles(theme).primaryText;
  }
  if (isPressed) {
    buttonStyle = [buttonStyle, styles(theme).buttonPressed];
  }
  if (fullWidth) {
    buttonStyle = [buttonStyle, styles(theme).fullWidthButton];
  }
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles(theme).button, buttonStyle]}
      onPress={onPress}>
      <Text type="label" size="large" color={textStyle.color}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    button: {
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 64,
      marginBottom: 8,
    },
    buttonPressed: {
      opacity: 0.6,
    },
    fullWidthButton: {
      width: '100%',
    },
    text: {
      fontFamily: theme.typography.label.large.fontFamily,
      fontWeight: theme.typography.label.large.fontWeight,
      fontSize: theme.typography.label.large.fontSize,
      lineHeight: theme.typography.label.large.lineHeight,
    },

    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    primaryText: {
      color: theme.colors.onPrimary,
    },
    secondaryButton: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    secondaryText: {
      color: theme.colors.onSecondaryContainer,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    outlineText: {
      color: theme.colors.primary,
    },
    textButton: {
      backgroundColor: 'transparent',
    },
    textText: {
      color: theme.colors.primary,
    },
  });
