import { createStore } from 'vuex';

export default createStore({
  state: {
    isSidebar: true
  },
  getters: {},
  mutations: {
    isSidebar(state, payload) {
      state.isSidebar = payload;
    }
  },
  actions: {},
  modules: {}
});
