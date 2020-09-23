import {WalletBox} from "../main/application/services/wallet/Wallet";

export interface AddressInfo {
  address: string;
}
export type ErgoBox = WalletBox;

export interface Event {
  type: string;
  payload: any;
}

export enum Commands {
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