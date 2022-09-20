import { createStore } from 'vuex';

export type RecordItem = {
  _id: string;
  order: number;
  value: string;
  history_id: null | string;
};

export type State = {
  now_singing: string;
  main_record: RecordItem[];
};

export type Payload = {
  type: keyof State;
  payload: any;
};

export default createStore<State>({
  state: {
    now_singing: '',
    main_record: []
  },
  getters: {},
  mutations: {
    sync(state: State, json: any) {
      const { type, payload }: Payload = JSON.parse(json);
      state[type] = payload;
    }
  },
  actions: {},
  modules: {}
});
