import { DB_Key } from '@/background/_ipcDatastore';
import { contextBridge, ipcRenderer } from 'electron';

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
  removeData: (key: DB_Key, query: any) => {
    return ipcRenderer.invoke('remove-data', key, query);
  },
  getData: (key: DB_Key, query: any, sort: any) => {
    return ipcRenderer.invoke('get-data', key, query, sort);
  }
});

contextBridge.exposeInMainWorld('browser', {
  onPreview: (isPreview: boolean) => {
    return ipcRenderer.invoke('on-preview', isPreview);
  }
});
