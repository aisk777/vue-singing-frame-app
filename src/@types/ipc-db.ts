import Datastore from 'nedb-promises';
import { InjectionKey } from 'vue';

export interface DatastoreObject {
  Main: Datastore<Document>;
  Record: Datastore<Document>;
  // History: Datastore<Document>;
  // Customize: Datastore<Document>;
}
export type DB_Key = keyof DatastoreObject;

export interface IPC_Datastore {
  storeSync: (T: (S: any, U: any) => void) => Promise<void>;
  storeDispatch: (T: string, S: any) => Promise<void>;
  updateData: (T: DB_Key, S: any, U: any) => Promise<void>;
  insertData: (T: DB_Key, S: any) => Promise<void>;
  removeData: (T: DB_Key, S: any) => Promise<void>;
  getData: (T: DB_Key, S: any, U: any) => Promise<void>;
}

// Keyを発行
export const key: InjectionKey<IPC_Datastore> = Symbol('$db');
