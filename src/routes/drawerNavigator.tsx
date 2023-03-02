import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerHeaderMenu, Placeholder} from '../components';
import {TabsNavigator} from './tabNavigator';

const DrawerMenu = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <DrawerMenu.Navigator
      initialRouteName="Wallet"
      drawerContent={props => <></>}
      screenOptions={{
        headerShown: true,
        header: props => <DrawerHeaderMenu {...props} />,
        drawerPosition: 'right',
        drawerType: 'front',
        unmountOnBlur: true,
        drawerStyle: {backgroundColor: 'transparent'},
      }}>
      <DrawerMenu.Screen name="Wallet" component={TabsNavigator} />
      <DrawerMenu.Screen name="Governance" component={Placeholder} />
      <DrawerMenu.Screen name="Accounts" component={Placeholder} />
      <DrawerMenu.Screen
        name="AddressBook"
        component={Placeholder}
        options={{headerShown: false}}
      />
      <DrawerMenu.Screen name="AccountHistory" component={Placeholder} />
      <DrawerMenu.Screen
        name="Settings"
        component={Placeholder}
        options={{headerShown: false}}
      />
    </DrawerMenu.Navigator>
  );
};
