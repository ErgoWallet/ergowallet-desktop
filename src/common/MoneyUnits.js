"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyUnits = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var BIG_INT_ZERO = BigInt(0);
var MoneyUnits = /** @class */ (function () {
    /**
     *
     * @param amount base (usually smallest) units such as satoshi or nanoERG
     * @param decimals
     */
    function MoneyUnits(amount, decimals) {
        if (typeof amount === 'bigint') {
            this.amount = amount.toString();
        }
        else {
            this.amount = (typeof amount === 'string') ? amount : amount.toFixed(0);
        }
        // Try convert amount to bigint
        BigInt(this.amount);
        this.decimals = decimals;
    }
    /**
     * Example: Converts 0.0123 ERG to 12300000 nanoERG
     * @param value
     * @param decimals
     */
    MoneyUnits.fromMainUnits = function (value, decimals) {
        var baseInUnit = new bignumber_js_1.default(10).pow(decimals);
        var baseUnits = new bignumber_js_1.default(value).multipliedBy(baseInUnit);
        return new MoneyUnits(baseUnits.toFixed(0), decimals);
    };
    MoneyUnits.prototype.plus = function (other) {
        var result = BigInt(this.amount) + BigInt(other.amount);
        return new MoneyUnits(result.toString(), this.decimals);
    };
    MoneyUnits.prototype.minus = function (other) {
        var result = BigInt(this.amount) - BigInt(other.amount);
        return new MoneyUnits(result.toString(), this.decimals);
    };
    MoneyUnits.prototype.lessThen = function (other) {
        return BigInt(this.amount) < BigInt(other.amount);
    };
    MoneyUnits.prototype.isNegative = function () {
        return BigInt(this.amount) < BIG_INT_ZERO;
    };
    MoneyUnits.prototype.isPositive = function () {
        return BigInt(this.amount) > BIG_INT_ZERO;
    };
    MoneyUnits.prototype.isZero = function () {
        return BigInt(this.amount) === BIG_INT_ZERO;
    };
    // Convert from smallest denomination (base units) to amount of token
    MoneyUnits.prototype.toMainUnits = function () {
        var baseInUnit = new bignumber_js_1.default(10).pow(this.decimals);
        var tokens = new bignumber_js_1.default(this.amount).div(baseInUnit);
        return tokens.toFixed();
    };
    return MoneyUnits;
}());
exports.MoneyUnits = MoneyUnits;
