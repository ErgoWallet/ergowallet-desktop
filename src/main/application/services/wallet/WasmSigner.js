"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var _a = require("@ergowallet/ergowallet-wasm/ergowallet_wasm"), KeyManager = _a.KeyManager, Address = _a.Address, Transaction = _a.Transaction;
var WasmSigner = /** @class */ (function () {
    function WasmSigner() {
    }
    WasmSigner.prototype.signTx = function (privateKeys, boxesToSpend, ergoTx, headers) {
        if (headers === void 0) { headers = null; }
        var signed = Transaction
            .sign(privateKeys, boxesToSpend, ergoTx)
            .to_json();
        // console.log('Signed TX: ' + JSON.stringify(signed));
        return signed;
    };
    WasmSigner.prototype.validateAddress = function (address) {
        return Address.validate(address);
    };
    return WasmSigner;
}());
exports.default = WasmSigner;
;
