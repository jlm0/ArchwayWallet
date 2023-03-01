import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Placeholder} from '../components';
import {useAppSelector} from '../redux';
import {
  SetupdSeedCreate,
  SetupOnboard,
  SetupOptions,
  SetupSeedConfirm,
  SetupProfile,
  SetupSecurity,
} from '../screens';
import SetupSeedImport from '../screens/Setup/SetupSeedImport';
import SetupSuccess from '../screens/Setup/SetupSucces';

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
      <SetupStack.Screen name="SetupSeedConfirm" component={SetupSeedConfirm} />
      <SetupStack.Screen name="SetupSeedImport" component={SetupSeedImport} />
      <SetupStack.Screen name="SetupSecurity" component={SetupSecurity} />
      <SetupStack.Screen name="SetupSuccess" component={SetupSuccess} />
    </SetupStack.Navigator>
  );
};
