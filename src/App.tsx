import React from 'react';

import {store, persistor} from './redux/store';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate as ReduxPersistProvider} from 'redux-persist/integration/react';
import {NavigationContainer as NavigationProvider} from '@react-navigation/native';
import {NavigatorTheme, ThemeProvider} from './themes';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView as GestureHandlerProvider} from 'react-native-gesture-handler';

import {i18nInit} from './i18n';

const onBeforeLift = async () => {
  await i18nInit(store.getState().appSettings.appActiveLanguage.id);
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ReduxPersistProvider persistor={persistor} onBeforeLift={onBeforeLift}>
        <ThemeProvider>
          <NavigationProvider theme={NavigatorTheme}>
            <GestureHandlerProvider style={{flex: 1}}>
              <BottomSheetModalProvider></BottomSheetModalProvider>
            </GestureHandlerProvider>
          </NavigationProvider>
        </ThemeProvider>
      </ReduxPersistProvider>
    </ReduxProvider>
  );
};

export default App;
