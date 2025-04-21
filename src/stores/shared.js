import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigStore } from '@/stores/config';

export const useSharedDataStore = defineStore('shared', {
    state: () => ({
        sharedData: null,
        loading: false,
        error: null,
    }),

    getters: {
        sharedObjectsList: (state) => state.sharedData || [],
    },

    actions: {
        async fetchSharedDataForUser() {
            const configStore = useConfigStore();
            const backendEndpoint = configStore.backendUrl;

            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${backendEndpoint}/files/received`,{
                    withCredentials: true
                })
                this.sharedData = response.data.files
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Fetch error'
            } finally {
                this.loading = false
            }
        }
    }
})
