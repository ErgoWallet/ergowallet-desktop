import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto/index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import {ipcRenderer, IpcRendererEvent} from "electron";
import App from './app/App';
import {fetchAddresses, fetchTransactions, fetchUnspentBoxes} from "./modules/wallet/wallet-slice";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// Listen to Electron IPC events
ipcRenderer.on("WalletUpdated", (event: IpcRendererEvent, data) => {
  store.dispatch(fetchTransactions());
  store.dispatch(fetchUnspentBoxes());
  store.dispatch(fetchAddresses());
});
