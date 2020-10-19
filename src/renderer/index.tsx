import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto/index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import {ipcRenderer, IpcRendererEvent} from "electron";
import App from './modules/app/App';
import {fetchAddresses, fetchTransactions, fetchUnspentBoxes} from "./modules/wallet/wallet-slice";
import {appLatestVersion, appReady, fetchAppSettings} from "./modules/app/app-slice";
import {Event, Events} from "../common/backend-types";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// Listen to Electron IPC events
ipcRenderer.on("events", (event: IpcRendererEvent, e: Event) => {
  console.log(e);

  switch (e.type) {
    case Events.WALLET_UPDATED:
      store.dispatch(fetchTransactions());
      store.dispatch(fetchUnspentBoxes());
      store.dispatch(fetchAddresses());
      break;

    case Events.APP_READY:
      store.dispatch(fetchAppSettings());
      store.dispatch(appReady(true));
      break;

    case Events.SETTINGS_UPDATED:
      store.dispatch(fetchAppSettings());
      break;

    case Events.APP_LATEST_VERSION:
      store.dispatch(appLatestVersion(e.payload));
  }
});
