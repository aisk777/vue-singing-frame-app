import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);

// DBを接続
app.config.globalProperties.$db = window.db;

// 実行
app.mount('#app');
