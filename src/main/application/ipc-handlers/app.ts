import {ipcMain} from 'electron';
import {Commands} from '../../../common/backend-types';
import Application from "../Application";

export function setHandlers(app: Application): void {
  ipcMain.handle(Commands.APP_UPDATE_SETTINGS, (event: any, settings: any) => {
    return app.updateSettings(settings);
  });

  ipcMain.handle(Commands.APP_GET_SETTINGS, (event: any) => {
    return app.getSettings();
  });
}
