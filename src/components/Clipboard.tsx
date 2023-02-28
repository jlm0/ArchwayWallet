import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../themes';
import CopyPaste from '@react-native-clipboard/clipboard';
import {Pressable} from './Base/Pressable';
import ClipboardIcon from '../../assets/Icons/Clipboard.svg';
import {StyleSheet} from 'react-native';
import {ThemePropertiesType} from '../types';
import {Text} from './Base/Text';

type ClipboardProp = {
  copyToClipboard?: boolean;
  textToCopy: string;
  copyFromClipboard?: boolean;
  setCopiedText?: React.Dispatch<React.SetStateAction<string>>;
};

export const Clipboard = ({
  children,
  copyFromClipboard,
  copyToClipboard,
  textToCopy,
  setCopiedText,
}: ClipboardProp & PropsWithChildren) => {
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const theme = useTheme();
  const {t} = useTranslation();

  const handleCopyToClipboard = () => {
    CopyPaste.setString(textToCopy ? textToCopy : '');
    setSuccessMessage(t('Clipboard.success.copyTo'));
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleCopyFromClipboard = async () => {
    const text = await CopyPaste.getString();
    setSuccessMessage(t('Clipboard.success.copyFrom'));
    setCopiedText?.(text);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (
    <View>
      <Pressable
        onPress={() =>
          copyToClipboard && !copyFromClipboard
            ? handleCopyToClipboard()
            : copyFromClipboard && !copyToClipboard
            ? handleCopyFromClipboard()
            : null
        }>
        {children}
      </Pressable>
      {successMessage != '' && (
        <Text
          marginTop={8}
          type="label"
          size="small"
          color={theme.colors.error}>
          {successMessage}
        </Text>
      )}
    </View>
  );
};

const styles = (theme: ThemePropertiesType) => StyleSheet.create({});
