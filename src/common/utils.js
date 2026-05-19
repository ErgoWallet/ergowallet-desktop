"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromErg = fromErg;
exports.isHexString = isHexString;
exports.toHexString = toHexString;
var MoneyUnits_1 = require("./MoneyUnits");
/**
 * Build MoneyUnits converting ERG into base units (nanoERG)
 * @param erg
 */
function fromErg(erg) {
    return MoneyUnits_1.MoneyUnits.fromMainUnits(erg, 9);
}
function isHexString(value) {
    if ((value === '') || (value === undefined))
        return false;
    var val = value.substring(0, 2) === '0x' ? value.substring(2) : value;
    return /^[0-9A-Fa-f]+$/.test(val);
}
function toHexString(bytes) {
    return Array.from(bytes, function (byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
}
;
