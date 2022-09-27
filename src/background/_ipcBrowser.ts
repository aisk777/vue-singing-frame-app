import { InjectionKey } from 'vue';

export interface IPC_Browser {
  onPreview: (T: boolean) => Promise<void>;
}

// Keyを発行
export const key: InjectionKey<IPC_Browser> = Symbol('$browser');
