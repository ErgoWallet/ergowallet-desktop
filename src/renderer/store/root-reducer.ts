import {combineReducers} from '@reduxjs/toolkit';
import walletReducer from "../modules/wallet/wallet-slice";

const rootReducer = combineReducers({
  wallet: walletReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;