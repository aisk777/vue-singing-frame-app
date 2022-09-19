'use strict';
import { app, protocol, ipcMain } from 'electron';
import db from '@/main/db';
import browser from '@/main/browser';

// (async () => {
//   const data = await db.Main.insertData({ name: 'aaa' });
//   console.log(data);
// })();

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
