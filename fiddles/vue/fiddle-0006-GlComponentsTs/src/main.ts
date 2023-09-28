import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueDraggableResizable from "vue-draggable-resizable";

import './assets/main.css'
import 'bootswatch/dist/sketchy/bootstrap.css'
import 'golden-layout/dist/css/goldenlayout-base.css'
import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css'



const app = createApp(App)
app.component("vue-draggable-resizable", VueDraggableResizable)
app.use(createPinia())
app.use(router)


app.mount('#app')
