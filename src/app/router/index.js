import { createRouter, createWebHistory } from 'vue-router';
import TodoPage from '@/pages/TodoPage/TodoPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TodoPage,
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/SettingsPage/SettingsPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage/AboutPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;