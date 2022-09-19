import { createStore } from 'vuex';

export default createStore({
  state: {
    now_singing: '',
    main_record: []
  },
  getters: {},
  mutations: {
    sync(state: any, { type, payload }: any) {
      state[type] = payload;
    }
  },
  actions: {},
  modules: {}
});
