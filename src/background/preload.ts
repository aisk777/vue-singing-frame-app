import { contextBridge, ipcRenderer } from 'electron';
import { DB_Key } from '@/@types/ipc-db';

contextBridge.exposeInMainWorld('db', {
  storeSync: (callback: () => void) => {
    return ipcRenderer.on('store-sync', callback);
  },
  storeDispatch: (name: string, payload: any) => {
    return ipcRenderer.invoke('store-dispatch', name, payload);
  },
  updateData: (key: DB_Key, name: string, payload: any) => {
    return ipcRenderer.invoke('update-data', key, name, payload);
  },
  insertData: (key: DB_Key, doc: any) => {
    return ipcRenderer.invoke('insert-data', key, doc);
  },
  getData: (key: DB_Key, query: any, sort: any) => {
    return ipcRenderer.invoke('get-data', key, query, sort);
  }
});
