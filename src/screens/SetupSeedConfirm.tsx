import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {BackButton, Background, Button, SeedConfirm, Text} from '../components';
import {useTheme} from '../themes';
import {SetupSeedConfirmScreenProps} from '../types';

export const SetupSeedConfirm = ({
  navigation,
  route,
}: SetupSeedConfirmScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [confirmed, setConfirmed] = React.useState(false);

  const handleContinue = () => {
    if (!confirmed) {
      return;
    }
    navigation.navigate('SetupSecurity', {...route.params});
  };

  return (
    <Background>
      <View>
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
        <SeedConfirm seed={route.params.seed} onConfirm={setConfirmed} />
      </View>
      <Button disabled={!confirmed} type="primary" onPress={handleContinue}>
        {t('buttons.continue', {ns: 'global'})}
      </Button>
    </Background>
  );
};
