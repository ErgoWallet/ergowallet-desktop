// import {ipcRenderer} from "electron";
import {Commands, WalletTx} from "../common/backend-types";
import {AddressInfo} from "../common/backend-types";
import Application2 from "../main/application/Application2";
import {WalletBox} from "../main/application/services/wallet/Wallet";

/** Core application */
const app = new Application2('FIXME');

export function getSettings(): Promise<any> {
  return Promise.resolve({})
  // return ipcRenderer.invoke(Commands.APP_GET_SETTINGS);
}

export function updateSettings(settings: any) {
  app.updateSettings(settings)
  // return ipcRenderer.invoke(Commands.APP_UPDATE_SETTINGS, settings);
}

export function isWalletExists(walletName: string): Promise<boolean> {
  return Promise.resolve(app.isWalletExists(walletName))
  // return ipcRenderer.invoke(Commands.VAULT_WALLET_EXISTS, walletName);
}

export function validateAddress(address: string): Promise<string> {
  return Promise.resolve(app.validateAddress(address))
  // return ipcRenderer.invoke(Commands.VALIDATE_ADDRESS, address);
}

export function generateMnemonic(): Promise<string> {
  return Promise.resolve(app.generateMnemonic())
  // return ipcRenderer.invoke(Commands.GENERATE_MNEMONIC);
}

export function importMnemonic(walletName: string, mnemonic: string, passphrase: string, password: string): Promise<void> {
  return Promise.resolve(app.importWallet(walletName, mnemonic, passphrase, password))
  // return ipcRenderer.invoke(Commands.VAULT_IMPORT_WALLET, walletName, mnemonic, passphrase, password);
}

export function importPrivateKey(walletName: string, privateKey: string, password: string): Promise<void> {
  return Promise.resolve()
  // return ipcRenderer.invoke(Commands.VAULT_IMPORT_PRIVATE_KEY, walletName, privateKey, password);
}

export function getWallets(): Promise<Array<string>> {
  return Promise.resolve(app.getWallets())
  // return ipcRenderer.invoke(Commands.VAULT_GET_WALLETS);
}

export function loadWallet(walletName: string): Promise<boolean> {
  //FIXME: use password
  return Promise.resolve(app.loadWallet(walletName, ''))
  // return ipcRenderer.invoke(Commands.LOAD_WALLET, walletName);
}

export function closeCurrentWallet(): Promise<boolean> {
  app.closeCurrentWallet()
  return Promise.resolve(true)
  // return ipcRenderer.invoke(Commands.CLOSE_WALLET);
}

export function getAddresses(): Promise<Array<AddressInfo>> {
  return Promise.resolve(app.getAddresses())
  // return ipcRenderer.invoke(Commands.WALLET_GET_ADDRESSES);
}

export function getUnspent(): Promise<Array<WalletBox>> {
  return Promise.resolve(app.getUnspentBoxes())
  // return ipcRenderer.invoke(Commands.WALLET_GET_UNSPENT);
}

export function getTransactions(): Promise<Array<any>> {
  return Promise.resolve(app.getTransactions())
  // return ipcRenderer.invoke(Commands.WALLET_GET_TRANSACTIONS);
}

export function getTransaction(txId: string): Promise<WalletTx> {
  return Promise.resolve(app.getTransaction(txId))
  // return ipcRenderer.invoke(Commands.WALLET_GET_TX, txId);
}

export function createTransaction(
  spendingBoxes: Array<string>,
  recipient: string, amount: string, fee: string, tokenId: string
  ): Promise<any> {
    return Promise.resolve('')
  // return ipcRenderer.invoke(Commands.WALLET_CREATE_TX, spendingBoxes, recipient, amount, fee, tokenId);
}

export function signTransaction(tx: any): Promise<any> {
  return Promise.resolve()
  // return ipcRenderer.invoke(Commands.WALLET_SIGN_TX, tx);
}

export function sendTransaction(ergoTx: any): Promise<string> {
  return Promise.resolve('')
  // return ipcRenderer.invoke(Commands.WALLET_SEND_TX, ergoTx);
}
