import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '../../themes';
import {ThemePropertiesType} from '../../types';
import {Pressable} from './Pressable';
import {Text} from './Text';

export type ButtonPropsType = {
  children: string;
  type: 'primary' | 'secondary' | 'outline' | 'text';
  Icon?: React.FC<SvgProps>;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  children = 'Text',
  type = 'primary',
  Icon,
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
    buttonStyle = {...buttonStyle, ...styles(theme).buttonPressed};
  }
  if (fullWidth) {
    buttonStyle = {...buttonStyle, ...styles(theme).fullWidthButton};
  }
  if (disabled) {
    switch (type) {
      case 'primary':
        buttonStyle = {...buttonStyle, ...styles(theme).primaryButtonDisabled};
        textStyle = {...textStyle, ...styles(theme).primaryTextDisabled};
        break;
      case 'secondary':
        buttonStyle = {
          ...buttonStyle,
          ...styles(theme).secondaryButtonDisabled,
        };
        textStyle = {...textStyle, ...styles(theme).secondaryTextDisabled};
        break;
      case 'outline':
        buttonStyle = {...buttonStyle, ...styles(theme).outlineButtonDisabled};
        textStyle = {...textStyle, ...styles(theme).outlineTextDisabled};
        break;
      case 'text':
        buttonStyle = {...buttonStyle, ...styles(theme).textButtonDisabled};
        textStyle = {...textStyle, ...styles(theme).textTextDisabled};
        break;
      default:
        buttonStyle = {...buttonStyle, ...styles(theme).primaryButtonDisabled};
        textStyle = {...textStyle, ...styles(theme).primaryTextDisabled};
    }
  }
  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles(theme).button, buttonStyle]}
      onPress={onPress}>
      {Icon && (
        <Icon
          width={14}
          height={14}
          color={textStyle.color}
          style={{marginRight: 8}}
        />
      )}
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
      flexDirection: 'row',
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
    primaryButtonDisabled: {
      backgroundColor: theme.colors.onSurface,
      opacity: 0.2,
    },
    primaryTextDisabled: {
      color: theme.colors.onSurface,
    },
    secondaryButton: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    secondaryText: {
      color: theme.colors.onSecondaryContainer,
    },
    secondaryButtonDisabled: {
      backgroundColor: theme.colors.onSurface,
      opacity: 0.14,
    },
    secondaryTextDisabled: {
      color: theme.colors.onSurface,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    outlineText: {
      color: theme.colors.primary,
    },
    outlineButtonDisabled: {
      borderColor: theme.colors.onSurface,
      opacity: 0.14,
    },
    outlineTextDisabled: {
      color: theme.colors.onSurface,
    },
    textButton: {
      backgroundColor: 'transparent',
    },
    textText: {
      color: theme.colors.primary,
    },
    textButtonDisabled: {
      opacity: 0.14,
    },
    textTextDisabled: {
      color: theme.colors.onSurface,
    },
  });
