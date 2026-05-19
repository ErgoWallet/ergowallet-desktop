"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TauriSigner = /** @class */ (function () {
    function TauriSigner() {
    }
    TauriSigner.prototype.signTx = function (privateKeys, boxesToSpend, ergoTx, headers) {
        throw new Error("Method not implemented.");
    };
    TauriSigner.prototype.validateAddress = function (address) {
        throw new Error("Method not implemented.");
    };
    return TauriSigner;
}());
exports.default = TauriSigner;
