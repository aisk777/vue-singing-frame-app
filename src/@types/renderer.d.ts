import { IPC_Datastore } from '@/background/_ipcDatastore';
import { IPC_Browser } from '@/background/_ipcBrowser';

/* eslint-disable */
declare global {
  interface Window {
    db: IPC_Datastore;
    browser: IPC_Browser;
    queryLocalFonts: any;
  }
}
