"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var wallet_slice_1 = __importDefault(require("../modules/wallet/wallet-slice"));
var app_slice_1 = __importDefault(require("../modules/app/app-slice"));
var rootReducer = (0, toolkit_1.combineReducers)({
    wallet: wallet_slice_1.default,
    app: app_slice_1.default,
});
exports.default = rootReducer;
