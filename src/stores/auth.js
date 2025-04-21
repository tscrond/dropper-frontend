import { defineStore } from 'pinia';
import axios from 'axios';
import { useConfigStore } from './config'; // ✅ use relative path to avoid import resolution issues

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async checkAuth() {
        const configStore = useConfigStore(); // ✅ moved inside
        const backendUrl = configStore.backendUrl;

        try {
        const checkAuthUrl = `${backendUrl}/auth/is_valid`;
        const response = await axios.get(checkAuthUrl, { withCredentials: true });
        this.isAuthenticated = response.data.authenticated;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async logout(router) {
      const configStore = useConfigStore(); // ✅ moved inside
      const backendUrl = configStore.backendUrl;

      const logoutUrl = `${backendUrl}/auth/logout`;
      try {
        const response = await axios.post(logoutUrl, {}, { withCredentials: true });
        if (response.data.logout_successful) {
          this.isAuthenticated = false;
          router.replace("/login");
        } else {
          console.log('Issues with logout');
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
  }
});
