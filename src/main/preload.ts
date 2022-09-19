import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('db', {
  getMainData: () => console.log(1)
});
