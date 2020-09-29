import {WalletBox} from "../main/application/services/wallet/Wallet";
import {TokenValue} from "../main/ergoplatform/connector/types";

export interface AddressInfo {
  address: string;
}
export type ErgoTokenAmount = Omit<TokenValue, 'amount'> & { amount: string };
export type ErgoBox = Omit<WalletBox, 'value' | 'assets'> & {
  value: string;
  assets: Array<ErgoTokenAmount>;
};


export interface Event {
  type: string;
  payload: any;
}

export enum Events {
  WALLET_UPDATED = 'wallet-updated',
  APP_READY = 'app-ready',
  SETTINGS_UPDATED = 'settings-updated'
}

export enum Commands {
  APP_UPDATE_SETTINGS = 'update-settings',
  APP_GET_SETTINGS = 'get-settings',
  GENERATE_MNEMONIC = 'generate-mnemonic',

  VAULT_GET_WALLETS = 'get-all-wallets',
  VAULT_IMPORT_WALLET = 'import-mnemonic',
  VAULT_WALLET_EXISTS = 'check-wallet-name',

  LOAD_WALLET = 'load-wallet',
  CLOSE_WALLET = 'close-wallet',

  WALLET_GET_ADDRESSES = 'wallet-get-addresses',
  WALLET_GET_UNSPENT = 'wallet-get-unspent-boxes',
  WALLET_GET_TRANSACTIONS = 'wallet-get-txs',

  WALLET_CREATE_TX = 'wallet-create-tx',
  WALLET_SIGN_TX = 'wallet-sign-tx',
  WALLET_SEND_TX = 'wallet-send-tx',
  VALIDATE_ADDRESS = 'validate-address',
}