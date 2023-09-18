import {BrowserWindow} from 'electron';

const pkg = require('../package.json');

export function createWindow(options): BrowserWindow {
  // Create the browser window.
  return new BrowserWindow({
    show: false,
    width: 1024,
    height: 650,
    icon: options.appIconPath,
    title: "Ergo Wallet v" + pkg.version,
    webPreferences: {
      // enableRemoteModule: false,
      spellcheck: false,
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
}
