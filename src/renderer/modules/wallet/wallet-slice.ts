import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as backend from "../../Backend";
import {AppThunk} from "../../store/store";
import {groupByDay} from "./utils";
import {ErgoBox} from "../../../common/backend-types";

interface WalletState {
  addresses: any;
  boxes: Array<ErgoBox>;
  transactions: Record<string, Array<any>>;
}

const initialState: WalletState = {
  addresses: [],
  boxes: [],
  transactions: {}
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    getAddressesSuccess(state, action: PayloadAction<any>) {
      state.addresses = action.payload;
    },
    getBoxesSuccess(state, action: PayloadAction<Array<ErgoBox>>) {
      state.boxes = action.payload;
    },
    getTransSuccess(state, action: PayloadAction<any>) {
      state.transactions = action.payload;
    }
  }
});

// ------ Actions -----------
export const {
  getAddressesSuccess,
  getBoxesSuccess,
  getTransSuccess
} = walletSlice.actions;


// ------- Thunk actions -------
export const fetchUnspentBoxes = (): AppThunk => async dispatch => {
  const result = await backend.getUnspent();
  dispatch(getBoxesSuccess(result));
};

export const fetchTransactions = (): AppThunk => async dispatch => {
  const result = await backend.getTransactions();
  const sorted = groupByDay(result);
  dispatch(getTransSuccess(sorted));
};

export const fetchAddresses = (): AppThunk => async dispatch => {
  const addresses = await backend.getAddresses();
  const txs: Array<any> = await backend.getTransactions();

  // calculate tx counts per address
  const addrMap = addresses.reduce((m, addr) => {
    m[addr.address] = addr;
    return m;
  }, {});

  txs.forEach((tx) => {
    const uniq = {};
    tx.inputs.forEach((i) => uniq[i.address] = true);
    tx.outputs.forEach((o) => uniq[o.address] = true);
    Object.keys(uniq).forEach((a) => {
      if (addrMap[a]) {
        addrMap[a].txCount = (addrMap[a].txCount || 0) + 1;
      }
    });
  });

  dispatch(getAddressesSuccess(Object.values(addrMap)));
};
// -----------------------------

export default walletSlice.reducer;