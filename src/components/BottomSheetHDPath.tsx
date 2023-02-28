import React, {useState, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import {HDPathType, ThemePropertiesType} from '../types';
import {useTheme} from '../themes';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheet, Button, Text} from './Base';

type BottomSheetHDPathProp = {
  handleConfirm: React.Dispatch<React.SetStateAction<HDPathType>>;
};

export const BottomSheetHDPath = ({handleConfirm}: BottomSheetHDPathProp) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [account, setAccount] = useState<string>('');
  const [change, setChange] = useState<string>('');
  const [index, setIndex] = useState<string>('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleButtonConfirm = () => {
    if (!account || !change || !index) {
      handleConfirm({
        account: 0,
        change: 0,
        index: 0,
      });
      bottomSheetModalRef.current?.dismiss();
      return;
    }
    handleConfirm({
      account: parseInt(account),
      change: parseInt(change),
      index: parseInt(index),
    });
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <View>
      <Button
        marginBottom={8}
        type="text"
        onPress={() => bottomSheetModalRef.current?.present()}>
        {t('buttons.advanced', {ns: 'global'})}
      </Button>
      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        heading={t('HDPath.title')}
        subheading={t('HDPath.subtitle')}
        primaryButtonlabel={t('buttons.confirm', {ns: 'global'})}
        primaryButtonOnPress={handleButtonConfirm}
        secondaryButtonLabel={t('buttons.close', {ns: 'global'})}
        secondaryButtonOnPress={() => bottomSheetModalRef.current?.dismiss()}>
        <View style={styles(theme).pathContainer}>
          <Text type="label" size="large" color={theme.colors.onSurface}>
            {"m/44'/.../"}
          </Text>
          <TextInput
            maxLength={3}
            contextMenuHidden={true}
            keyboardType="number-pad"
            value={account}
            onChangeText={setAccount}
            placeholder="0"
            style={styles(theme).pathInput}
          />
          <Text type="label" size="large" color={theme.colors.onSurface}>
            {"'/"}
          </Text>
          <TextInput
            maxLength={3}
            contextMenuHidden={true}
            keyboardType="number-pad"
            value={change}
            onChangeText={setChange}
            placeholder="0"
            style={styles(theme).pathInput}
          />
          <Text type="label" size="large" color={theme.colors.onSurface}>
            {'/'}
          </Text>
          <TextInput
            maxLength={3}
            contextMenuHidden={true}
            keyboardType="number-pad"
            value={index}
            onChangeText={setIndex}
            placeholder="0"
            style={styles(theme).pathInput}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    buttonContainer: {marginBottom: 32, paddingVertical: 16},
    pathContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
    },
    pathInput: {
      flex: 1,
      borderRadius: 10,
      fontFamily: theme.typography.body.large.fontFamily,
      fontSize: theme.typography.body.large.fontSize,
      lineHeight: theme.typography.body.large.lineHeight,
      color: theme.colors.onSurfaceVariant,
      marginHorizontal: 4,
      textAlign: 'center',
      backgroundColor: theme.colors.surfaceVariant,
    },
  });
