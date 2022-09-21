'use strict';
import { app, protocol, ipcMain } from 'electron';
import db from './background/db';
import store from './background/store';
import browser from './background/browser';
import { DB_Key } from '@/@types/ipc-db';

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
ipcMain.handle('store-dispatch', (_: any, key: string, payload: any) => {
  store.dispatch('sync', { key, payload });
});

ipcMain.handle('insert-data', async (_: any, key: DB_Key, doc: any) => {
  return await db[key].insertData(doc);
});

ipcMain.handle(
  'update-data',
  async (_: any, key: DB_Key, query: any, payload: any) => {
    if (key === 'Main') {
      return await db[key].updateData(
        { field_name: query },
        { field_name: query, ...payload }
      );
    }

    if (key === 'Record') {
      return await db[key].updateData(query, payload);
    }
  }
);

ipcMain.handle('remove-data', async (_: any, key: DB_Key, query: any) => {
  return await db[key].removeData(query);
});

ipcMain.handle(
  'get-data',
  async (_: any, key: DB_Key, query: any, sort: any) => {
    return await db[key].findData(query, sort);
  }
);

ipcMain.handle('on-preview', (_: any, isPreview: boolean) => {
  isPreview ? browser.winPreview.showInactive() : browser.winPreview.hide();
});
