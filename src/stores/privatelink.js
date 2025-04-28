import { defineStore } from "pinia";
import axios from "axios";
import { useConfigStore } from "./config";

export const usePrivateLinkStore = defineStore('privatelink', {
    state: () => ({
        tokens: {},
        loading: false,
        error: null
    }),

    getters: {
        getPrivateLink: (state) => (fileName) => {
            return state.tokens[fileName] || "error";
        },
    },

    actions: {
        async fetchPrivateLink(thisFile) {

            const configStore = useConfigStore();
            const backendEndpoint = configStore.backendUrl;

            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`${backendEndpoint}/user/private/download_token`, {
                    withCredentials: true,
                    params: { file: thisFile },
                });
                this.tokens[thisFile] = response.data.private_download_token;
            } catch (err) {
                this.tokens[thisFile] = response.data.private_download_token;
                this.error = err.response?.data?.message || err.message || 'Fetch error';
            } finally {
                this.loading = false;
            }
        },
    },
});
