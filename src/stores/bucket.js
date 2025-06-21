import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigStore } from './config'

let controller = null;

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
      if (controller) controller.abort();
      controller = new AbortController();

      const configStore = useConfigStore();
      const backendEndpoint = configStore.backendUrl;

      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${backendEndpoint}/user/bucket`, {
          signal: controller.signal,
          withCredentials: true,
        })
        this.bucketData = response.data.response.bucket_data
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message)
        } else {
          this.error = err.response?.data?.response?.msg || err.message || 'Fetch error'
        }
      } finally {
        this.loading = false
      }
    },
  },
})
