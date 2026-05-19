"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletImpl = void 0;
exports.buildWallet = buildWallet;
var UnspentMonitor_1 = require("./UnspentMonitor");
var TransactionMonitor_1 = require("./TransactionMonitor");
var KeyManager_1 = require("../../../../common/KeyManager");
var SingleKeyManager_1 = require("../../../../common/SingleKeyManager");
var TransactionBuilder_1 = __importDefault(require("./TransactionBuilder"));
var MoneyUnits_1 = require("../../../../common/MoneyUnits");
var events_1 = require("events");
var logger_1 = __importDefault(require("../../logger"));
var utils_1 = require("../../../../common/utils");
var core_1 = require("@tauri-apps/api/core");
// @ts-ignore
// const {KeyManager, Address, Transaction} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");
function buildWallet(bip39, connector, signer) {
    return __awaiter(this, void 0, void 0, function () {
        var km;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!("mnemonic" in bip39)) return [3 /*break*/, 2];
                    return [4 /*yield*/, KeyManager_1.KeyManager.recover(bip39.mnemonic, bip39.passphrase)];
                case 1:
                    km = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!bip39.privateKey) return [3 /*break*/, 4];
                    return [4 /*yield*/, SingleKeyManager_1.SingleKeyManager.recover(bip39.privateKey)];
                case 3:
                    km = _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, Promise.resolve(new WalletImpl(km, connector, signer))];
            }
        });
    });
}
var WalletImpl = /** @class */ (function (_super) {
    __extends(WalletImpl, _super);
    function WalletImpl(km, connector, signer) {
        var _this = _super.call(this) || this;
        _this.unspentBoxes = new Map();
        _this.transactions = new Map();
        _this.keyManager3 = km;
        //this._keyManager = KeyManager.recover(bip32.mnemonic);
        _this.signer = signer;
        _this.connector = connector;
        _this.unspentMonitor = new UnspentMonitor_1.UnspentMonitor(connector, _this);
        _this.transMonitor = new TransactionMonitor_1.TransactionMonitor(connector, _this);
        //TODO: may be one event with true/false ?
        _this.transMonitor.on('LoadingStarted', function () {
            _this.emit(WalletImpl.TXS_LOADING, true);
        });
        _this.transMonitor.on('LoadingFinished', function () {
            _this.emit(WalletImpl.TXS_LOADING, false);
        });
        _this.unspentMonitor.on('LoadingStarted', function () {
            _this.emit(WalletImpl.UNSPENT_LOADING, true);
        });
        _this.unspentMonitor.on('LoadingFinished', function () {
            _this.emit(WalletImpl.UNSPENT_LOADING, false);
        });
        _this.unspentMonitor.start();
        _this.transMonitor.start();
        return _this;
    }
    WalletImpl.prototype.getTransaction = function (txId) {
        return this.transactions.get(txId);
    };
    WalletImpl.prototype.signTransaction = function (tx, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var boxesToSpend, privateKeys, signed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boxesToSpend = [];
                        privateKeys = [];
                        tx.ergoTx.inputs.forEach(function (input) {
                            var box = _this.unspentBoxes.get(input.boxId);
                            var ergBox = __assign(__assign({}, box), { value: Number(box.value), assets: box.assets.map(function (a) { return ({ tokenId: a.tokenId, amount: Number(a.amount) }); }) });
                            boxesToSpend.push(ergBox);
                            var address = box.address;
                            // get private key for address
                            var privateKey = _this.keyManager3.getSecretKey(address);
                            privateKeys.push((0, utils_1.toHexString)(privateKey));
                        });
                        return [4 /*yield*/, (0, core_1.invoke)('sign_tx', {
                                secretKeys: privateKeys,
                                boxesToSpend: boxesToSpend,
                                tx: tx.ergoTx,
                                headers: headers
                            })];
                    case 1:
                        signed = _a.sent();
                        // console.log('Signed TX: ' + JSON.stringify(signed));
                        tx.ergoTx = signed;
                        return [2 /*return*/, Promise.resolve(tx)];
                }
            });
        });
    };
    WalletImpl.prototype.createTransaction = function (spendingBoxes, recipient, amount, fee, tokenId, currentHeight) {
        return __awaiter(this, void 0, void 0, function () {
            var changeKey, context, builder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyManager3.getNextChangeKey()];
                    case 1:
                        changeKey = _a.sent();
                        context = { height: currentHeight };
                        builder = new TransactionBuilder_1.default(this.unspentBoxes, context);
                        return [2 /*return*/, builder.create(spendingBoxes, recipient, amount, fee, changeKey.address, tokenId)];
                }
            });
        });
    };
    WalletImpl.prototype.getConfirmedTransactions = function (address) {
        var addressFilter = function (tx) {
            return (tx.inputs.find(function (i) { return i.address === address; }) || tx.outputs.find(function (o) { return o.address === address; })) &&
                tx.confirmationsCount > 0;
        };
        return Array.from(this.transactions.values()).filter(function (tx) { return addressFilter(tx); });
    };
    WalletImpl.prototype.addUnspent = function (box) {
        if (!this.unspentBoxes.get(box.id)) {
            logger_1.default.debug("Adding ".concat(JSON.stringify(box)));
            var foundKey = this.keyManager3.getKey(box.address);
            var addressType = "foreign";
            if (foundKey) {
                addressType = foundKey.internal ? "change" : "receive";
            }
            var walletBox = {
                boxId: box.id,
                transactionId: box.txId,
                value: box.value.toString(),
                additionalRegisters: box.additionalRegisters,
                assets: Array.from(box.assets.map(function (a) { return ({ tokenId: a.tokenId, amount: a.amount.toString() }); })),
                index: box.index,
                ergoTree: box.ergoTree,
                creationHeight: Number(box.creationHeight.toString()),
                address: box.address,
                addressType: addressType,
                spentTransactionId: box.spentTransactionId
            };
            this.unspentBoxes.set(box.id, walletBox);
            this.emit(WalletImpl.UPDATED_EVENT, {});
        }
    };
    WalletImpl.prototype.processTransactions = function (transactions) {
        var _this = this;
        transactions.forEach(function (tx) {
            var timestamp = tx.timestamp || tx.creationTimestamp;
            //TODO: Solve it!
            //@ts-ignore
            var walletTx = __assign(__assign({}, tx), { timestamp: timestamp, value: "", outputs: [] });
            tx.outputs.forEach(function (output, index) {
                var addressType = "foreign";
                // TODO: search key for ErgoTree
                var foundKey = _this.keyManager3.getKey(output.address);
                if (foundKey) {
                    addressType = foundKey.internal ? "change" : "receive";
                    _this.keyManager3.markUsed(output.address);
                }
                var walletBox = {
                    boxId: output.id,
                    transactionId: output.txId,
                    value: output.value.toString(),
                    additionalRegisters: output.additionalRegisters,
                    assets: Array.from(output.assets.map(function (a) { return ({ tokenId: a.tokenId, amount: a.amount.toString() }); })),
                    index: output.index,
                    ergoTree: output.ergoTree,
                    creationHeight: Number(output.creationHeight.toString()),
                    address: output.address,
                    addressType: addressType,
                    spentTransactionId: output.spentTransactionId
                };
                walletTx.outputs.push(walletBox);
            });
            tx.inputs.forEach(function (input) {
                // remove spent boxes from wallet
                if (tx.confirmationsCount >= 1) {
                    _this.unspentBoxes.delete(input.id);
                }
                else {
                    // Check whether input is our
                    var unspentBox = _this.unspentBoxes.get(input.id);
                    if (unspentBox) {
                        // Output has been spent in this tx
                        var updatedBox = __assign(__assign({}, unspentBox), { spentTransactionId: tx.id });
                        _this.unspentBoxes.set(input.id, updatedBox);
                    }
                }
            });
            var walletInputs = tx.inputs.filter(function (i) { return _this.keyManager3.getKey(i.address) !== undefined; });
            var walletOutputs = tx.outputs.filter(function (i) { return _this.keyManager3.getKey(i.address) !== undefined; });
            // calculate tx value regarding our wallet
            var received = walletOutputs.reduce(function (total, item) { return total.plus(new MoneyUnits_1.MoneyUnits(item.value, 9)); }, new MoneyUnits_1.MoneyUnits(0, 9));
            var spent = walletInputs.reduce(function (total, item) { return total.plus(new MoneyUnits_1.MoneyUnits(item.value, 9)); }, new MoneyUnits_1.MoneyUnits(0, 9));
            var balance = received.minus(spent);
            walletTx.value = balance.amount;
            // update tx in storage
            _this.transactions.set(tx.id, walletTx);
            _this.emit(WalletImpl.UPDATED_EVENT, {});
        });
        logger_1.default.debug("Wallet processed ".concat(transactions.length, " txs. Current hold ").concat(this.transactions.size, " txs."));
    };
    WalletImpl.prototype.getAddresses = function () {
        return this.keyManager3.allKeys().map(function (item) {
            return {
                address: item.address,
                publicKey: (0, utils_1.toHexString)(item.pubKey()),
                path: item.hdPath,
                state: item.state.toString(),
                internal: item.internal
            };
        });
    };
    WalletImpl.prototype.close = function () {
        this.unspentMonitor.stop();
        this.transMonitor.stop();
        this.removeAllListeners(WalletImpl.UPDATED_EVENT);
        this.removeAllListeners(WalletImpl.TXS_LOADING);
    };
    /**
     * Returns array sorted by Timestamp
     */
    WalletImpl.prototype.getAllTransactions = function () {
        var txs = Array.from(this.transactions.values());
        // return txs.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        return txs;
    };
    WalletImpl.prototype.getUnspentBoxes = function () {
        return Array.from(this.unspentBoxes.values());
    };
    WalletImpl.prototype.validateAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, core_1.invoke)("validate_address", { address: address })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, Promise.resolve("Invalid address")];
                        }
                        return [2 /*return*/, Promise.resolve('')];
                }
            });
        });
    };
    WalletImpl.UPDATED_EVENT = 'WalletUpdated';
    WalletImpl.TXS_LOADING = 'LoadingHistory';
    WalletImpl.UNSPENT_LOADING = 'LoadingUnspent';
    return WalletImpl;
}(events_1.EventEmitter));
exports.WalletImpl = WalletImpl;
