import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {appNetworkNames, AppNetworks} from '../constants';
import {setActiveNetwork, useAppDispatch, useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {BottomSheet, Pressable, Text} from './Base';
import ChevronDownIcon from '../assets/Icons/Chevron-Down.svg';
import {ThemePropertiesType} from '../types';

const {height} = Dimensions.get('window');

export const BottomSheetNetworkPicker = () => {
  const activeNetwork = useAppSelector(state => state.userData.activeNetwork);
  // const network =
  //   activeNetwork.type === 'mainnet'
  //     ? AppNetworks[activeNetwork.name][activeNetwork.type]
  //     : AppNetworks[activeNetwork.name][activeNetwork.type][0];
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const openNetworkMenu = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleNetworkPress = (
    name: (typeof appNetworkNames)[number],
    type: 'mainnet' | 'testnet',
  ) => {
    dispatch(
      setActiveNetwork({
        name,
        type,
        chain_id:
          type == 'mainnet'
            ? AppNetworks[name]['mainnet'].chain_id
            : AppNetworks[name]['testnet'][0].chain_id,
      }),
    );
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <View>
      <Pressable
        disabled
        onPress={openNetworkMenu}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surfaceVariant,
          paddingVertical: 4,
          paddingHorizontal: 6,
          borderRadius: 5,
        }}>
        <Image
          style={{height: 24, width: 24, borderRadius: 24}}
          source={AppNetworks.archway.mainnet.logo}
        />
        <Text
          marginLeft={8}
          type="label"
          size="large"
          color={theme.colors.onSurfaceVariant}>
          {AppNetworks.archway.mainnet.pretty_name}
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.secondary,
            padding: 6,
            borderRadius: 5,
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ChevronDownIcon
            width={12}
            height={12}
            color={theme.colors.onSecondary}
          />
        </View>
      </Pressable>
      {/* <BottomSheet
        heading={'Pick a Network'}
        bottomSheetModalRef={bottomSheetModalRef}
        primaryButtonlabel="Test"
        primaryButtonOnPress={() => {}}>
        {appNetworkNames.map(name => {
          let network = AppNetworks[name];
          return (
            <Pressable
              onPress={() => handleNetworkPress(name, 'mainnet')}
              key={name}
              style={[
                styles(theme).rowContainer,
                {
                  borderWidth: activeNetwork.name === name ? 1 : undefined,
                  borderColor: theme.colors.outline,
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 40, height: 40, borderRadius: 32}}
                  source={network.mainnet.logo}
                />
                <Text
                  marginLeft={8}
                  type="label"
                  size="large"
                  color={theme.colors.onSurfaceVariant}>
                  {network.mainnet.pretty_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                  backgroundColor: theme.colors.onSurfaceVariant,
                }}>
                <Pressable onPress={() => handleNetworkPress(name, 'mainnet')}>
                  <Text
                    marginRight={8}
                    type="label"
                    size="small"
                    color={theme.colors.onSurfaceVariant}>
                    Mainnet
                  </Text>
                </Pressable>

                <Pressable onPress={() => handleNetworkPress(name, 'testnet')}>
                  <Text
                    marginRight={8}
                    type="label"
                    size="small"
                    color={theme.colors.onSurfaceVariant}>
                    Testnet
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          );
        })}
      </BottomSheet> */}
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    contentContainer: {maxHeight: height * 0.66},
    rowContainer: {
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
