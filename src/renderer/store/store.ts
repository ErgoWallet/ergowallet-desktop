import {configureStore, Action} from "@reduxjs/toolkit";
import rootReducer, {RootState} from "./root-reducer";
import {ThunkAction} from "redux-thunk";
import {useDispatch} from "react-redux";
import {fetchAddresses, fetchTransactions, fetchUnspentBoxes} from "../modules/wallet/wallet-slice";
import {ipcRenderer} from 'electron';

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

ipcRenderer.on("WalletUpdated", (event, args) => {
  store.dispatch(fetchTransactions());
  store.dispatch(fetchUnspentBoxes());
  store.dispatch(fetchAddresses());
});

export default store;