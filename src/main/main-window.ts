import {BrowserWindow, app} from 'electron';

export function createWindow(options): BrowserWindow {
  // Create the browser window.
  return new BrowserWindow({
    show: false,
    width: 1024,
    height: 650,
    icon: options.appIconPath,
    title: "Ergo Wallet v" + app.getVersion(),
    webPreferences: {
      // enableRemoteModule: false,
      spellcheck: false,
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
}
