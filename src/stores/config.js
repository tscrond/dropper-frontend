import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({
        backendUrl: ''
    }),
    actions: {
        init() {
            if (import.meta.env.DEV) {
                this.backendUrl = import.meta.env.VITE_BACKEND_ENDPOINT || ''
            } else {
                this.backendUrl = window.CONFIG?.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__'
            }
        }
    }
})

