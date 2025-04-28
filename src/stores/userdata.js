import { defineStore } from "pinia";
import axios from "axios";
import { useConfigStore } from "./config";

export const useUserDataStore = defineStore("userdata",{
    state: () => ({
        userData: null,
    }),
    getters: {
        userId: (state) => state.userData?.id || null,
        userEmail: (state) => state.userData?.email || null,
        userName: (state) => state.userData?.name || null,
        givenName: (state) => state.userData?.given_name || null,
        familyName: (state) => state.userData?.family_name || null,
        profPicture: (state) => state.userData?.picture || null,
        locale: (state) => state.userData?.locale || null
    },
    actions: {
        async fetchUserData() {
            const configStore = useConfigStore();
            const backendEndpoint = configStore.backendUrl;

            try {
                const userDataUrl = `${backendEndpoint}/user/data`;
                const response = await axios.get(userDataUrl, { withCredentials: true });

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
