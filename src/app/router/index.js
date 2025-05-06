import { createRouter, createWebHistory } from 'vue-router';
import TodoPage from '@/pages/TodoPage/TodoPage.vue';
import AboutPage from '@/pages/AboutPage/AboutPage.vue';
import SettingsPage from '@/pages/SettingsPage/SettingsPage.vue';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TodoPage,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {
      title: 'О проекте'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      title: 'Настройки'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: 'Страница не найдена'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | To-Do List App`;
  next();
});

export default router;