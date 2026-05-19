"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_store_1 = __importDefault(require("electron-store"));
var uuid_1 = require("uuid");
var DEFAULTS = {
    id: (0, uuid_1.v4)()
};
var Settings = /** @class */ (function () {
    function Settings() {
        this.settings = new electron_store_1.default({
            name: 'settings',
            defaults: DEFAULTS
        });
    }
    Settings.prototype.data = function () {
        return this.settings.store;
    };
    Settings.prototype.update = function (data) {
        this.setTerms(data.termsVersion);
    };
    Settings.prototype.setTerms = function (version) {
        this.settings.set('termsVersion', version);
        return this;
    };
    Settings.prototype.getId = function () {
        return this.settings.get('id');
    };
    return Settings;
}());
exports.default = Settings;
