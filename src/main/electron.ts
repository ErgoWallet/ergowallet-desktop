import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import Application from './application/Application';
import {createWindow} from './main-window';
import {Events} from "../common/backend-types";

console.debug(`userData: ${app.getPath('userData')}`);

/** Main window instance */
let mainWindow: BrowserWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

/** Core application */
const application = new Application(app.getPath('userData'));

if (!gotTheLock) {
  app.quit();
} else {
  // Set handler for second instance run
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  // Load primary instance of application
  app.on('before-quit', () => {
    application.stop();
    console.debug('Electron app before-quit done');
  });

  app.on('ready', async () => {


    // Create and show main window
    mainWindow = createWindow({
      appIconPath: path.join(__dirname, '/../icons/16x16.png')
    });

    // First: set ready event handler to show window
    mainWindow.on('ready-to-show', () => {
      console.debug("Main window ready to show");
      mainWindow.show();
      mainWindow.focus();

      // Start Core Application
      application.start();
    });

    application.on('WalletUpdated', () => {
      mainWindow.webContents.send('events', { type: Events.WALLET_UPDATED });
    });

    application.on('WalletHistoryLoading', (isLoading) => {
      mainWindow.webContents.send('events', {
        type: Events.WALLET_LOADING_HISTORY,
        payload: isLoading
      });
    });

    application.on(Application.APP_READY_EVENT, () => {
      mainWindow.webContents.send('events', { type: Events.APP_READY });
    });

    application.on(Application.APP_LATEST_VERSION, (version) => {
      mainWindow.webContents.send('events', {
        type: Events.APP_LATEST_VERSION,
        payload: version
      });
    });

    application.on('SettingsUpdated', () => {
      mainWindow.webContents.send('events', { type: Events.SETTINGS_UPDATED });
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error(event);
      console.error(`Fail load main window content. (${errorCode}: ${errorDescription})`);
    });

    // Second: load main page asynchronously
    await mainWindow.loadFile(path.join(__dirname, '/../index.html'));
  });
}
