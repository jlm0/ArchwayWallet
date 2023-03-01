import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {validateMnemonic} from '@scure/bip39';
import {wordlist} from '@scure/bip39/wordlists/english';
import {HDPathType, SetupSeedImportScreenProps} from '../../types';
import {useTheme} from '../../themes';
import {
  BackButton,
  Background,
  BottomSheetHDPath,
  Button,
  SeedImport,
  Text,
} from '../../components';

const SetupSeedImport = ({navigation, route}: SetupSeedImportScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [hdPath, setHdPath] = React.useState<HDPathType>({
    account: 0,
    change: 0,
    index: 0,
  });
  const [tempSeed, setTempSeed] = React.useState<string>('');
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const handleImport = () => {
    if (!validateMnemonic(tempSeed, wordlist)) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
      return;
    }
    navigation.navigate('SetupSecurity', {
      ...route.params,
      hdPath,
      seed: tempSeed.split(' '),
    });
  };

  return (
    <Background>
      <View style={{flexGrow: 1}}>
        <BackButton navigation={navigation} />
        <Text
          textTransform="uppercase"
          type="headline"
          size="medium"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupSeedConfirm.title')}
        </Text>
        <Text
          type="title"
          size="small"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupSeedConfirm.subtitle')}
        </Text>
        <SeedImport onTextChange={setTempSeed} />
      </View>
      <BottomSheetHDPath handleConfirm={setHdPath}></BottomSheetHDPath>
      <Button type="primary" onPress={handleImport}>
        {t('buttons.continue', {ns: 'global'})}
      </Button>
    </Background>
  );
};

export default SetupSeedImport;
