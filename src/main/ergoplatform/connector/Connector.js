"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
/*
  Connector to Ergo blockchain.
  It uses different providers as a transport and etc.
 */
var Connector = /** @class */ (function () {
    function Connector(provider) {
        this.provider = provider;
    }
    Connector.prototype.getBlocks = function () {
        return this.provider.getBlocks();
    };
    Connector.prototype.getLatestBlockHeaders = function (num) {
        return this.provider.getLatestBlockHeaders(num);
    };
    Connector.prototype.getUnspentOutputs = function (address) {
        return this.provider.getUnspentOutputs(address);
    };
    Connector.prototype.getAddressSummary = function (address) {
        return this.provider.getAddressSummary(address);
    };
    Connector.prototype.getAddressTransactions = function (address, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 100; }
        return this.provider.getAddressTransactions(address, offset, limit);
    };
    Connector.prototype.sendTransaction = function (tx) {
        return this.provider.sendTransaction(tx);
    };
    Connector.prototype.getUnconfirmed = function (txId) {
        return this.provider.getUnconfirmed(txId);
    };
    Connector.prototype.getUnconfirmedTransactions = function (address, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 100; }
        return this.provider.getUnconfirmedTransactions(address, offset, limit);
    };
    return Connector;
}());
exports.Connector = Connector;
