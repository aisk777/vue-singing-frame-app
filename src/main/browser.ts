import { app, BrowserWindow, screen } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension from 'electron-devtools-installer';
import path from 'path';

const browser: any = {
  isDevelopment: process.env.NODE_ENV !== 'production',

  async createWindow() {
    const size = screen.getPrimaryDisplay().size;

    // メイン
    this.winMain = new BrowserWindow({
      title: 'SINGING FRAME',
      width: 1200,
      height: 700,
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    // サブ
    this.winPreview = new BrowserWindow({
      title: 'Preview | SINGING FRAME',
      width: 580,
      height: 800,
      x: size.width - 580,
      y: size.height - 800,
      // transparent: true,
      frame: false,
      resizable: false,
      hasShadow: false,
      roundedCorners: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await Promise.all([
        this.winMain.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string),
        this.winPreview.loadURL(
          `${process.env.WEBPACK_DEV_SERVER_URL}#/preview` as string
        )
      ]);
      if (!process.env.IS_TEST) this.winMain.webContents.openDevTools();
    } else {
      createProtocol('app');
      this.winMain.loadURL('app://./index.html');
    }
  },

  windowAllClosed() {
    if (process.platform !== 'darwin') app.quit();
  },

  activate() {
    if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
  },

  async ready() {
    if (this.isDevelopment && !process.env.IS_TEST) {
      try {
        await installExtension({
          id: 'nhdogjmejiglipccpnnnanhbledajbpd',
          electron: '>=1.2.1'
        });
      } catch (e: any) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }
    this.createWindow();
  }
};
export default browser;
