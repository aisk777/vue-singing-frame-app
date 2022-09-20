import { IPC_Datastore } from './ipc-db';

declare global {
  interface Window {
    db: IPC_Datastore;
  }
}
