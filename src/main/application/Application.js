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
var vault = __importStar(require("./ipc-handlers/vault"));
var wallet = __importStar(require("./ipc-handlers/wallet"));
var app = __importStar(require("./ipc-handlers/app"));
var Connector_1 = require("../ergoplatform/connector/Connector");
var explorer_1 = require("../ergoplatform/connector/providers/explorer/v1/explorer");
var explorer_2 = require("../ergoplatform/connector/providers/explorer/v0/explorer");
var Vault_1 = require("./services/vault/Vault");
var WalletImpl_1 = require("./services/wallet/WalletImpl");
var BlockchainService_1 = require("./services/blockchain/BlockchainService");
var UpdateService_1 = require("./services/updater/UpdateService");
var events_1 = require("events");
var ElectronSettings_1 = __importDefault(require("./ElectronSettings"));
var lodash_1 = __importDefault(require("lodash"));
var logger_1 = __importDefault(require("./logger"));
var WasmSigner_1 = __importDefault(require("./services/wallet/WasmSigner"));
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(userDataDir) {
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
        });
        _this.updater = new UpdateService_1.UpdateService();
        _this.updater.on(UpdateService_1.UpdateService.CURRENT_VERSION_EVENT, function (event) {
            var latestVer = event.tag_name ? lodash_1.default.trimStart(event.tag_name, "v") : null;
            logger_1.default.debug("Latest version: ".concat(latestVer));
            _this.emit(Application.APP_LATEST_VERSION, latestVer);
        });
        return _this;
    }
    Application.prototype.start = function () {
        if (this.started) {
            return;
        }
        this.blockchain.start();
        this.updater.start();
        this.setIpcHandlers();
        // Load settings
        this.settings = new ElectronSettings_1.default();
        this.emit(Application.APP_READY_EVENT);
        this.started = true;
    };
    Application.prototype.stop = function () {
        this.updater.stop();
        this.blockchain.stop();
        this.blockchain.removeAllListeners(BlockchainService_1.BlockchainService.HEIGHT_CHANGED_EVENT);
        this.closeCurrentWallet();
    };
    Application.prototype.setIpcHandlers = function () {
        vault.setHandlers(this);
        wallet.setHandlers(this);
        app.setHandlers(this);
    };
    Application.prototype.generateMnemonic = function () {
        return '';
        // return bip39.generateMnemonic(128);
    };
    Application.prototype.getWallets = function () {
        return this.vault.getWallets();
    };
    Application.prototype.isWalletExists = function (walletName) {
        var wallet = this.vault.getWalletData(walletName);
        return !!wallet;
    };
    Application.prototype.importPrivateKey = function (walletName, privateKey, walletPassword) {
        return this.vault.importPrivateKey(walletName, privateKey, walletPassword);
    };
    Application.prototype.importWallet = function (walletName, mnemonic, passphrase, walletPassword) {
        return this.vault.importWallet(walletName, mnemonic, passphrase, walletPassword);
    };
    Application.prototype.loadWallet = function (walletName, walletPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var bip39Data, wallet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bip39Data = this.vault.getWalletData(walletName);
                        logger_1.default.info("Loading wallet [".concat(walletName, "]"));
                        return [4 /*yield*/, (0, WalletImpl_1.buildWallet)(bip39Data, this.connector, new WasmSigner_1.default())];
                    case 1:
                        wallet = _a.sent();
                        wallet.on(WalletImpl_1.WalletImpl.UPDATED_EVENT, function () {
                            _this.emit('WalletUpdated');
                        });
                        wallet.on(WalletImpl_1.WalletImpl.TXS_LOADING, function (isLoading) {
                            logger_1.default.debug("Received WalletImpl.TXS_LOADING:".concat(isLoading));
                            _this.emit('WalletHistoryLoading', isLoading);
                        });
                        wallet.on(WalletImpl_1.WalletImpl.UNSPENT_LOADING, function (isLoading) {
                            _this.emit('WalletUnspentLoading', isLoading);
                        });
                        this.currentWallet = wallet;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Application.prototype.getAddresses = function () {
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
    Application.prototype.getUnspentBoxes = function () {
        if (this.currentWallet == null) {
            return [];
        }
        return this.currentWallet.getUnspentBoxes();
    };
    Application.prototype.getTransactions = function () {
        if (this.currentWallet != null) {
            return this.currentWallet
                .getAllTransactions()
                .map(function (tx) { return (__assign(__assign({}, tx), { inputs: [], outputs: [] })); });
        }
        return [];
    };
    Application.prototype.getTransaction = function (txId) {
        if (this.currentWallet != null) {
            return this.currentWallet.getTransaction(txId);
        }
        return null;
    };
    Application.prototype.closeCurrentWallet = function () {
        var _a;
        (_a = this.currentWallet) === null || _a === void 0 ? void 0 : _a.close();
        this.currentWallet = null;
    };
    Application.prototype.validateAddress = function (address) {
        if (this.currentWallet != null) {
            return this.currentWallet.validateAddress(address);
        }
        return Promise.resolve(null);
    };
    Application.prototype.createTx = function (spendingBoxes, recipient, amount, fee, tokenId) {
        if (this.currentWallet != null) {
            var height = this.blockchain.currentHeight;
            if (!height) {
                throw new Error('Current height is undefined');
            }
            return this.currentWallet.createTransaction(spendingBoxes, recipient, amount, fee, tokenId, height);
        }
        throw new Error('There is no loaded wallet');
    };
    Application.prototype.signTx = function (tx) {
        if (this.currentWallet != null) {
            return this.currentWallet.signTransaction(tx, []);
        }
        throw new Error('There is no loaded wallet');
    };
    Application.prototype.sendTx = function (tx) {
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
    Application.prototype.getSettings = function () {
        return this.settings.data();
    };
    Application.prototype.updateSettings = function (settings) {
        logger_1.default.debug('Updating settings: ' + JSON.stringify(settings));
        this.settings.update(settings);
        this.emit('SettingsUpdated');
    };
    Application.APP_READY_EVENT = 'AppReady';
    Application.APP_LATEST_VERSION = 'LatestVersion';
    return Application;
}(events_1.EventEmitter));
exports.default = Application;
