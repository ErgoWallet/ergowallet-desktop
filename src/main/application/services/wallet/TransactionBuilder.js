"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MoneyUnits_1 = require("../../../../common/MoneyUnits");
var utils_1 = require("../../../../common/utils");
var constants_1 = require("../../../../common/constants");
var ErgoBoxSet_1 = require("../../../../common/ErgoBoxSet");
var core_1 = require("@tauri-apps/api/core");
var TransactionBuilder = /** @class */ (function () {
    function TransactionBuilder(unspentBoxes, ergoContext) {
        this.unspentBoxes = unspentBoxes;
        this.ergoContext = ergoContext;
    }
    TransactionBuilder.prototype.createErgTx = function (spendingBoxes, recipient, amount, fee, changeAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var spendingErgAmount, feeAmount, tx, totalErgAvailable, change, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        spendingErgAmount = MoneyUnits_1.MoneyUnits.fromMainUnits(amount, 9);
                        feeAmount = (0, utils_1.fromErg)(fee);
                        tx = {
                            fee: feeAmount.amount,
                            inputs: spendingBoxes.map(function (box) { return ({ boxId: box.boxId }); }),
                            outputs: []
                        };
                        totalErgAvailable = spendingBoxes.reduce(function (total, item) { return total.plus(new MoneyUnits_1.MoneyUnits(item.value, 9)); }, new MoneyUnits_1.MoneyUnits(0, 9));
                        // For each input which holds tokens we create separate output
                        spendingBoxes.forEach(function (inputBox) {
                            if (inputBox.assets && inputBox.assets.length > 0) {
                                tx.outputs.push({
                                    address: inputBox.address,
                                    value: constants_1.minBoxValue.toString(),
                                    assets: Array.from(inputBox.assets)
                                });
                                totalErgAvailable = totalErgAvailable.minus(new MoneyUnits_1.MoneyUnits(constants_1.minBoxValue, 9));
                            }
                        });
                        change = totalErgAvailable
                            .minus(spendingErgAmount)
                            .minus(feeAmount);
                        if (change.isNegative()) {
                            throw new Error('Not enough ERG');
                        }
                        // Change
                        if (change.isPositive()) {
                            tx.outputs.push({
                                assets: [],
                                address: changeAddress,
                                value: change.amount
                            });
                        }
                        // Recipient output
                        tx.outputs.push({
                            assets: [],
                            address: recipient,
                            value: spendingErgAmount.amount
                        });
                        // const unsigned = Transaction.create(
                        //   tx.inputs,
                        //   tx.outputs,
                        //   BigInt(feeAmount.amount),
                        //   this.ergoContext.height
                        // );
                        _a = tx;
                        return [4 /*yield*/, (0, core_1.invoke)("create_tx", {
                                inputs: tx.inputs,
                                outputs: tx.outputs,
                                feeAmount: feeAmount.amount,
                                height: this.ergoContext.height
                            })];
                    case 1:
                        // const unsigned = Transaction.create(
                        //   tx.inputs,
                        //   tx.outputs,
                        //   BigInt(feeAmount.amount),
                        //   this.ergoContext.height
                        // );
                        _a.ergoTx = _b.sent();
                        return [2 /*return*/, Promise.resolve(tx)];
                }
            });
        });
    };
    TransactionBuilder.prototype.createTokenTx = function (spendingBoxes, recipient, amount, fee, changeAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var feeAmount, tx, inputSet, totalErgAvailable, tokenAvailable, recipientTokenAmount, changeTokens, tokenChange, recipientErgAmount, changeErg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        feeAmount = (0, utils_1.fromErg)(fee);
                        tx = {
                            fee: feeAmount.amount,
                            inputs: spendingBoxes.map(function (box) { return ({ boxId: box.boxId }); }),
                            outputs: []
                        };
                        inputSet = new ErgoBoxSet_1.ErgoBoxSet(spendingBoxes);
                        totalErgAvailable = new MoneyUnits_1.MoneyUnits(inputSet.balance('ERG').toString(), 9);
                        tokenAvailable = new MoneyUnits_1.MoneyUnits(inputSet.balance(tokenId), 0);
                        recipientTokenAmount = MoneyUnits_1.MoneyUnits.fromMainUnits(amount, 0);
                        if (tokenAvailable.lessThen(recipientTokenAmount)) {
                            throw new Error('Not enough token amount');
                        }
                        changeTokens = [];
                        inputSet.filter(function (id, balance) { return (id !== 'ERG' && tokenId !== id); }).forEach(function (balance, id) {
                            changeTokens.push({
                                tokenId: id,
                                amount: balance.toString()
                            });
                        });
                        tokenChange = tokenAvailable.minus(recipientTokenAmount);
                        if (tokenChange.isPositive()) {
                            changeTokens.push({
                                tokenId: tokenId,
                                amount: tokenChange.amount
                            });
                        }
                        recipientErgAmount = new MoneyUnits_1.MoneyUnits(constants_1.minBoxValue, 9);
                        changeErg = totalErgAvailable
                            .minus(recipientErgAmount)
                            .minus(feeAmount);
                        if (changeErg.isNegative()) {
                            throw new Error('Not enough ERG');
                        }
                        // Change
                        if (changeErg.isPositive()) {
                            tx.outputs.push({
                                assets: changeTokens,
                                address: changeAddress,
                                value: changeErg.amount
                            });
                        }
                        if (changeErg.isZero() && changeTokens.length > 0) {
                            throw new Error('Not enough ERG for tokens change ouputs');
                        }
                        // Recipient output
                        tx.outputs.push({
                            assets: [{ tokenId: tokenId, amount: recipientTokenAmount.amount }],
                            address: recipient,
                            value: recipientErgAmount.amount
                        });
                        // tx.ergoTx = Transaction.create(
                        //   tx.inputs,
                        //   tx.outputs,
                        //   BigInt(feeAmount.amount),
                        //   this.ergoContext.height
                        // ).to_json();
                        // return tx;
                        _a = tx;
                        return [4 /*yield*/, (0, core_1.invoke)("create_tx", {
                                inputs: tx.inputs,
                                outputs: tx.outputs,
                                feeAmount: feeAmount.amount,
                                height: this.ergoContext.height
                            })];
                    case 1:
                        // tx.ergoTx = Transaction.create(
                        //   tx.inputs,
                        //   tx.outputs,
                        //   BigInt(feeAmount.amount),
                        //   this.ergoContext.height
                        // ).to_json();
                        // return tx;
                        _a.ergoTx = _b.sent();
                        return [2 /*return*/, Promise.resolve(tx)];
                }
            });
        });
    };
    TransactionBuilder.prototype.create = function (spendingBoxes, recipient, amount, fee, changeAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var fromBoxes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assertAddress(recipient, "Invalid recipient address ".concat(recipient))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assertAddress(changeAddress, "Invalid change address ".concat(changeAddress))];
                    case 2:
                        _a.sent();
                        fromBoxes = new Array();
                        spendingBoxes.forEach(function (id) {
                            var box = _this.unspentBoxes.get(id);
                            if (box) {
                                fromBoxes.push(box);
                            }
                            else {
                                throw new Error("Unspent box ".concat(id, " not found"));
                            }
                        });
                        if (tokenId === 'ERG') {
                            return [2 /*return*/, this.createErgTx(fromBoxes, recipient, amount, fee, changeAddress, tokenId)];
                        }
                        return [2 /*return*/, this.createTokenTx(fromBoxes, recipient, amount, fee, changeAddress, tokenId)];
                }
            });
        });
    };
    TransactionBuilder.prototype.assertAddress = function (address, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, core_1.invoke)("validate_address", { address: address })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TransactionBuilder;
}());
exports.default = TransactionBuilder;
