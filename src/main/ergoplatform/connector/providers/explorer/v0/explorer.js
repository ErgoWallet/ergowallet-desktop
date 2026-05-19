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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerClient = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var ExplorerClient = /** @class */ (function () {
    function ExplorerClient(baseUri) {
        this.baseUri = baseUri;
    }
    ExplorerClient.prototype.getLatestBlockHeaders = function (num) {
        throw new Error("Method not implemented.");
    };
    ExplorerClient.prototype.sendTransaction = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var broadcastingTx, url, options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broadcastingTx = {
                            inputs: tx.inputs,
                            dataInputs: tx.dataInputs,
                            outputs: tx.outputs
                        };
                        url = "".concat(this.baseUri, "/transactions/send");
                        options = {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(broadcastingTx)
                        };
                        return [4 /*yield*/, ExplorerClient.api(url, options)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    ExplorerClient.prototype.getLatestBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUri, "/blocks");
                        return [4 /*yield*/, ExplorerClient.api(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                height: response.total,
                                id: ''
                            }];
                }
            });
        });
    };
    ExplorerClient.prototype.getBlocks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.baseUri, "/blocks");
                return [2 /*return*/, ExplorerClient.api(url)];
            });
        });
    };
    ExplorerClient.prototype.getUnspentOutputs = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.baseUri, "/transactions/boxes/byAddress/unspent/").concat(address);
                return [2 /*return*/, ExplorerClient.api(url)];
            });
        });
    };
    ExplorerClient.prototype.getAddressSummary = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUri, "/addresses/").concat(address);
                        return [4 /*yield*/, ExplorerClient.api(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: response.summary.id,
                                confirmedTransactions: response.transactions.confirmed
                            }];
                }
            });
        });
    };
    ExplorerClient.prototype.getAddressTransactions = function (address_1) {
        return __awaiter(this, arguments, void 0, function (address, offset, limit) {
            var url;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                url = "".concat(this.baseUri, "/addresses/").concat(address, "/transactions?offset=").concat(offset, "&limit=").concat(limit);
                return [2 /*return*/, ExplorerClient.api(url)];
            });
        });
    };
    ExplorerClient.prototype.getUnconfirmedTransactions = function (address_1) {
        return __awaiter(this, arguments, void 0, function (address, offset, limit) {
            var url;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                url = "".concat(this.baseUri, "/transactions/unconfirmed/byAddress/").concat(address, "?offset=").concat(offset, "&limit=").concat(limit);
                return [2 /*return*/, ExplorerClient.api(url)];
            });
        });
    };
    ExplorerClient.prototype.getUnconfirmed = function (txId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.baseUri, "/transactions/unconfirmed/").concat(txId);
                return [2 /*return*/, ExplorerClient.api(url)];
            });
        });
    };
    ExplorerClient.api = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1.default)(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        body = _a.sent();
                        console.error(url);
                        console.error(body);
                        throw new Error("".concat(response.status, ": ").concat(response.statusText));
                    case 3: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return ExplorerClient;
}());
exports.ExplorerClient = ExplorerClient;
