/**
 * TEMA: Vue Router
 * ENTREVISTA: ¿Navigation guards? ¿Lazy loading de rutas?
 */

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../06-pinia/authStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../01-fundamentos/CardComponent.vue'), // Lazy
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../07-router/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('../07-router/UserDetailView.vue'),
    props: true, // Pasa :id como prop al componente
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../07-router/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});

// Navigation Guard global
router.beforeEach((to, from) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'home', query: { redirect: to.fullPath } };
  }
});

export default router;
