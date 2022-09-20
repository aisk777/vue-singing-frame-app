import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('db', {
  storeSync: (callback: any) => {
    return ipcRenderer.on('store-sync', callback);
  },
  storeDispatch: (field_name: any, payload: any) => {
    return ipcRenderer.invoke('store-dispatch', field_name, payload);
  },
  mainUpdateData: (query: any, payload: any) => {
    return ipcRenderer.invoke('main-update-data', query, payload);
  },
  recordInsertData: (doc: any) => {
    return ipcRenderer.invoke('record-insert-data', doc);
  },
  recordUpdateData: (query: any, payload: any) => {
    return ipcRenderer.invoke('record-update-data', query, payload);
  },
  recordGetData: (query: any, sort: any) => {
    return ipcRenderer.invoke('record-get-data', query, sort);
  }
});
