import React, {cloneElement} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {View} from 'react-native';
// import Governance from '../assets/Icons/Governance.svg';
import Accounts from '../assets/Icons/Accounts.svg';
// import AccountsHistory from '../assets/Icons/History.svg';
// import AddressBook from '../assets/Icons/Contacts.svg';
// import Settings from '../assets/Icons/Settings.svg';
import LogoHorizontal from '../assets/Logos/Horizontal.svg';
import {SvgProps} from 'react-native-svg';

import CloseIcon from '../assets/Icons/Close.svg';
import {Pressable, Text} from './Base';
import {ThemePropertiesType} from '../types';
import {useTheme} from '../themes';

interface DrawerContentButtonPropTypes {
  label: string;
  onPress: () => void;
  focused: boolean;
  theme: ThemePropertiesType;
  icon: React.ReactElement<SvgProps>;
}

const DrawerContentButton = ({
  label,
  focused,
  theme,
  icon,
  onPress,
}: DrawerContentButtonPropTypes) => {
  return (
    <View style={{marginBottom: 12}}>
      <Pressable
        onPress={onPress}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: focused
            ? theme.colors.primary
            : theme.colors.secondaryContainer,
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 6,
          height: 48,
          alignItems: 'center',
        }}>
        {cloneElement(icon, {color: theme.colors.onPrimary})}
        <Text type="label" size="large" color={theme.colors.onPrimary}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};
const CustomDrawerContent = ({
  state,
  navigation,
}: DrawerContentComponentProps) => {
  const theme = useTheme();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}>
        <View>
          <Pressable
            onPress={() => navigation.closeDrawer()}
            style={{alignSelf: 'flex-end', marginBottom: 24}}>
            <CloseIcon color={theme.colors.onSurfaceVariant} />
          </Pressable>

          <LogoHorizontal
            style={{alignSelf: 'center', marginBottom: 48}}
            color={theme.colors.onSurfaceVariant}
          />
          <DrawerContentButton
            theme={theme}
            label={'Governance'}
            icon={<Accounts color={theme.colors.onSurfaceVariant} />}
            focused={
              state.index ===
              state.routes.findIndex(e => e.name === 'Governance')
            }
            onPress={() => navigation.navigate('Governance')}
          />

          <DrawerContentButton
            theme={theme}
            label={'Accounts'}
            icon={<Accounts color={theme.colors.onSurfaceVariant} />}
            focused={
              state.index === state.routes.findIndex(e => e.name === 'Accounts')
            }
            onPress={() => navigation.navigate('Accounts')}
          />
          <DrawerContentButton
            theme={theme}
            label={'Account History'}
            icon={<Accounts color={theme.colors.onSurfaceVariant} />}
            focused={
              state.index ===
              state.routes.findIndex(e => e.name === 'AccountHistory')
            }
            onPress={() => navigation.navigate('AccountHistory')}
          />
          <DrawerContentButton
            theme={theme}
            label={'Address Book'}
            icon={<Accounts color={theme.colors.onSurfaceVariant} />}
            focused={
              state.index ===
              state.routes.findIndex(e => e.name === 'AddressBook')
            }
            onPress={() => navigation.navigate('AddressBook')}
          />
          <DrawerContentButton
            theme={theme}
            label={'Settings'}
            icon={<Accounts color={theme.colors.onSurfaceVariant} />}
            focused={
              state.index === state.routes.findIndex(e => e.name === 'Settings')
            }
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        <Text type="label" size="small" color={theme.colors.onSurfaceVariant}>
          vAlpha
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
