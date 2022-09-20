import { app, BrowserWindow, screen } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension from 'electron-devtools-installer';
import path from 'path';
import db from './db';
import store from './store';

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

    // プレビュー
    this.winPreview = new BrowserWindow({
      title: 'Preview | SINGING FRAME',
      show: false,
      width: 580,
      height: 800,
      x: size.width - 580,
      y: size.height - 800,
      transparent: true,
      frame: false,
      resizable: false,
      hasShadow: false,
      roundedCorners: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await Promise.all([
        this.winMain.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string),
        this.winPreview.loadURL(
          `${process.env.WEBPACK_DEV_SERVER_URL}preview` as string
        )
      ]);
      // if (!process.env.IS_TEST) this.winMain.webContents.openDevTools();
    } else {
      createProtocol('app');
      this.winMain.loadURL('app://./index.html');
      this.winPreview.loadURL('app://./preview.html');
    }

    // メインウィンドウが閉じた時にプレビューも閉じる
    this.winMain.on('close', () => this.winPreview.close());

    // DBの値をストアに送る
    this.winMain.webContents.on('dom-ready', () => this.initStore());
    this.winPreview.webContents.on('dom-ready', () => this.initStore());
  },

  async initStore() {
    try {
      const [mainData, mainRecordData] = await Promise.all([
        db.Main.getAllData(),
        db.Record.findData({ history_id: null }, { order: 1 })
      ]);
      // ストアの値を更新
      mainData.forEach((doc: any) => store.dispatch(doc.field_name, doc));
      store.dispatch('main_record', mainRecordData);
    } catch (e) {
      console.error(e);
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
    this.initStore();
  }
};
export default browser;
