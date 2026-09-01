import { createApp } from 'vue'
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import './index.css'
import store from './store'
import router from './router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue'
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(store)   
    .use(VueToast)
    .use(router) 
    .mount('#app')
