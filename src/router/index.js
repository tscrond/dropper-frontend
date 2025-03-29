import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios';

let backendEndpoint = '';

if (import.meta.env.DEV) {
  backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT
} else {
  backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

async function checkAuth() {
  try {
    const response = await axios.get(`${backendEndpoint}/auth/is_valid`, {withCredentials: true });
    console.log("authenticated: ",response.data.authenticated);
    return response.data.authenticated;
  } catch (e) {
    console.log(e);
    return false;
  }
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
  const isAuthenticated = await checkAuth();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next('login');
    }
  } else {
    next();
  }
});

export default router;
