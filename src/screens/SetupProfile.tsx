import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {
  avatarImages,
  AvatarPicker,
  BackButton,
  Background,
  Button,
  Text,
  TextField,
} from '../components';
import {useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {
  AvatarImageType,
  SetupProfileScreenProps,
  ThemePropertiesType,
} from '../types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SetupProfile = ({navigation, route}: SetupProfileScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const accounts = useAppSelector(state => state.userData.accounts);
  const [accountName, setAccountName] = useState('');
  const [avatarImage, setAvatarImage] = useState<AvatarImageType>(
    avatarImages[0],
  );
  const [accountTags, setAccountTags] = useState<string[]>([]);

  const handleContinuePress = () => {
    const isAccountNameUnique = !accounts.some(
      account => account.name === accountName,
    );
    if (isAccountNameUnique) {
      switch (route.params.route) {
        case 'NewSeed':
          navigation.navigate('SetupSeedCreate', {
            ...route.params,
            accountName,
            avatarImage,
            accountTags,
          });
          break;
        case 'ImportSeed':
          navigation.navigate('SetupSeedImport', {
            ...route.params,
            accountName,
            avatarImage,
            accountTags,
          });
          break;
        case 'ImportLedger':
          navigation.navigate('SetupImportLedger', {
            ...route.params,
            accountName,
            avatarImage,
            accountTags,
          });
          break;
      }
    }
  };

  return (
    <Background>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={16}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{alignItems: 'flex-start'}}>
          <BackButton navigation={navigation} />
        </View>

        <Text
          textTransform="uppercase"
          type="headline"
          size="medium"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupProfile.title')}
        </Text>
        <Text
          type="title"
          size="small"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupProfile.subtitle')}
        </Text>

        <AvatarPicker
          avatarImage={avatarImage}
          setAvatarImageSource={setAvatarImage}
        />

        <TextField
          marginBottom={16}
          label={t('SetupProfile.nameInput.label')}
          placeholder={t('SetupProfile.nameInput.placeholder')}
          onChangeText={setAccountName}
          type={'filled'}
        />
        {/* <TagsSelector setAccountTags={setAccountTags} /> */}
      </KeyboardAwareScrollView>
      <Button type="primary" onPress={handleContinuePress}>
        {t('buttons.continue', {ns: 'global'})}
      </Button>
    </Background>
  );
};

const styles = (theme: ThemePropertiesType) => StyleSheet.create({});

export default SetupProfile;
