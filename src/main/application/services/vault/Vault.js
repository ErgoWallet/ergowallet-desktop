"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vault = void 0;
var Vault = /** @class */ (function () {
    function Vault(dataDir) {
        this.wallets = new Map();
        console.debug("Vault directory: ".concat(dataDir));
        this.dataDir = dataDir;
    }
    Vault.prototype.getWallets = function () {
        return Array.from(this.wallets.keys());
    };
    Vault.prototype.importWallet = function (name, mnemonic, passphrase, password) {
        if (this.wallets.get(name)) {
            throw new Error("Wallet with such name already exists");
        }
        this.wallets.set(name, { mnemonic: mnemonic, passphrase: passphrase });
    };
    Vault.prototype.importPrivateKey = function (name, privateKey, password) {
        if (this.wallets.get(name)) {
            throw new Error("Wallet with such name already exists");
        }
        this.wallets.set(name, { privateKey: privateKey });
    };
    Vault.prototype.getWalletData = function (walletName) {
        var found = this.wallets.get(walletName);
        if (!found) {
            return null;
        }
        return found;
    };
    return Vault;
}());
exports.Vault = Vault;
