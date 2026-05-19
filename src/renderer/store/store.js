"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppDispatch = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var root_reducer_1 = __importDefault(require("./root-reducer"));
var react_redux_1 = require("react-redux");
var store = (0, toolkit_1.configureStore)({
    reducer: root_reducer_1.default
});
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.default = store;
