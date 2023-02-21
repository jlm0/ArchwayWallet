import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BaseNavigatorType} from '../types';
import {useAppSelector} from '../redux';
import {Placeholder} from '../components';
import SetupNavigator from './setupNavigator';
import DrawerNavigator from './drawerNavigator';

const BaseStack = createStackNavigator<BaseNavigatorType>();

export const BaseNavigator = () => {
  const {
    appSettings: {isLoggedIn},
    userData: {accounts},
  } = useAppSelector(state => state);
  return (
    <BaseStack.Navigator id="BaseStack" screenOptions={{headerShown: false}}>
      {accounts.length != 0 && !isLoggedIn && (
        <BaseStack.Screen name="AppLogin" component={Placeholder} />
      )}
      {accounts.length != 0 && isLoggedIn && (
        <BaseStack.Group>
          <BaseStack.Screen name="AppHome" component={DrawerNavigator} />
        </BaseStack.Group>
      )}
      {<BaseStack.Screen name="AccountSetup" component={SetupNavigator} />}
    </BaseStack.Navigator>
  );
};
