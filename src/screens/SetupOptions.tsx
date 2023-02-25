import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SetupOptionsScreenProps, ThemePropertiesType} from '../types';
import {BackButton, Background, Pressable, Text} from '../components/';
import {useTheme} from '../themes';

export const SetupOptions = ({navigation}: SetupOptionsScreenProps) => {
  const {t} = useTranslation('translation', {keyPrefix: 'SetupOptions'});
  const theme = useTheme();

  const routes = navigation.getState()?.routes;

  return (
    <Background>
      <View>
        {!(routes.length > 1) && <BackButton navigation={navigation} />}
        {/* <Logo style={{alignSelf: 'center', marginBottom: 24}} color={theme.appLogo} /> */}
        <View style={{marginBottom: 32}}>
          <Text
            textTransform="uppercase"
            type="headline"
            size="medium"
            color={theme.colors.onBackground}
            marginBottom={16}>
            {t('title')}
          </Text>
          <Text type="title" size="small" color={theme.colors.onBackground}>
            {t('subtitle')}
          </Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={styles(theme).twoColumnContainer}>
          <Pressable
            style={styles(theme).importSeedButton}
            onPress={() =>
              navigation.navigate('SetupProfile', {route: 'ImportSeed'})
            }>
            <View style={styles(theme).importSeedButtonInner}>
              {/* <Image
                source={require('../assets/Illustrations/importMnemonic.png')}
                style={{position: 'absolute', top: 8, right: 8}}
              /> */}
              <Text
                textAlign="left"
                type="label"
                size="large"
                color={theme.colors.onSurfaceVariant}>
                {t('importSeed')}
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={styles(theme).importLedgerButton}
            // onPress={() => navigation.navigate('SetupProfile', {route: 'ImportLedger'})}
          >
            <View style={styles(theme).importLedgerButtonInner}>
              {/* <Image
                source={require('../assets/Illustrations/importLedger.png')}
                style={{position: 'absolute', top: 8, right: 8}}
              /> */}
              <Text
                textAlign="left"
                type="label"
                size="large"
                color={theme.colors.onSurfaceVariant}>
                {t('importSeed')}
              </Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          style={styles(theme).newSeedButton}
          onPress={() =>
            navigation.navigate('SetupProfile', {route: 'NewSeed'})
          }>
          {/* <Image
            source={require('../assets/Illustrations/newAccount.png')}
            style={{position: 'absolute', top: 16, right: 16}}
          /> */}

          <View style={styles(theme).newSeedButtonInner}>
            <Text
              textAlign="left"
              type="label"
              size="large"
              color={theme.colors.onSurfaceVariant}>
              {t('newAccount')}
            </Text>
          </View>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
    },
    image: {
      alignSelf: 'center',
      marginBottom: 24,
    },
    twoColumnContainer: {flexDirection: 'row', flex: 1.5, marginBottom: 16},
    importSeedButton: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceVariant,
      marginRight: 16,
      padding: 8,
    },
    importSeedButtonInner: {
      borderWidth: 2,
      borderColor: theme.colors.outline,
      flex: 1,
      borderRadius: 10,
      padding: 8,
      justifyContent: 'flex-end',
    },
    importLedgerButton: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceVariant,
      padding: 8,
    },
    importLedgerButtonInner: {
      borderWidth: 2,
      borderColor: theme.colors.outline,
      flex: 1,
      borderRadius: 10,
      padding: 8,
      justifyContent: 'flex-end',
    },
    newSeedButton: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceVariant,
      padding: 8,
    },
    newSeedButtonInner: {
      borderWidth: 2,
      flex: 1,
      borderColor: theme.colors.outline,
      borderRadius: 10,
      padding: 8,
      justifyContent: 'flex-end',
    },
  });
