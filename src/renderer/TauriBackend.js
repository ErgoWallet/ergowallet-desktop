"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
exports.updateSettings = updateSettings;
exports.isWalletExists = isWalletExists;
exports.validateAddress = validateAddress;
exports.generateMnemonic = generateMnemonic;
exports.importMnemonic = importMnemonic;
exports.importPrivateKey = importPrivateKey;
exports.getWallets = getWallets;
exports.loadWallet = loadWallet;
exports.closeCurrentWallet = closeCurrentWallet;
exports.getAddresses = getAddresses;
exports.getUnspent = getUnspent;
exports.getTransactions = getTransactions;
exports.getTransaction = getTransaction;
exports.createTransaction = createTransaction;
exports.signTransaction = signTransaction;
exports.sendTransaction = sendTransaction;
var Application2_1 = require("../main/application/Application2");
function getSettings() {
    return Application2_1.app.getSettings();
    // return ipcRenderer.invoke(Commands.APP_GET_SETTINGS);
}
function updateSettings(settings) {
    Application2_1.app.updateSettings(settings);
    // return ipcRenderer.invoke(Commands.APP_UPDATE_SETTINGS, settings);
}
function isWalletExists(walletName) {
    return Promise.resolve(Application2_1.app.isWalletExists(walletName));
    // return ipcRenderer.invoke(Commands.VAULT_WALLET_EXISTS, walletName);
}
function validateAddress(address) {
    return Application2_1.app.validateAddress(address);
    // return ipcRenderer.invoke(Commands.VALIDATE_ADDRESS, address);
}
function generateMnemonic() {
    return Promise.resolve(Application2_1.app.generateMnemonic());
    // return ipcRenderer.invoke(Commands.GENERATE_MNEMONIC);
}
function importMnemonic(walletName, mnemonic, passphrase, password) {
    return Promise.resolve(Application2_1.app.importWallet(walletName, mnemonic, passphrase, password));
    // return ipcRenderer.invoke(Commands.VAULT_IMPORT_WALLET, walletName, mnemonic, passphrase, password);
}
function importPrivateKey(walletName, privateKey, password) {
    return Promise.resolve();
    // return ipcRenderer.invoke(Commands.VAULT_IMPORT_PRIVATE_KEY, walletName, privateKey, password);
}
function getWallets() {
    return Promise.resolve(Application2_1.app.getWallets());
    // return ipcRenderer.invoke(Commands.VAULT_GET_WALLETS);
}
function loadWallet(walletName) {
    //FIXME: use password
    return Application2_1.app.loadWallet(walletName, '');
    // return ipcRenderer.invoke(Commands.LOAD_WALLET, walletName);
}
function closeCurrentWallet() {
    Application2_1.app.closeCurrentWallet();
    return Promise.resolve(true);
    // return ipcRenderer.invoke(Commands.CLOSE_WALLET);
}
function getAddresses() {
    return Promise.resolve(Application2_1.app.getAddresses());
    // return ipcRenderer.invoke(Commands.WALLET_GET_ADDRESSES);
}
function getUnspent() {
    return Promise.resolve(Application2_1.app.getUnspentBoxes());
    // return ipcRenderer.invoke(Commands.WALLET_GET_UNSPENT);
}
function getTransactions() {
    return Promise.resolve(Application2_1.app.getTransactions());
    // return ipcRenderer.invoke(Commands.WALLET_GET_TRANSACTIONS);
}
function getTransaction(txId) {
    return Promise.resolve(Application2_1.app.getTransaction(txId));
    // return ipcRenderer.invoke(Commands.WALLET_GET_TX, txId);
}
function createTransaction(spendingBoxes, recipient, amount, fee, tokenId) {
    return Application2_1.app.createTx(spendingBoxes, recipient, amount, fee, tokenId);
    // return ipcRenderer.invoke(Commands.WALLET_CREATE_TX, spendingBoxes, recipient, amount, fee, tokenId);
}
function signTransaction(tx) {
    return Application2_1.app.signTx(tx);
    // return ipcRenderer.invoke(Commands.WALLET_SIGN_TX, tx);
}
function sendTransaction(ergoTx) {
    return Application2_1.app.sendTx(ergoTx);
    // return ipcRenderer.invoke(Commands.WALLET_SEND_TX, ergoTx);
}
