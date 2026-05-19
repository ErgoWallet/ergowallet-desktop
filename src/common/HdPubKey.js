"use strict";
//const {Address, parseHdPath} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdPubKey = exports.KeyState = void 0;
var KeyState;
(function (KeyState) {
    KeyState["Clean"] = "clean";
    KeyState["Used"] = "used";
})(KeyState || (exports.KeyState = KeyState = {}));
var HdPubKey = /** @class */ (function () {
    function HdPubKey(publicKey, index, fullHdPath, internal, address) {
        //FIXME parseHdPath(fullHdPath);
        // const pathIndices = []; 
        // this.internal = pathIndices[3] > 0;
        this.internal = internal;
        this.publicKey = publicKey;
        this.index = index;
        this.hdPath = fullHdPath;
        this.state = KeyState.Clean;
        this.address = address;
    }
    HdPubKey.prototype.setState = function (state) {
        this.state = state;
    };
    HdPubKey.prototype.pubKey = function () {
        return this.publicKey;
    };
    return HdPubKey;
}());
exports.HdPubKey = HdPubKey;
