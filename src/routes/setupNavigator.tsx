import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Placeholder} from '../components';
import {useAppSelector} from '../redux';
import {SetupOnboard} from '../screens';
import {SetupOptions} from '../screens/SetupOptions';
import SetupProfile from '../screens/SetupProfile';
import {SetupdSeedCreate} from '../screens/SetupSeedCreate';
import {SetupNavigatorType} from '../types';

const SetupStack = createStackNavigator<SetupNavigatorType>();

export const SetupNavigator = () => {
  const isFirstTimeUser = useAppSelector(
    state => state.appSettings.isFirstTimeUser,
  );
  return (
    <SetupStack.Navigator id="SetupStack" screenOptions={{headerShown: false}}>
      {isFirstTimeUser && (
        <SetupStack.Screen name="SetupOnboard" component={SetupOnboard} />
      )}
      <SetupStack.Screen name="SetupOptions" component={SetupOptions} />
      <SetupStack.Screen name="SetupProfile" component={SetupProfile} />
      <SetupStack.Screen name="SetupSeedCreate" component={SetupdSeedCreate} />
      <SetupStack.Screen name="SetupSeedConfirm" component={Placeholder} />
      <SetupStack.Screen name="SetupSeedImport" component={Placeholder} />
      <SetupStack.Screen name="SetupSecurity" component={Placeholder} />
      <SetupStack.Screen name="SetupSuccess" component={Placeholder} />
    </SetupStack.Navigator>
  );
};
