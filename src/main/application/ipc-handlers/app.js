"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandlers = setHandlers;
var electron_1 = require("electron");
var backend_types_1 = require("../../../common/backend-types");
function setHandlers(app) {
    electron_1.ipcMain.handle(backend_types_1.Commands.APP_UPDATE_SETTINGS, function (event, settings) {
        return app.updateSettings(settings);
    });
    electron_1.ipcMain.handle(backend_types_1.Commands.APP_GET_SETTINGS, function (event) {
        return app.getSettings();
    });
}
