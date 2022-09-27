import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { key as key_db } from '@/background/_ipcDatastore';
import { key as key_browser } from '@/background/_ipcBrowser';

// 共通のスタイルを読み込む
import '@/assets/scss/style.scss';

// Appを作成
const app = createApp(App);

// StoreとRouterを有効化
app.use(store).use(router);

// ブラウザ操作の接続
app.provide(key_browser, window.browser);

// DBを接続
app.provide(key_db, window.db);

// ストアをリンク
window.db.storeSync((_: any, mutation: any) => store.commit('sync', mutation));

// 実行
app.mount('#app');
