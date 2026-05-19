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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.app = exports.Application2 = void 0;
// import * as vault from './ipc-handlers/vault';
// import * as wallet from './ipc-handlers/wallet';
// import * as app from './ipc-handlers/app';
var Connector_1 = require("../ergoplatform/connector/Connector");
var explorer_1 = require("../ergoplatform/connector/providers/explorer/v1/explorer");
var explorer_2 = require("../ergoplatform/connector/providers/explorer/v0/explorer");
var Vault_1 = require("./services/vault/Vault");
var WalletImpl_1 = require("./services/wallet/WalletImpl");
var BlockchainService_1 = require("./services/blockchain/BlockchainService");
var UpdateService_1 = require("./services/updater/UpdateService");
var events_1 = require("events");
var TauriSettings_1 = __importDefault(require("./TauriSettings"));
var lodash_1 = __importDefault(require("lodash"));
var logger_1 = __importDefault(require("./logger"));
var TauriSigner_1 = __importDefault(require("./services/wallet/TauriSigner"));
var bip39 = __importStar(require("../../common/bip39"));
var Application2 = /** @class */ (function (_super) {
    __extends(Application2, _super);
    function Application2(userDataDir) {
        var _this = _super.call(this) || this;
        _this.baseUri = "https://api.ergoplatform.com/api/v0";
        _this.baseUriV1 = "https://api.ergoplatform.com/api/v1";
        _this.currentWallet = null;
        _this.userDataDir = userDataDir;
        _this.vault = new Vault_1.Vault(userDataDir);
        _this.started = false;
        _this.connector = new Connector_1.Connector(new explorer_1.ExplorerClient(_this.baseUriV1));
        _this.connectorV0 = new Connector_1.Connector(new explorer_2.ExplorerClient(_this.baseUri));
        _this.blockchain = new BlockchainService_1.BlockchainService(_this.connector);
        _this.blockchain.on(BlockchainService_1.BlockchainService.HEIGHT_CHANGED_EVENT, function (event) {
            logger_1.default.debug(JSON.stringify(event));
            _this.emit(Application2.CURRENT_HEIGHT_UPDATED, event);
        });
        _this.updater = new UpdateService_1.UpdateService();
        _this.updater.on(UpdateService_1.UpdateService.CURRENT_VERSION_EVENT, function (event) {
            var latestVer = event.tag_name ? lodash_1.default.trimStart(event.tag_name, "v") : null;
            logger_1.default.debug("Latest version: ".concat(latestVer));
            _this.emit(Application2.APP_LATEST_VERSION, latestVer);
        });
        return _this;
    }
    Application2.prototype.start = function () {
        if (this.started) {
            return;
        }
        this.blockchain.start();
        this.updater.start();
        this.setIpcHandlers();
        // Load settings
        this.settings = new TauriSettings_1.default();
        this.emit(Application2.APP_READY_EVENT);
        this.started = true;
    };
    Application2.prototype.stop = function () {
        this.updater.stop();
        this.blockchain.stop();
        this.blockchain.removeAllListeners(BlockchainService_1.BlockchainService.HEIGHT_CHANGED_EVENT);
        this.closeCurrentWallet();
    };
    Application2.prototype.setIpcHandlers = function () {
        // vault.setHandlers(this);
        // wallet.setHandlers(this);
        // app.setHandlers(this);
    };
    Application2.prototype.generateMnemonic = function () {
        return bip39.generateMnemonic();
    };
    Application2.prototype.getWallets = function () {
        return this.vault.getWallets();
    };
    Application2.prototype.isWalletExists = function (walletName) {
        var wallet = this.vault.getWalletData(walletName);
        return !!wallet;
    };
    Application2.prototype.importPrivateKey = function (walletName, privateKey, walletPassword) {
        return this.vault.importPrivateKey(walletName, privateKey, walletPassword);
    };
    Application2.prototype.importWallet = function (walletName, mnemonic, passphrase, walletPassword) {
        return this.vault.importWallet(walletName, mnemonic, passphrase, walletPassword);
    };
    Application2.prototype.loadWallet = function (walletName, walletPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var bip39Data, wallet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bip39Data = this.vault.getWalletData(walletName);
                        logger_1.default.info("Loading wallet [".concat(walletName, "]"));
                        return [4 /*yield*/, (0, WalletImpl_1.buildWallet)(bip39Data, this.connector, new TauriSigner_1.default())];
                    case 1:
                        wallet = _a.sent();
                        wallet.on(WalletImpl_1.WalletImpl.UPDATED_EVENT, function () {
                            _this.emit(Application2.WALLET_UPDATED);
                        });
                        wallet.on(WalletImpl_1.WalletImpl.TXS_LOADING, function (isLoading) {
                            logger_1.default.debug("Received WalletImpl.TXS_LOADING:".concat(isLoading));
                            _this.emit(Application2.TXS_LOADING, isLoading);
                        });
                        wallet.on(WalletImpl_1.WalletImpl.UNSPENT_LOADING, function (isLoading) {
                            _this.emit(Application2.UNSPENT_LOADING, isLoading);
                        });
                        this.currentWallet = wallet;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Application2.prototype.getAddresses = function () {
        if (this.currentWallet != null) {
            var addresses = this.currentWallet.getAddresses();
            var txs = this.currentWallet.getAllTransactions();
            // ===============================
            // Calculate tx counts per address
            var addrMap_1 = addresses.reduce(function (m, addr) {
                m[addr.address] = addr;
                return m;
            }, {});
            txs.forEach(function (tx) {
                var uniq = {};
                tx.inputs.forEach(function (i) { return uniq[i.address] = true; });
                tx.outputs.forEach(function (o) { return uniq[o.address] = true; });
                Object.keys(uniq).forEach(function (a) {
                    if (addrMap_1[a]) {
                        addrMap_1[a].txCount = (addrMap_1[a].txCount || 0) + 1;
                    }
                });
            });
            return Object.values(addrMap_1);
            // ===============================
        }
        return [];
    };
    Application2.prototype.getUnspentBoxes = function () {
        if (this.currentWallet == null) {
            return [];
        }
        return this.currentWallet.getUnspentBoxes();
    };
    Application2.prototype.getTransactions = function () {
        if (this.currentWallet != null) {
            return this.currentWallet
                .getAllTransactions()
                .map(function (tx) { return (__assign(__assign({}, tx), { inputs: [], outputs: [] })); });
        }
        return [];
    };
    Application2.prototype.getTransaction = function (txId) {
        if (this.currentWallet != null) {
            return this.currentWallet.getTransaction(txId);
        }
        return null;
    };
    Application2.prototype.closeCurrentWallet = function () {
        var _a;
        (_a = this.currentWallet) === null || _a === void 0 ? void 0 : _a.close();
        this.currentWallet = null;
    };
    Application2.prototype.validateAddress = function (address) {
        if (this.currentWallet != null) {
            return this.currentWallet.validateAddress(address);
        }
        return Promise.resolve(null);
    };
    Application2.prototype.createTx = function (spendingBoxes, recipient, amount, fee, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var height;
            return __generator(this, function (_a) {
                if (this.currentWallet != null) {
                    height = this.blockchain.currentHeight;
                    if (!height) {
                        throw new Error('Current height is undefined');
                    }
                    return [2 /*return*/, this.currentWallet.createTransaction(spendingBoxes, recipient, amount, fee, tokenId, height)];
                }
                throw new Error('There is no loaded wallet');
            });
        });
    };
    Application2.prototype.signTx = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var lastHeaders;
            return __generator(this, function (_a) {
                if (this.currentWallet != null) {
                    lastHeaders = this.blockchain.lastHeaders;
                    return [2 /*return*/, this.currentWallet.signTransaction(tx, lastHeaders)];
                }
                throw new Error('There is no loaded wallet');
            });
        });
    };
    Application2.prototype.sendTx = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var txId, unconfirmedTx, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connector.sendTransaction(tx)];
                    case 1:
                        txId = _a.sent();
                        if (!(this.currentWallet != null)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.connectorV0.getUnconfirmed(txId)];
                    case 3:
                        unconfirmedTx = _a.sent();
                        this.currentWallet.processTransactions([unconfirmedTx]);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        // this is not critical error, tx will be obtained later
                        console.warn(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, txId];
                }
            });
        });
    };
    Application2.prototype.getSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.settings.data()];
            });
        });
    };
    Application2.prototype.updateSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.settings.update(settings)];
                    case 1:
                        _a.sent();
                        this.emit(Application2.SETTINGS_UPDATED);
                        return [2 /*return*/];
                }
            });
        });
    };
    Application2.APP_READY_EVENT = 'AppReady';
    Application2.APP_LATEST_VERSION = 'LatestVersion';
    Application2.CURRENT_HEIGHT_UPDATED = 'LatestBlockUpdated';
    Application2.WALLET_UPDATED = 'WalletUpdated';
    Application2.UNSPENT_LOADING = 'WalletUnspentLoading';
    Application2.TXS_LOADING = 'WalletHistoryLoading';
    Application2.SETTINGS_UPDATED = "SettingsUpdated";
    return Application2;
}(events_1.EventEmitter));
exports.Application2 = Application2;
/** Core application */
var app = new Application2('FIXME');
exports.app = app;
