import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigStore } from './config'

export const useBucketDataStore = defineStore('bucketdata', {
  state: () => ({
    bucketData: null,
    loading: false,
    error: null,
  }),

  getters: {
    objectsList: (state) => state.bucketData?.objects || [],
  },

  actions: {
    async fetchBucketDataFromUser() {
      const configStore = useConfigStore();
      const backendEndpoint = configStore.backendUrl;

      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${backendEndpoint}/user/bucket`, {
          withCredentials: true,
        })

        this.bucketData = response.data.bucket_data
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Fetch error'
      } finally {
        this.loading = false
      }
    },
  },
})
