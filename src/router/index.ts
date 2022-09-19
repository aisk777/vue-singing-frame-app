import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MainView from '../views/MainView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue')
  },
  {
    path: '/customize',
    name: 'customize',
    component: () => import('../views/CustomizeView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
