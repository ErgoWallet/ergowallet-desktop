import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErgoBox} from "../../../common/backend-types";
import {AppThunk} from "../../store/store";
import * as backend from "../../Backend";
import {getBoxesSuccess} from "../wallet/wallet-slice";

interface AppState {
  ready: boolean;
  settings: any;
}

const initialState: AppState = {
  ready: false,
  settings: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appReady(state, action: PayloadAction<any>) {
      state.ready = true;
    },
    getSettingsSuccess(state, action: PayloadAction<Array<ErgoBox>>) {
      state.settings = action.payload;
    },
  }
});

// ------ Actions -----------
export const {
  appReady,
  getSettingsSuccess
} = appSlice.actions;

export const fetchAppSettings = (): AppThunk => async dispatch => {
  const result = await backend.getSettings();
  dispatch(getSettingsSuccess(result));
};

export default appSlice.reducer;