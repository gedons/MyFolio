import { createApp } from 'vue'
import './index.css'
import store from './store'
import router from './router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue'

createApp(App)
    .use(store)   
    .use(VueToast)
    .use(router) 
    .mount('#app')
