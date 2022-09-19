import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 共通のスタイルを読み込む
import '@/assets/scss/style.scss';

const app = createApp(App);

// StoreとRouterを有効化
app.use(store).use(router);

// DBを接続
app.config.globalProperties.$db = window.db;

// ストアをリンク
app.config.globalProperties.$db.storeSync((_: any, mutation: any) =>
  store.commit('sync', mutation)
);

// 実行
app.mount('#app');
