import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Background, Button, Pressable, Text, TextField} from '../components';
import {setIsLoggedIn, useAppDispatch, useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {
  base64ToUint8,
  createPBKDF2Key,
  getKeyChainKey,
  uint8ToBase64,
  uInt8ToBuffer,
} from '../utils';
import FingerprintIcon from '../assets/Icons/Fingerprint.svg';
import {ThemePropertiesType} from '../types';

export const AppLogin = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const {isBiometricEnabled, appPswHash, appEncryptionKeySettings} =
    useAppSelector(state => state.appSettings);
  const {accounts} = useAppSelector(state => state.userData);

  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [usePassword, setUsePassword] = React.useState<boolean>(
    !isBiometricEnabled,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(biometricLogin);
  }, []);

  const biometricLogin = async () => {
    if (!isBiometricEnabled || usePassword) {
      return;
    }
    try {
      let key = await getKeyChainKey(
        t('AppLogin.biometric.title'),
        t('AppLogin.biometric.subtitle'),
        t('buttons.cancel', {ns: 'global'}),
      );
      if (!key) {
        return;
      }
      loginChecks(base64ToUint8(key));
    } catch (error) {
      console.log('Error Reriving Biometric Password');
    }
  };

  const passwordLogin = async () => {
    if (!appPswHash) {
      return;
    }
    let salt = uInt8ToBuffer(base64ToUint8(appPswHash.settings.salt));
    let hash = uint8ToBase64((await createPBKDF2Key(password, salt)).key);
    if (hash !== appPswHash.hash) {
      return;
    }
    let key = await createPBKDF2Key(
      password,
      uInt8ToBuffer(base64ToUint8(appEncryptionKeySettings!.salt)),
      appEncryptionKeySettings!.rounds,
      appEncryptionKeySettings!.length,
      appEncryptionKeySettings!.algorithm,
    );
    if (!key) {
      setUsePassword(false);
      setPassword('');
      return;
    }
    loginChecks(key.key);
  };

  const loginChecks = async (key: Uint8Array) => {
    // setIsLoading(true);
    // for (const account of accounts) {
    //   const missingNetworks:typeof networkNames[number][] = [];
    //   const accountCopy = {...account}

    //   for (const network of networkNames) {
    //     if (!account.wallet.addresses.mainnet.some(address => address.network === network)) {
    //       missingNetworks.push(network);
    //     }
    //   }

    //   if(missingNetworks.length){
    //     const mnemonic = await decrypt(key,account.wallet.mnemonic,base64ToUint8(account.wallet.encryptionSettings.iv),account.wallet.encryptionSettings.algorithm);
    //     for(const network of missingNetworks){
    //       const mainnetKey = await generateWalletKeys(uint8ToUtf8(mnemonic) , account.wallet.path, appNetworks[network].mainnet.slip44);
    //       const mainnetAddress = getAddress(appNetworks[network].mainnet.bech32_prefix,mainnetKey.publicKeyHash)
    //       const encryptedMainnetPrivKey = await encrypt(key, mainnetKey.privateKey, base64ToUint8(account.wallet.encryptionSettings.iv));
    //       accountCopy.wallet.keys.mainnet.push({
    //         network: network,
    //         chain_id: appNetworks[network].mainnet.chain_id,
    //         path: account.wallet.path,
    //         slip44: appNetworks[network].mainnet.slip44,
    //         privateKey: uint8ToBase64(encryptedMainnetPrivKey.cipher),
    //         publicKey: uint8ToBase64(mainnetKey.publicKey),
    //         publicKeyHash: uint8ToBase64(mainnetKey.publicKeyHash),
    //       })
    //     }
    //   }
    // }
    dispatch(setIsLoggedIn(true));
  };

  return (
    <Background>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={theme.colors.primary} size={96} />
          <Text type="label" size="large" color={theme.colors.onBackground}>
            {t('loading', {ns: 'global'})}
          </Text>
        </View>
      ) : (
        <>
          <View style={{marginTop: 24}}>
            <View style={{marginBottom: 24}}>
              <Text
                textTransform="uppercase"
                type="headline"
                size="medium"
                color={theme.colors.onBackground}
                marginBottom={16}>
                {t('AppLogin.title')}
              </Text>
              <Text
                type="title"
                size="small"
                color={theme.colors.onBackground}
                marginBottom={16}>
                {t('AppLogin.subtitle')}
              </Text>
            </View>
            {usePassword && (
              <TextField
                isSensitive
                type="filled"
                label={t('password.password', {ns: 'global'})}
                placeholder={t('password.enter', {ns: 'global'})}
                onChangeText={setPassword}
                marginBottom={16}
                error={passwordError != ''}
                errorMessage={passwordError}
              />
            )}

            {!usePassword && (
              <Pressable
                onPress={biometricLogin}
                style={{alignItems: 'center', marginTop: 32}}>
                <FingerprintIcon
                  height={80}
                  width={80}
                  color={theme.colors.onBackground}
                />
                <Text
                  type="label"
                  size="medium"
                  color={theme.colors.onBackground}>
                  {t('AppLogin.biometric.tap')}
                </Text>
              </Pressable>
            )}

            {usePassword ? (
              isBiometricEnabled && (
                <Button type="text" onPress={() => setUsePassword(false)}>
                  {t('AppLogin.switch.biometric')}
                </Button>
              )
            ) : (
              <Button type="text" onPress={() => setUsePassword(true)}>
                {t('AppLogin.switch.password')}
              </Button>
            )}
          </View>
          {usePassword && (
            <Button
              type="primary"
              disabled={password === ''}
              onPress={passwordLogin}>
              {t('AppLogin.button')}
            </Button>
          )}
        </>
      )}
    </Background>
  );
};

const styles = (theme: ThemePropertiesType) => StyleSheet.create({});
