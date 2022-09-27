'use strict';
import { app, protocol, ipcMain } from 'electron';
import db from './background/datastore';
import store from './background/store';
import browser from './background/browser';
import { DB_Key } from '@/background/_ipcDatastore';

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
  return store.dispatch('sync', { key, payload });
});

ipcMain.handle('insert-data', async (_: any, key: DB_Key, doc: any) => {
  return await db[key].insert(doc);
});

ipcMain.handle(
  'update-data',
  async (_: any, key: DB_Key, query: any, payload: any) => {
    const options = { upsert: true };

    switch (key) {
      case 'Main':
        return await db[key].update(
          { field_name: query },
          { field_name: query, ...payload },
          options
        );
      case 'Record':
        return await db[key].update(query, payload, options);
    }
  }
);

ipcMain.handle('remove-data', async (_: any, key: DB_Key, query: any) => {
  return await db[key].remove(query, {});
});

ipcMain.handle(
  'get-data',
  async (_: any, key: DB_Key, query: any, sort: any) => {
    const docs = db[key].find(query);
    return sort ? await docs.sort(sort) : await docs;
  }
);

ipcMain.handle('on-preview', (_: any, isPreview: boolean) => {
  isPreview ? browser.winPreview.showInactive() : browser.winPreview.hide();
});
