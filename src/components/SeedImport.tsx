import React, {SetStateAction} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../themes';
import {TextField} from './Base';
import {ThemePropertiesType} from '../types';

type SeedImportPropsType = {
  onTextChange: React.Dispatch<SetStateAction<string>>;
};

export const SeedImport = (props: SeedImportPropsType) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const handleTextChange = (text: string) => {
    props.onTextChange(text);
  };
  return (
    <View style={styles(theme).container}>
      <TextField
        type="filled"
        label=""
        placeholder={t('SetupSeedImport.placeholder')}
        onChangeText={handleTextChange}
        multiline></TextField>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    container: {
      height: 240,
      borderRadius: 10,
      padding: 8,
      marginTop: 24,
      backgroundColor: theme.colors.surfaceVariant,
    },
  });
