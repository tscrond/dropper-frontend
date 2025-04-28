import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useConfigStore } from '@/stores/config';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            // cssLayer: true
        }
    }
 });

const pinia = createPinia();
app.use(pinia);

const configStore = useConfigStore(pinia)
configStore.init()

app.use(router);
app.mount('#app');
