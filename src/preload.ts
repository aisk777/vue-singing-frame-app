import { contextBridge, ipcRenderer } from 'electron';
// import Datastore from 'nedb-promises';
// import path from 'path';

//@ts-ignore
// const db = Datastore.create(path.join(__dirname, 'data.db'));
// console.log(db);

contextBridge.exposeInMainWorld('db', {
  getCustomizeData: () => console.log(1)
});
