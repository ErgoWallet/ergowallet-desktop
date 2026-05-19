"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyManager = void 0;
var bip39 = __importStar(require("./bip39"));
var HdPubKey_1 = require("./HdPubKey");
var bip32_1 = require("@scure/bip32");
var utils_1 = require("./utils");
var core_1 = require("@tauri-apps/api/core");
var KeyManager = /** @class */ (function () {
    function KeyManager(masterKey) {
        this.hdPubKeys = [];
        this.extMasterKey = masterKey;
        this.accountExtPubKey = masterKey
            .derive(KeyManager.AccountDerivationPath)
            .wipePrivateData();
        this.watchOnly = (masterKey.privateKey === undefined);
    }
    KeyManager.recover = function (mnemonic, passphrase) {
        return __awaiter(this, void 0, void 0, function () {
            var seed, masterKey, km;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
                        masterKey = bip32_1.HDKey.fromMasterSeed(seed);
                        km = new KeyManager(masterKey);
                        return [4 /*yield*/, km.assertCleanKeys()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, km];
                }
            });
        });
    };
    KeyManager.prototype.allKeys = function () {
        return this.hdPubKeys;
    };
    /**
     * Mark key for address as used
     * @param address
     */
    KeyManager.prototype.markUsed = function (address) {
        var key = this.getKey(address);
        if (key) {
            var index = this.hdPubKeys.indexOf(key);
            this.hdPubKeys[index].setState(HdPubKey_1.KeyState.Used);
        }
        else {
            throw new Error("Key for address ".concat(address, " not found"));
        }
    };
    KeyManager.prototype.getKey = function (address) {
        return this.hdPubKeys.find(function (key) { return key.address === address; });
    };
    KeyManager.prototype.getKeys = function (state, internal) {
        return this.hdPubKeys.filter(function (k) { return k.state === state && k.internal === internal; });
    };
    /**
     * Returns next unused key for change
     */
    KeyManager.prototype.getNextChangeKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assertCleanKeys()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getKeys(HdPubKey_1.KeyState.Clean, true)[0]];
                }
            });
        });
    };
    /**
     * Make sure there's always clean keys generated.
     */
    KeyManager.prototype.assertCleanKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.getKeys(HdPubKey_1.KeyState.Clean, false).length < 21)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.generateNewKey(false)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2:
                        if (!(this.getKeys(HdPubKey_1.KeyState.Clean, true).length < 21)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateNewKey(true)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KeyManager.prototype.getSecretKey = function (address) {
        // find HD Public Key
        var hdPubKey = this.getKey(address);
        var hdPath = hdPubKey.hdPath;
        var bip32Interface = this.extMasterKey.derive(hdPath);
        return bip32Interface.privateKey;
    };
    KeyManager.prototype.generateNewKey = function () {
        return __awaiter(this, arguments, void 0, function (internal) {
            var change, path, relevantKeys, index, largestIndex, hdKey, addr, newKey;
            if (internal === void 0) { internal = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        change = internal ? 1 : 0;
                        path = "".concat(change, "/0");
                        relevantKeys = this.hdPubKeys.filter(function (key) { return key.internal === internal; });
                        index = 0;
                        if (relevantKeys.length > 0) {
                            largestIndex = this.maxKeyIndex(relevantKeys);
                            // TODO: detect gaps by finding smallest indexes and etc
                            index = largestIndex + 1;
                        }
                        path = "".concat(change, "/").concat(index);
                        hdKey = this.accountExtPubKey.deriveChild(change).deriveChild(index);
                        return [4 /*yield*/, (0, core_1.invoke)('pk2address', { pubKey: (0, utils_1.toHexString)(hdKey.publicKey) })];
                    case 1:
                        addr = _a.sent();
                        newKey = new HdPubKey_1.HdPubKey(hdKey.publicKey, hdKey.index, "".concat(KeyManager.AccountDerivationPath, "/").concat(path), internal, addr);
                        this.hdPubKeys.push(newKey);
                        return [2 /*return*/, newKey];
                }
            });
        });
    };
    KeyManager.prototype.maxKeyIndex = function (keys) {
        var max = 0;
        keys.forEach(function (key) {
            if (key.index > max) {
                max = key.index;
            }
        });
        return max;
    };
    KeyManager.AccountDerivationPath = "m/44'/429'/0'";
    return KeyManager;
}());
exports.KeyManager = KeyManager;
