import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('db', {
  storeSync: (callback: any) => ipcRenderer.on('store-sync', callback),
  storeDispatch: (field_name: any, payload: any) =>
    ipcRenderer.invoke('store-dispatch', field_name, payload),

  // mainGetAllData: () => ipcRenderer.invoke('main-get-all-data'),
  mainUpdateData: (query: any, payload: any) =>
    ipcRenderer.invoke('main-update-data', query, payload),

  recordInsertData: (doc: any) => ipcRenderer.invoke('record-insert-data', doc),
  recordUpdateData: (query: any, payload: any) =>
    ipcRenderer.invoke('record-update-data', query, payload),
  recordGetData: (query: any, sort: any) =>
    ipcRenderer.invoke('record-get-data', query, sort)
});
