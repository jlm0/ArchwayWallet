import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import TabsMenu from '../components/TabsMenu';
// import WalletHome from '../screens/WalletHome';
// import TokensHome from '../screens/TokensHome';
// import StakingHome from '../screens/StakingHome';
// import DappsHome from '../screens/DappsHome';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Placeholder} from '../components';

const HomeTab = createBottomTabNavigator();

const TabsNavigator = () => {
  const {dismissAll} = useBottomSheetModal();
  return (
    <HomeTab.Navigator
      screenListeners={{
        blur: () => dismissAll(),
      }}
      tabBar={props => <></>}
      screenOptions={{headerShown: false, unmountOnBlur: true}}>
      <HomeTab.Screen name="WalletTab" component={Placeholder} />
      <HomeTab.Screen name="TokensTab" component={Placeholder} />
      <HomeTab.Screen name="StakingTab" component={Placeholder} />
      <HomeTab.Screen name="DappsTab" component={Placeholder} />
    </HomeTab.Navigator>
  );
};

export default TabsNavigator;
