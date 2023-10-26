import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as backend from "../../backend";
import {AppThunk} from "../../store/store";
import {groupByDay} from "./utils";
import {WalletBox} from "../../../main/application/services/wallet/Wallet";

export interface WalletState {
  addresses: any;
  boxes: Array<WalletBox>;
  transactions: Record<string, Array<any>>;
  txsLoading: boolean;
  unspentLoading: boolean;
}

const initialState: WalletState = {
  addresses: [],
  boxes: [],
  transactions: {},
  txsLoading: true,
  unspentLoading: true,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    onWalletClosed(state, action: PayloadAction<any>) {
      return initialState;
    },
    onHistoryLoading(state, action: PayloadAction<boolean>) {
      state.txsLoading = action.payload;
    },
    onUnspentLoading(state, action: PayloadAction<boolean>) {
      state.unspentLoading = action.payload;
    },
    getAddressesSuccess(state, action: PayloadAction<any>) {
      state.addresses = action.payload;
    },
    getBoxesSuccess(state, action: PayloadAction<Array<WalletBox>>) {
      state.boxes = action.payload;
    },
    getTransSuccess(state, action: PayloadAction<Array<any>>) {
      const sorted = groupByDay(action.payload);
      state.transactions = sorted;
    }
  }
});

// ------ Actions -----------
export const {
  getAddressesSuccess,
  getBoxesSuccess,
  getTransSuccess,
  onHistoryLoading,
  onUnspentLoading,
  onWalletClosed
} = walletSlice.actions;


// ------- Thunk actions -------
export const fetchUnspentBoxes = (): AppThunk => async dispatch => {
  const result = await backend.getUnspent();
  dispatch(getBoxesSuccess(result));
};

export const fetchTransactions = (): AppThunk => async dispatch => {
  const result = await backend.getTransactions();
  dispatch(getTransSuccess(result));
};

export const fetchAddresses = (): AppThunk => async dispatch => {
  const addresses = await backend.getAddresses();
  dispatch(getAddressesSuccess(addresses));
};
// -----------------------------

export default walletSlice.reducer;