'use strict';
import { app, protocol, ipcMain } from 'electron';
import db from './background/db';
import store from './background/store';
import browser from './background/browser';

// サンドボックスを有効化
app.enableSandbox();

// プロトコルの設定
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

app.on('window-all-closed', () => browser.windowAllClosed());
app.on('activate', () => browser.activate());
app.on('ready', () => browser.ready());

// ターミナルからアプリを終了
if (browser.isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') app.quit();
    });
  } else {
    process.on('SIGTERM', () => app.quit());
  }
}

/*
 ** IPC通信
 */
ipcMain.handle('store-dispatch', (e: any, field_name: any, payload: any) => {
  store.dispatch(field_name, payload);
});

ipcMain.handle(
  'main-update-data',
  async (e: any, field_name: any, payload: any) => {
    return await db.Main.updateData(
      { field_name: field_name },
      { field_name: field_name, ...payload }
    );
  }
);

ipcMain.handle('record-insert-data', async (e: any, doc: any) => {
  return await db.Record.insertData(doc);
});

ipcMain.handle(
  'record-update-data',
  async (e: any, query: any, payload: any) => {
    return await db.Record.updateData(query, payload);
  }
);

ipcMain.handle('record-get-data', async (e: any, query: any, sort: any) => {
  return await db.Record.findData(query, sort);
});
