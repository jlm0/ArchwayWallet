import {StyleSheet, Text} from 'react-native';
import LeftChevron from '../assets/Icons/Chevron-Left.svg';
import {useTranslation} from 'react-i18next';
import {Button} from '.';
import {ThemePropertiesType} from '../types';
import {NavigationProp} from '@react-navigation/native';

export type GoBackButtonPropType = {
  navigation: NavigationProp<any, any>;
};

export const BackButton = ({navigation}: GoBackButtonPropType) => {
  const {t} = useTranslation('global');

  return (
    <Button type="text" onPress={() => navigation.goBack()} Icon={LeftChevron}>
      {t('back')}
    </Button>
  );
};

const styles = (theme: ThemePropertiesType) => StyleSheet.create({});
