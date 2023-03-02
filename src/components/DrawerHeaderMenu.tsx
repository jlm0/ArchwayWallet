import {DrawerHeaderProps} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MenuIcon from '../assets/Icons/Menu.svg';
import {useAppSelector} from '../redux';
import {useTheme} from '../themes';
import {ThemePropertiesType} from '../types';
import {Pressable, Text} from './Base';
import {BottomSheetNetworkPicker} from './BottomSheetNetworkPicker';
import NotificationIcon from '../assets/Icons/Notification.svg';

export const DrawerHeaderMenu = ({
  layout,
  options,
  route,
  navigation,
}: DrawerHeaderProps) => {
  const theme = useTheme();

  const account = useAppSelector(state => state.userData.activeAccount);
  const openDrawerMenu = () => {
    navigation.openDrawer();
  };

  const {headerContainer, headerMenuButton, avatarImage, notificationButon} =
    styles(theme);

  return (
    <View style={[headerContainer, {width: layout.width}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={avatarImage} source={account?.avatar.source} />
        <Text type="title" size="medium" color={theme.colors.onSurfaceVariant}>
          {'Hello, '}
          <Text type="title" size="medium" color={theme.colors.primary}>
            {account!.name}
          </Text>
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable style={notificationButon}>
          <NotificationIcon color={theme.colors.onSurfaceVariant} />
        </Pressable>
        <Pressable
          style={headerMenuButton}
          onPress={openDrawerMenu}
          hitSlop={{top: 24, bottom: 16, right: 16, left: 8}}>
          <MenuIcon
            height={22}
            width={22}
            color={theme.colors.onSurfaceVariant}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    headerContainer: {
      width: '100%',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
    },
    headerMenuButton: {
      backgroundColor: 'transparent',
      padding: 8,
      borderRadius: 4,
    },
    notificationButon: {
      backgroundColor: 'transparent',
      padding: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    avatarImage: {
      height: 40,
      width: 40,
      borderWidth: 2,
      borderRadius: 40,
      borderColor: theme.colors.primary,
      resizeMode: 'contain',
      alignSelf: 'center',
      backgroundColor: 'black',
      marginRight: 8,
    },
  });
