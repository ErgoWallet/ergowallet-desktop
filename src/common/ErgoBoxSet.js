"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErgoBoxSet = void 0;
var ErgoBoxSet = /** @class */ (function () {
    function ErgoBoxSet(boxes) {
        var _this = this;
        this.balances = new Map();
        this.boxes = Array.from(boxes);
        // Calculate balances balances
        var ergValue = BigInt(0);
        this.boxes.forEach(function (box) {
            ergValue += BigInt(box.value);
            box.assets.forEach(function (a) {
                var amount = _this.balances.get(a.tokenId);
                amount = (amount || BigInt(0)) + BigInt(a.amount);
                _this.balances.set(a.tokenId, amount);
            });
        });
        this.balances.set('ERG', ergValue);
    }
    ErgoBoxSet.prototype.assetsIds = function () {
        return Array.from(this.balances.keys());
    };
    ErgoBoxSet.prototype.balance = function (tokenId) {
        return this.balances.get(tokenId) || BigInt(0);
    };
    ErgoBoxSet.prototype.filter = function (f) {
        var result = new Map();
        this.balances.forEach(function (value, key) {
            if (f(key, value)) {
                result.set(key, value);
            }
        });
        return result;
    };
    return ErgoBoxSet;
}());
exports.ErgoBoxSet = ErgoBoxSet;
