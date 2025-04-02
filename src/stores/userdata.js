import { defineStore } from "pinia";
import axios from "axios";

let backendEndpoint = '';

if (import.meta.env.DEV) {
    backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || '';
} else {
    backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

export const useUserDataStore = defineStore("userdata",{
    state: () => ({
        userData: null,
    }),
    getters: {
        profPicture: (state) => state.userData?.picture || null,
        userEmail: (state) => state.userData?.email || null,
        givenName: (state) => state.userData?.given_name || null,
    },
    actions: {
        async fetchUserData() {
            try {
                const userDataUrl = `${backendEndpoint}/user_data`;
                const response = await axios.get(userDataUrl,{ withCredentials: true });

                if (response.data.user_data) {
                    this.userData = response.data.user_data;
                } else {
                    this.userData = null;
                }
            } catch (e) {
                console.log("errors fetching data: ",e);
                this.userData = null;
            }
        },
        logout() {
            this.userData = null; // Clear user data on logout
        },
    }
})
