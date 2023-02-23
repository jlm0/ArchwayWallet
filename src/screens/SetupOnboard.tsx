import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Dimensions, FlatList, Image} from 'react-native';
import {Button, Text} from '../components';
import {Background} from '../components/Background';
import {setAppActiveLanguage, useAppDispatch, useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {SetupOnboardScreenPropsType, ThemePropertiesType} from '../types';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'slide1.title',
    subtitle: 'slide1.subtitle',
    image: require('../assets/Illustrations/Onboard1.png'),
  },
  {
    id: 2,
    title: 'slide2.title',
    subtitle: 'slide2.subtitle',
    image: require('../assets/Illustrations/Onboard2.png'),
  },
  {
    id: 3,
    title: 'slide3.title',
    subtitle: 'slide3.subtitle',
    image: require('../assets/Illustrations/Onboard3.png'),
  },
];

export const SetupOnboard = ({navigation}: SetupOnboardScreenPropsType) => {
  const {t, i18n} = useTranslation('translation', {keyPrefix: 'SetupOnboard'});
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const appActiveLanguage = useAppSelector(
    state => state.appSettings.appActiveLanguage,
  );

  const handleLanguageChange = item => {
    dispatch(setAppActiveLanguage(item.id));
    i18n.changeLanguage(item.id);
  };
  return (
    <Background>
      <View style={{flex: 1}}>
        <FlatList
          style={styles(theme).swiperContainer}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles(theme).slideContainer}>
                <Image
                  style={{
                    top: 16,
                    position: 'absolute',
                    alignSelf: 'center',
                  }}
                  source={item.image}
                />
                <View>
                  <Text
                    textTransform="uppercase"
                    textAlign="left"
                    type="display"
                    size="small"
                    color={theme.colors.onBackground}
                    marginBottom={16}>
                    {t(item.title)}
                  </Text>
                  <Text
                    textAlign="left"
                    type="title"
                    size="medium"
                    color={theme.colors.onBackground}>
                    {t(item.subtitle)}
                  </Text>
                </View>
              </View>
            );
          }}></FlatList>

        <Button
          type="primary"
          onPress={() => navigation.navigate('SetupOptions')}>
          {t('button')}
        </Button>
      </View>
    </Background>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    swiperContainer: {flex: 1, marginBottom: 32},
    slideContainer: {
      width: width - 32,
      justifyContent: 'flex-end',
    },
    image: {
      position: 'absolute',
      width: '100%',
      left: 0,
      top: 0,
    },
  });
