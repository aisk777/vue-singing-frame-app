import { createStore } from 'vuex';
import browser from './browser';

// レンダラーのストアを更新
const webContents = (store: any) => {
  store.subscribe((mutation: any) => {
    browser.winMain.webContents.send('store-sync', mutation);
    browser.winPreview.webContents.send('store-sync', mutation);
  });
};

export default createStore({
  state: {
    now_singing: '',
    main_record: []
  },
  getters: {},
  actions: {
    now_singing({ commit }, payload) {
      commit('now_singing', payload.value);
    },
    main_record({ commit }, payload) {
      commit('main_record', payload);
    }
  },
  mutations: {
    now_singing(state, payload) {
      state.now_singing = payload;
    },
    main_record(state, payload) {
      state.main_record = payload;
    }
  },
  modules: {},
  plugins: [webContents]
});
