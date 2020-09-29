import {combineReducers} from '@reduxjs/toolkit';
import walletReducer from "../modules/wallet/wallet-slice";
import appReducer from "../modules/app/app-slice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;