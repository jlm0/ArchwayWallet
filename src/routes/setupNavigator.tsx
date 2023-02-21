import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Placeholder} from '../components';
import {useAppSelector} from '../redux';
import {SetupNavigatorType} from '../types';

const SetupStack = createStackNavigator<SetupNavigatorType>();

const SetupNavigator = () => {
  const isFirstTimeUser = useAppSelector(
    state => state.appSettings.isFirstTimeUser,
  );
  return (
    <SetupStack.Navigator id="SetupStack" screenOptions={{headerShown: false}}>
      {isFirstTimeUser && (
        <SetupStack.Screen name="SetupOnboard" component={Placeholder} />
      )}
      <SetupStack.Screen name="SetupOptions" component={Placeholder} />
      <SetupStack.Screen name="SetupProfile" component={Placeholder} />
      <SetupStack.Screen name="SetupSeedCreate" component={Placeholder} />
      <SetupStack.Screen name="SetupSeedConfirm" component={Placeholder} />
      <SetupStack.Screen name="SetupSeedImport" component={Placeholder} />
      <SetupStack.Screen name="SetupSecurity" component={Placeholder} />
      <SetupStack.Screen name="SetupSuccess" component={Placeholder} />
    </SetupStack.Navigator>
  );
};

export default SetupNavigator;
