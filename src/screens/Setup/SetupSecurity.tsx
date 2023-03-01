import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';
import {
  BackButton,
  Background,
  BottomSheet,
  Button,
  Checkbox,
  Switch,
  Text,
  TextField,
} from '../../components';
import {CommonPasswordList, TermsAndConditions} from '../../constants';
import {
  addAccount,
  setActiveAccount,
  setAppEncryptionKeySettings,
  setAppPswHash,
  setIsBiometricEnabled,
  setIsLoggedIn,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import {useTheme} from '../../themes';
import {SetupSecurityScreenProps} from '../../types';
import {
  base64ToUint8,
  createNewAccount,
  createPBKDF2Key,
  generateRandomBytes,
  getKeyChainKey,
  setKeyChain,
  supportsFingerprintBiometry,
  uint8ToBase64,
  uInt8ToBuffer,
  validateConfirmPassword,
  validatePassword,
} from '../../utils';

export const SetupSecurity = ({
  navigation,
  route,
}: SetupSecurityScreenProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    appSettings: {
      isFirstTimeUser,
      appEncryptionKeySettings,
      isBiometricEnabled,
      appPswHash,
    },
  } = useAppSelector(state => state);

  const {
    accountName,
    avatarImage,
    seed,
    hdPath,
    route: routeSource,
    accountTags,
  } = route.params;

  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [confirmpasswordError, setConfirmPassordError] =
    React.useState<string>('');

  const [enableBiometric, setEnableBiometric] =
    React.useState<boolean>(isBiometricEnabled);
  const [accepTerms, setAcceptTerms] = React.useState<boolean>(false);
  const [working, setWorking] = React.useState<boolean>(false);

  const [usePassword, setUsePassword] = React.useState<boolean>(
    !isBiometricEnabled,
  );

  const termsAndConditionsRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    setTimeout(biometricKeyRetrieval);
  }, []);

  const biometricKeyRetrieval = async () => {
    if (!isBiometricEnabled || usePassword) {
      return;
    }
    try {
      let key = await getKeyChainKey(
        t('Login.biometric.title'),
        t('Login.biometric.subtitle'),
        t('cancel', {ns: 'global'}),
      );
      if (!key) {
        console.log('No key retrieved with biometric on existing user.');
        setUsePassword(true);
        return;
      }
      handleExistingUser(key);
    } catch (error) {
      console.log('Error Reriving Biometric Password');
    }
  };

  const passwordKeyRetrieval = async () => {
    if (!(await passwordCheck())) {
      console.log('Password does not match existing user password.');
      return;
    }
    if (!appEncryptionKeySettings) {
      console.log('No encryption key settings for existing user.');
      return;
    }
    let salt = uInt8ToBuffer(base64ToUint8(appEncryptionKeySettings.salt));
    const encryptionKdf = await createPBKDF2Key(password, salt);

    handleExistingUser(encryptionKdf.key);
  };

  const passwordCheck = async () => {
    if (!appPswHash) {
      return false;
    }
    let salt = uInt8ToBuffer(base64ToUint8(appPswHash.settings.salt));
    let hash = uint8ToBase64((await createPBKDF2Key(password, salt)).key);
    if (hash !== appPswHash.hash) {
      return false;
    }
    return true;
  };

  const handleExistingUser = async (key: string | Uint8Array) => {
    setWorking(true);
    const mnemonic = seed.join(' ');
    const iv = await generateRandomBytes(16, 'buffer');
    let newAccount = await createNewAccount(
      accountName,
      avatarImage,
      accountTags,
      routeSource,
      mnemonic,
      hdPath,
      typeof key === 'string' ? base64ToUint8(key) : key,
      iv,
    );
    dispatch(addAccount(newAccount));
    dispatch(setActiveAccount(newAccount));
    navigation.navigate('SetupSuccess');
  };

  const handleNewUser = async () => {
    try {
      setWorking(true);
      const mnemonic = seed.join(' ');
      const encryptionSalt = await generateRandomBytes(32, 'buffer');
      const encryptionKdf = await createPBKDF2Key(password, encryptionSalt);

      const loginSalt = await generateRandomBytes(32, 'buffer');
      const loginKdf = await createPBKDF2Key(password, loginSalt);
      const iv = await generateRandomBytes(16, 'buffer');
      let newAccount = await createNewAccount(
        accountName,
        avatarImage,
        accountTags,
        routeSource,
        mnemonic,
        hdPath,
        encryptionKdf.key,
        iv,
      );
      dispatch(setAppEncryptionKeySettings(encryptionKdf.settings));
      dispatch(
        setAppPswHash({
          hash: uint8ToBase64(loginKdf.key),
          settings: loginKdf.settings,
        }),
      );

      if (enableBiometric && (await supportsFingerprintBiometry())) {
        try {
          let keychainSet = await setKeyChain(uint8ToBase64(encryptionKdf.key));
          if (!keychainSet) {
            setEnableBiometric(false);
          } else {
            dispatch(setIsBiometricEnabled(true));
          }
        } catch (error) {
          console.log('Problem setting key in keychain.');
        }
      }
      dispatch(addAccount(newAccount));
      dispatch(setActiveAccount(newAccount));
      dispatch(setIsLoggedIn(true));

      setTimeout(() => navigation.navigate('SetupSuccess'), 1000);
    } catch (error) {
      console.log(error);
      setWorking(false);
    }
  };

  return (
    <Background>
      {working ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={theme.colors.primary}
            size={96}
            style={{marginBottom: 16}}
          />
          <Text type="label" size="large" color={theme.colors.onBackground}>
            {t('loading', {ns: 'global'})}
          </Text>
        </View>
      ) : (
        <>
          {isFirstTimeUser ? (
            <>
              <View>
                <BackButton navigation={navigation} />
                <Text
                  textTransform="uppercase"
                  type="headline"
                  size="medium"
                  color={theme.colors.onBackground}
                  marginBottom={16}>
                  {t('SetupSecurity.title')}
                </Text>
                <Text
                  type="title"
                  size="small"
                  color={theme.colors.onBackground}
                  marginBottom={16}>
                  {t('SetupSecurity.subtitle')}
                </Text>
                <TextField
                  isSensitive
                  type="filled"
                  label={t('password.password', {ns: 'global'})}
                  placeholder={t('password.enter', {ns: 'global'})}
                  onChangeText={setPassword}
                  onBlur={() => validatePassword(password, setPasswordError, t)}
                  marginBottom={16}
                  error={passwordError != ''}
                  errorMessage={passwordError}
                />
                <TextField
                  isSensitive
                  type="filled"
                  label={t('password.confirm', {ns: 'global'})}
                  placeholder={t('password.enter', {ns: 'global'})}
                  onChangeText={setConfirmPassword}
                  onBlur={() =>
                    validateConfirmPassword(
                      password,
                      confirmPassword,
                      setConfirmPassordError,
                      t,
                    )
                  }
                  marginBottom={32}
                  error={confirmpasswordError != ''}
                  errorMessage={confirmpasswordError}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    type="label"
                    size="small"
                    color={theme.colors.onSurface}>
                    {t('biometric.enable', {ns: 'global'})}
                  </Text>
                  <Switch
                    initialValue={enableBiometric}
                    onValueChange={setEnableBiometric}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 32,
                  }}>
                  <Checkbox
                    initialValue={false}
                    onValueChange={setAcceptTerms}
                  />
                  <Text
                    type="label"
                    size="medium"
                    color={theme.colors.onSurface}>
                    {t('SetupSecurity.terms.prefix')}
                  </Text>
                  <Button
                    paddingLeft={2}
                    type="text"
                    onPress={() => termsAndConditionsRef.current?.present()}>
                    {t('SetupSecurity.terms.suffix')}
                  </Button>
                  <BottomSheet
                    bottomSheetModalRef={termsAndConditionsRef}
                    heading={t('SetupSecurity.terms.suffix')}
                    primaryButtonlabel={t('buttons.close', {ns: 'global'})}
                    primaryButtonOnPress={() =>
                      termsAndConditionsRef.current?.dismiss()
                    }>
                    <Text
                      type="body"
                      size="medium"
                      color={theme.colors.onSurfaceVariant}>
                      {TermsAndConditions}
                    </Text>
                  </BottomSheet>
                </View>
                <Button
                  type="primary"
                  disabled={
                    (password === '' && confirmPassword === '') ||
                    password != confirmPassword ||
                    !accepTerms
                  }
                  onPress={handleNewUser}>
                  {t('buttons.finish', {ns: 'global'})}
                </Button>
              </View>
            </>
          ) : (
            <>
              <View>
                <BackButton navigation={navigation} />
                <Text
                  textTransform="uppercase"
                  type="headline"
                  size="medium"
                  color={theme.colors.onBackground}
                  marginBottom={16}>
                  {t('SetupSecurity.title2')}
                </Text>
                <Text
                  type="title"
                  size="small"
                  color={theme.colors.onBackground}
                  marginBottom={16}>
                  {t('SetupSecurity.subtitle2')}
                </Text>
                {usePassword && (
                  <TextField
                    isSensitive
                    type="filled"
                    label={t('password.password', {ns: 'global'})}
                    placeholder={t('password.enter', {ns: 'global'})}
                    onChangeText={setPassword}
                  />
                )}
              </View>
              <View>
                {usePassword && (
                  <Button
                    type="primary"
                    disabled={password === ''}
                    onPress={passwordKeyRetrieval}>
                    {t('buttons.confirm', {ns: 'global'})}
                  </Button>
                )}
              </View>
            </>
          )}
        </>
      )}
    </Background>
  );
};
