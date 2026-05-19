"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandlers = setHandlers;
var electron_1 = require("electron");
var backend_types_1 = require("../../../common/backend-types");
function setHandlers(app) {
    electron_1.ipcMain.handle(backend_types_1.Commands.GENERATE_MNEMONIC, function () {
        return app.generateMnemonic();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.VAULT_GET_WALLETS, function () {
        return app.getWallets();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.VAULT_IMPORT_WALLET, function (event, walletName, mnemonic, passphrase, password) {
        return app.importWallet(walletName, mnemonic, passphrase, password);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.VAULT_IMPORT_PRIVATE_KEY, function (event, walletName, privateKey, password) {
        return app.importPrivateKey(walletName, privateKey, password);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.LOAD_WALLET, function (event, walletName, walletPassword) {
        return app.loadWallet(walletName, walletPassword);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.VAULT_WALLET_EXISTS, function (event, walletName) {
        return app.isWalletExists(walletName);
    });
}
