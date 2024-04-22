import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/soho-dark/theme.css'
const app = createApp(App)

app.use(router).use(store)
app.use(PrimeVue);

app.mount('#app')
