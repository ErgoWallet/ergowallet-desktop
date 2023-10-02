import {ipcMain} from 'electron';
import {Commands} from '../../../common/backend-types';
import Application from "../Application";

export function setHandlers(app: Application): void {

  ipcMain.handle(Commands.WALLET_GET_ADDRESSES, (event: any) => {
    return app.getAddresses();
  });

  ipcMain.handle(Commands.WALLET_GET_UNSPENT, () => {
    return app.getUnspentBoxes();
  });

  ipcMain.handle(Commands.WALLET_GET_TRANSACTIONS, () => {
    return app.getTransactions();
  });

  ipcMain.handle(Commands.WALLET_GET_TX, (event: any, txId: string) => {
    return app.getTransaction(txId);
  });

  ipcMain.handle(Commands.CLOSE_WALLET, () => {
    return app.closeCurrentWallet();
  });

  ipcMain.handle(Commands.VALIDATE_ADDRESS, (event: any, address: string) => {
    return app.validateAddress(address);
  });

  ipcMain.handle(Commands.WALLET_CREATE_TX,
    (event: any, spendingBoxes: Array<string>, recipient: string, amount: string, fee: string, tokenId: string) => {
    return app.createTx(spendingBoxes, recipient, amount, fee, tokenId);
  });

  ipcMain.handle(Commands.WALLET_SIGN_TX,
    (event: any, tx: any) => {
      return app.signTx(tx);
  });

  ipcMain.handle(Commands.WALLET_SEND_TX,
    (event: any, ergoTx: any) => {
      return app.sendTx(ergoTx);
  });
}
