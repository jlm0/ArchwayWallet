import {configureStore} from '@reduxjs/toolkit';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import appSettingsReducer from './appSettingsSlice';
import userDataReducer from './userDataSlice';

export const KrypticMMKV = new MMKVLoader()
  .withInstanceID('KrypticData')
  .initialize();

const persistedAppSettings = persistReducer(
  {
    key: 'KrypticAppSettings',
    storage: KrypticMMKV,
    blacklist: ['isLoggedIn'],
    debug: true,
  },
  appSettingsReducer,
);

const persistedUserData = persistReducer(
  {
    key: 'KrypticUserData',
    storage: KrypticMMKV,
    debug: true,
  },
  userDataReducer,
);

export const store = configureStore({
  reducer: {
    userData: persistedUserData,
    appSettings: persistedAppSettings,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
