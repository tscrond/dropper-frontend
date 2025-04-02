import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getActivePinia, setActivePinia, createPinia } from "pinia";

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

// Ensure Pinia is active
if (!getActivePinia()) {
  setActivePinia(createPinia());
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
