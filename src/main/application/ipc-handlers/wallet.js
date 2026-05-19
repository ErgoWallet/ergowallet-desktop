"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandlers = setHandlers;
var electron_1 = require("electron");
var backend_types_1 = require("../../../common/backend-types");
function setHandlers(app) {
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_GET_ADDRESSES, function (event) {
        return app.getAddresses();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_GET_UNSPENT, function () {
        return app.getUnspentBoxes();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_GET_TRANSACTIONS, function () {
        return app.getTransactions();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_GET_TX, function (event, txId) {
        return app.getTransaction(txId);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.CLOSE_WALLET, function () {
        return app.closeCurrentWallet();
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.VALIDATE_ADDRESS, function (event, address) {
        return app.validateAddress(address);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_CREATE_TX, function (event, spendingBoxes, recipient, amount, fee, tokenId) {
        return app.createTx(spendingBoxes, recipient, amount, fee, tokenId);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_SIGN_TX, function (event, tx) {
        return app.signTx(tx);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.WALLET_SEND_TX, function (event, ergoTx) {
        return app.sendTx(ergoTx);
    });
}
