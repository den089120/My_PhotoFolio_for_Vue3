import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from "./store";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

createApp(App).use(router).use(store).mount('#app');
