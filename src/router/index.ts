import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('/@/pages/home/index.vue'),
  },
  {
    path: '/:notfound(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
