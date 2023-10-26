import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../store/store";
import * as backend from "../../backend";

const pkg = require('../../../../package.json');

interface AppState {
  ready: boolean;
  version: string;
  latestVersion?: string;
  settings: {
    termsVersion?: string
  };
}

const initialState: AppState = {
  ready: false,
  version: pkg.version,
  settings: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appReady(state, action: PayloadAction<any>) {
      state.ready = true;
    },
    appLatestVersion(state, action: PayloadAction<any>) {
      state.latestVersion = action.payload;
    },
    getSettingsSuccess(state, action: PayloadAction<any>) {
      state.settings = action.payload;
    },
  }
});

// ------ Actions -----------
export const {
  appReady,
  appLatestVersion,
  getSettingsSuccess
} = appSlice.actions;

export const fetchAppSettings = (): AppThunk => async dispatch => {
  const result = await backend.getSettings();
  dispatch(getSettingsSuccess(result));
};

export default appSlice.reducer;