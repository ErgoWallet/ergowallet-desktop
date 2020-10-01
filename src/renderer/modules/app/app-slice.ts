import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../store/store";
import * as backend from "../../Backend";

interface AppState {
  ready: boolean;
  settings: {
    termsVersion?: string
  };
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
    getSettingsSuccess(state, action: PayloadAction<any>) {
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