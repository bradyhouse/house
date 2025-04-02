import { createApp } from 'vue';

import App from './App.vue';
import Api from './Api';
import router from './router';

import './assets/main.css';
import 'bootswatch/dist/sketchy/bootstrap.css';

const api = new Api();
const app = createApp(App);

app.use(router);
app.provide('api', api);

app.mount('#app')
