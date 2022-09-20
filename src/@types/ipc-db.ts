import { InjectionKey } from 'vue';

export interface IPC_Datastore {
  storeSync: (callback: any) => Promise<void>;
  storeDispatch: (name: string, query: any) => Promise<void>;
  mainUpdateData: (name: string, query: any) => Promise<void>;
  recordInsertData: (query: any) => Promise<void>;
  recordUpdateData: (query: any, payload: any) => Promise<void>;
  recordGetData: (query: any, sort: any) => Promise<void>;
}

// Keyを発行
export const key: InjectionKey<IPC_Datastore> = Symbol('$db');
