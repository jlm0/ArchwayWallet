import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {
  AccountTagsSelector,
  avatarImages,
  AvatarPicker,
  BackButton,
  Background,
  Button,
  SeedCreate,
  Tag,
  Text,
  TextField,
} from '../components';
import {useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {
  AvatarImageType,
  HDPathType,
  SetupProfileScreenProps,
  SetupSeedCreateScreenProps,
  ThemePropertiesType,
} from '../types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const SetupdSeedCreate = ({
  navigation,
  route,
}: SetupSeedCreateScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const [seedWords, setSeedWords] = useState('');
  const [hdPath, setHdPath] = useState<HDPathType>({
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
        <SeedCreate onSeedPhraseChange={setSeedWords} />
        {/* <Clipboard copyToClipboard={seedWords} /> */}
      </View>
      {/* <HDPath handleConfirm={setHdPath}></HDPath> */}
      <Button type="primary" onPress={handleContinuePress}>
        {t('buttons.continue', {ns: 'global'})}
      </Button>
    </Background>
  );
};
