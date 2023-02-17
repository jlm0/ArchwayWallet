import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CustomNetworkSettingsType} from '../types/';
import {
  AccountType,
  ActiveNetworkType,
  AddressBookEntryType,
  UserDataStateType,
} from '../types/reduxStoreTypes';

const initialState: UserDataStateType = {
  accounts: [],
  activeAccount: null,
  activeNetwork: {name: 'secretnetwork', type: 'mainnet', chain_id: 'secret-4'},
  customNetworkSettings: [],
  addressBook: [],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<AccountType>) => {
      state.accounts.push({...action.payload});
    },
    updateAccount: (state, action: PayloadAction<AccountType>) => {
      const index = state.accounts.findIndex(
        account => account.id === action.payload.id,
      );
      state.accounts[index] = action.payload;
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        account => account.id !== action.payload,
      );
    },
    setActiveAccount: (state, action: PayloadAction<AccountType>) => {
      state.activeAccount = action.payload;
    },
    setActiveNetwork: (state, action: PayloadAction<ActiveNetworkType>) => {
      state.activeNetwork = action.payload;
    },
    addAddressBookEntry: (
      state,
      action: PayloadAction<AddressBookEntryType>,
    ) => {
      state.addressBook.push({...action.payload});
    },
    updateAddressBookEntry: (
      state,
      action: PayloadAction<AddressBookEntryType>,
    ) => {
      const index = state.addressBook.findIndex(
        contact => contact.id === action.payload.id,
      );
      state.addressBook[index] = action.payload;
    },
    removeAddressBookEntry: (state, action: PayloadAction<string>) => {
      state.addressBook = state.addressBook.filter(
        entry => entry.id !== action.payload,
      );
    },
    clearAllAddressBook: state => {
      state.addressBook = [];
    },
    addCustomNetworkSetting: (
      state,
      action: PayloadAction<CustomNetworkSettingsType>,
    ) => {
      state.customNetworkSettings.push({...action.payload});
    },
    removeCustomNetworkSetting: (
      state,
      action: PayloadAction<CustomNetworkSettingsType>,
    ) => {
      state.customNetworkSettings.filter(
        setting => setting.chain_id !== action.payload.chain_id,
      );
    },
    updateCustomNetworkSetting: (
      state,
      action: PayloadAction<CustomNetworkSettingsType>,
    ) => {
      const index = state.customNetworkSettings.findIndex(
        setting => setting.chain_id === action.payload.chain_id,
      );
      state.customNetworkSettings[index] = action.payload;
    },
  },
});

export const {
  addAccount,
  updateAccount,
  removeAccount,
  setActiveAccount,
  setActiveNetwork,
  addAddressBookEntry,
  updateAddressBookEntry,
  removeAddressBookEntry,
  clearAllAddressBook,
} = userDataSlice.actions;

export default userDataSlice.reducer;
