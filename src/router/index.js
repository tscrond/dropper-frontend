import { createRouter, createWebHistory } from 'vue-router';
import { getActivePinia, setActivePinia, createPinia } from "pinia";

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import BucketView from '@/views/BucketView.vue';
import ShareView from '@/components/Share.vue';

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
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/share',
      name: 'share',
      component: ShareView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bucket',
      name: 'bucket',
      component: BucketView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})


router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore();
  await authStore.checkAuth();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
