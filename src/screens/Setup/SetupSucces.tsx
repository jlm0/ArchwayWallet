import React from 'react';
import {useTranslation} from 'react-i18next';

import AccountSuccess from '../../assets/Illustrations/accountSuccess.svg';
import {BackHandler, View} from 'react-native';
import {useTheme} from '../../themes';
import {SetupSuccessScreenProps} from '../../types';
import {Background, Button, Text} from '../../components';

const SetupSuccess = ({navigation}: SetupSuccessScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  React.useEffect(() => {
    const backHandle = BackHandler.addEventListener(
      'hardwareBackPress',
      () => null,
    );
    return backHandle.remove();
  }, []);

  return (
    <Background>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <AccountSuccess style={{marginBottom: 32}} />

        <Text
          textTransform="uppercase"
          type="headline"
          size="medium"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupSuccess.title')}
        </Text>
        <Text
          type="title"
          size="small"
          color={theme.colors.onBackground}
          marginBottom={16}>
          {t('SetupSuccess.subtitle')}
        </Text>
      </View>
      <Button
        type="primary"
        onPress={() => {
          navigation.navigate('AppHome');
        }}>
        {t('SetupSuccess.button')}
      </Button>
    </Background>
  );
};

export default SetupSuccess;
