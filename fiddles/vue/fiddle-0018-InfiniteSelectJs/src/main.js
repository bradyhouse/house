import { createApp } from 'vue'

import App from './App.vue'
import RestApi from './services/rest-api'
import NoRestApi from './services/no-rest-api'
import router from './router'

import './assets/main.css'
import 'bootswatch/dist/sketchy/bootstrap.css'

const mode = import.meta.env.MODE
console.log(`Running in ${mode} mode`)

const app = createApp(App)
app.use(router)

switch (mode) {
  case 'rest':
    const restApi = new RestApi('/api')
    app.provide('api', restApi)
    break
  default:
    const noRestApi = new NoRestApi()
    app.provide('api', noRestApi)
}

app.mount('#app')
