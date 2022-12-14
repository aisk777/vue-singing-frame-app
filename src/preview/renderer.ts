// 共通のスタイルを読み込む
import '@/assets/scss/style.scss';

import { key } from '@/background/_ipcDatastore';
import { createApp } from 'vue';
import store from '../store';
import App from './App.vue';

// Appを作成
const app = createApp(App);

// Storeを有効化
app.use(store);

// DBを接続
app.provide(key, window.db);

// ストアをリンク
window.db.storeSync((_: any, mutation: any) => store.commit('sync', mutation));

// 実行
app.mount('#app');
