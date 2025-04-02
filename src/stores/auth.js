import { defineStore } from 'pinia';
import axios from 'axios';

let backendEndpoint = '';

if (import.meta.env.DEV) {
    backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || '';
} else {
    backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        async checkAuth() {
            try {
                const checkAuthUrl = `${backendEndpoint}/auth/is_valid`;
                const response = await axios.get(checkAuthUrl, { withCredentials: true });
                this.isAuthenticated = response.data.authenticated;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async logout(router) {
            const logoutUrl = `${backendEndpoint}/auth/logout`;
            const response = await axios.post(logoutUrl, {}, { withCredentials: true });
            console.log(response);
            if (response.data.logout_successful) {
                this.isAuthenticated = false;
                router.replace("/login");
            } else {
                console.log('Issues with logout');
            }
        },
        async getUserData() {
            
        },
    }
})
