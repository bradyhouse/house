import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@vueform/slider/themes/default.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
