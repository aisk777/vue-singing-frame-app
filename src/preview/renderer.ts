import { createApp } from 'vue';
import App from './App.vue';
import store from '../store';

// 共通のスタイルを読み込む
import '@/assets/scss/style.scss';

const app = createApp(App);

// Storeを有効化
app.use(store);

// 実行
app.mount('#app');
