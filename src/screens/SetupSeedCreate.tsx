import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {
  BackButton,
  Background,
  BottomSheetHDPath,
  Button,
  Clipboard,
  SeedCreate,
  Text,
} from '../components';

import {useTheme} from '../themes';
import {HDPathType, SetupSeedCreateScreenProps} from '../types';

export const SetupdSeedCreate = ({
  navigation,
  route,
}: SetupSeedCreateScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const [seedWords, setSeedWords] = React.useState('');
  const [hdPath, setHdPath] = React.useState<HDPathType>({
    account: 0,
    change: 0,
    index: 0,
  });

  const handleContinuePress = () => {
    navigation.navigate('SetupSeedConfirm', {
      ...route.params,
      seed: seedWords.split(' '),
      hdPath,
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
          {t('SetupSeedCreate.title')}
        </Text>
        <Text
          type="title"
          size="small"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupSeedCreate.subtitle')}
        </Text>
        <Clipboard copyToClipboard textToCopy={seedWords}>
          <SeedCreate onSeedPhraseChange={setSeedWords} />
        </Clipboard>
      </View>
      <BottomSheetHDPath handleConfirm={setHdPath}></BottomSheetHDPath>
      <Button type="primary" onPress={handleContinuePress}>
        {t('buttons.continue', {ns: 'global'})}
      </Button>
    </Background>
  );
};
