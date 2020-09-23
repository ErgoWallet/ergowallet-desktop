import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import Application from './application/Application';
import {createWindow} from './main-window';

/** Main window instance */
let mainWindow: BrowserWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

/** Core application */
const application = new Application();

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
    console.log('Electron app before-quit done');
  });

  app.on('ready', async () => {

    // Start Core Application
    application.start();

    // Create and show main window
    mainWindow = createWindow({
      appIconPath: path.join(__dirname, '/../icons/favicon.png')
    });

    // First: set ready event handler to show window
    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
      mainWindow.focus();
    });


    application.on('WalletUpdated', () => {
      mainWindow.webContents.send('WalletUpdated', {});
    });

    // Second: load main page asynchronously
    await mainWindow.loadFile(path.join(__dirname, '/../index.html'));
  });
}
