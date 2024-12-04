import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router/route'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL



createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
