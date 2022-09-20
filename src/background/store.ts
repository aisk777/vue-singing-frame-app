import { createStore } from 'vuex';
import { State, Payload } from '@/store';
import browser from './browser';

// レンダラーのストアを更新
const webContents = (store: any) => {
  store.subscribe(({ type }: Payload, state: State) => {
    const mutation = JSON.stringify({ type, payload: state[type] });
    try {
      browser.winMain.webContents.send('store-sync', mutation);
      browser.winPreview.webContents.send('store-sync', mutation);
    } catch (e: any) {
      console.error(e);
    }
  });
};

export default createStore<State>({
  state: {
    now_singing: '',
    main_record: []
  },
  getters: {},
  actions: {
    sync({ commit }, { key, payload }) {
      commit(key, payload);
    }
  },
  mutations: {
    now_singing(state: State, payload) {
      state.now_singing = payload;
    },
    main_record(state: State, payload) {
      state.main_record = payload;
    }
  },
  modules: {},
  plugins: [webContents]
});
