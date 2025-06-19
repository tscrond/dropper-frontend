import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigStore } from '@/stores/config';

export const useSharedDataStore = defineStore('shared', {
    state: () => ({
        sharedObjectsList: [],
        sharedObjectsByUserList: [],
        loading: false,
        error: null,
    }),

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
                this.sharedObjectsList = response.data?.response.files || [];
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Fetch error'
            } finally {
                this.loading = false
            }
        },
        async fetchSharedDataByUser() {
            const configStore = useConfigStore();
            const backendEndpoint = configStore.backendUrl;

            this.loading = true;
            this.error = null;
            
            try {
                const response = await axios.get(`${backendEndpoint}/files/shared_by_user`, {
                    withCredentials: true
                });
                this.sharedObjectsByUserList = response.data.response.files || [];
                console.log(response.data.response.files);
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Fetch Error';                
            } finally {
                this.loading = false;
            }
        }
    }
})
