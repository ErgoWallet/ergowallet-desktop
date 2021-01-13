import {ipcMain} from 'electron';
import {Commands} from '../../../common/backend-types';
import Application from "../Application";

export function setHandlers(app: Application): void {
  ipcMain.handle(Commands.GENERATE_MNEMONIC, () => {
    return app.generateMnemonic();
  });

  ipcMain.handle(Commands.VAULT_GET_WALLETS, () => {
    return app.getWallets();
  });

  ipcMain.handle(Commands.VAULT_IMPORT_WALLET, (event: any, walletName: string, mnemonic: string, passphrase: string, password: string) => {
    return app.importWallet(walletName, mnemonic, passphrase, password);
  });

  ipcMain.handle(Commands.LOAD_WALLET, (event: any, walletName: string, walletPassword: string) => {
    return app.loadWallet(walletName, walletPassword);
  });

  ipcMain.handle(Commands.VAULT_WALLET_EXISTS, (event: any, walletName: string) => {
    return app.isWalletExists(walletName);
  });
}
