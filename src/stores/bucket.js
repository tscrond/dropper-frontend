import { defineStore } from 'pinia';
import axios from 'axios';

let backendEndpoint = '';

if (import.meta.env.DEV) {
    backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || '';
} else {
    backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

export const useBucketDataStore = defineStore("bucketdata",{
    state: () => ({
        bucketData: null,
    }),
    getters: {
        objectsList: (state) => state.bucketData?.objects || null,
    },
    actions: {
        async fetchBucketDataFromUser(userData) {
            const bucketDataUrl = `${backendEndpoint}/user/bucket`;
            const response = await axios.get(bucketDataUrl, { withCredentials: true });

            return null;
        }
    }
});
