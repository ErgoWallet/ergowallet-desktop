"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trace(message) {
    console.trace(message);
}
function debug(message) {
    console.debug(message);
}
function info(message) {
    console.log(message);
}
exports.default = {
    trace: trace,
    debug: debug,
    info: info
};
