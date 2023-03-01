import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const AppLogin = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  const dispatch = useDispatch();
  const {isBiometricEnabled, appPswHash, appEncryptionKeySettings} =
    useAppSelector(state => state.appSettings);
  const {accounts} = useAppSelector(state => state.userData);

  const [password, setPassword] = useState<string>('');
  const [usePassword, setUsePassword] = useState<boolean>(!isBiometricEnabled);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(biometricLogin);
  }, []);

  const biometricLogin = async () => {
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
          <ActivityIndicator color={theme.primaryAccent} size={96} />
          <Text
            style={{
              color: theme.darkBackgroundText,
              fontSize: 16,
              lineHeight: 16,
              fontFamily: theme.bodyFontFamily,
              marginTop: 16,
            }}>
            Setting things up...
          </Text>
        </View>
      ) : (
        <>
          <View style={{marginTop: 24}}>
            <Logo
              style={{alignSelf: 'center', marginBottom: 24}}
              color={theme.appLogo}
            />
            <View style={{marginBottom: 24}}>
              <Title style={{fontSize: theme.title2FontSize}}>
                Get Signed In
              </Title>
              <Subtitle>
                Welcome back! Login via biometric or password.
              </Subtitle>
            </View>
            {usePassword && (
              <Input
                isSensitive
                label={t('password.password', {ns: 'global'})}
                onChangeText={text => setPassword(text)}
                placeholder={t('password.enter', {ns: 'global'})}
              />
            )}

            {!usePassword && (
              <Pressable
                onPress={biometricLogin}
                style={{alignItems: 'center', marginTop: 32}}>
                <Fingerprint
                  height={80}
                  width={80}
                  color={theme.darkBackgroundText}
                />
                <Text style={styles(theme).biometricText}>Tap to Scan</Text>
              </Pressable>
            )}

            {usePassword ? (
              isBiometricEnabled && (
                <Pressable
                  style={{marginTop: 32}}
                  onPress={() => setUsePassword(false)}>
                  <Text style={styles(theme).optionsText}>
                    Switch to Biometric Login
                  </Text>
                </Pressable>
              )
            ) : (
              <Pressable
                style={{marginTop: 32}}
                onPress={() => setUsePassword(true)}>
                <Text style={styles(theme).optionsText}>
                  Switch to Password Login
                </Text>
              </Pressable>
            )}
          </View>
          {usePassword && (
            <PrimaryButton isDisabled={password === ''} onPress={passwordLogin}>
              {t('Login.button')}
            </PrimaryButton>
          )}
        </>
      )}
    </Background>
  );
};

const styles = (theme: ThemePropertiesTypes) =>
  StyleSheet.create({
    biometricText: {
      marginTop: 8,
      fontSize: theme.bodyFontSize,
      fontFamily: theme.bodyFontFamily,
      color: theme.darkBackgroundText,
    },
    optionsText: {
      textAlign: 'center',
      fontSize: theme.bodyFontSize,
      fontFamily: theme.titleFontFamily,
      color: theme.darkBackgroundText,
    },
  });
