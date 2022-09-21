import { IPC_Datastore } from './ipc-db';
import { IPC_Browser } from './ipc-browser';

declare global {
  interface Window {
    db: IPC_Datastore;
    browser: IPC_Browser;
  }
}
