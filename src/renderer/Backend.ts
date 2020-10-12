import {ipcRenderer} from "electron";
import {Commands} from "../common/backend-types";
import {AddressInfo} from "../common/backend-types";
import {WalletBox} from "../main/application/services/wallet/Wallet";

export function getSettings(): Promise<any> {
  return ipcRenderer.invoke(Commands.APP_GET_SETTINGS);
}

export function updateSettings(settings: any) {
  return ipcRenderer.invoke(Commands.APP_UPDATE_SETTINGS, settings);
}

export function isWalletExists(walletName: string): Promise<boolean> {
  return ipcRenderer.invoke(Commands.VAULT_WALLET_EXISTS, walletName);
}

export function validateAddress(address: string): Promise<string> {
  return ipcRenderer.invoke(Commands.VALIDATE_ADDRESS, address);
}

export function generateMnemonic(): Promise<string> {
  return ipcRenderer.invoke(Commands.GENERATE_MNEMONIC);
}

export function importWallet(walletName: string, mnemonic: string, password: string): Promise<void> {
  return ipcRenderer.invoke(Commands.VAULT_IMPORT_WALLET, walletName, mnemonic, password);
}

export function getWallets(): Promise<Array<string>> {
  return ipcRenderer.invoke(Commands.VAULT_GET_WALLETS);
}

export function loadWallet(walletName: string): Promise<boolean> {
  return ipcRenderer.invoke(Commands.LOAD_WALLET, walletName);
}

export function closeCurrentWallet(): Promise<boolean> {
  return ipcRenderer.invoke(Commands.CLOSE_WALLET);
}

export function getAddresses(): Promise<Array<AddressInfo>> {
  return ipcRenderer.invoke(Commands.WALLET_GET_ADDRESSES);
}

export function getUnspent(): Promise<Array<WalletBox>> {
  return ipcRenderer.invoke(Commands.WALLET_GET_UNSPENT);
}

export function getTransactions(): Promise<Array<any>> {
  return ipcRenderer.invoke(Commands.WALLET_GET_TRANSACTIONS);
}

export function createTransaction(spendingBoxes: Array<string>, recipient: string, amount: string, fee: string, tokenId: string): Promise<any> {
  return ipcRenderer.invoke(Commands.WALLET_CREATE_TX, spendingBoxes, recipient, amount, fee, tokenId);
}

export function signTransaction(tx: any): Promise<any> {
  return ipcRenderer.invoke(Commands.WALLET_SIGN_TX, tx);
}

export function sendTransaction(ergoTx: any): Promise<string> {
  return ipcRenderer.invoke(Commands.WALLET_SEND_TX, ergoTx);
}
