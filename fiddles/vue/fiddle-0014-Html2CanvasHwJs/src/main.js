import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'bootswatch/dist/sketchy/bootstrap.css'

import { routePreviewMixin } from './mixins/routePreviewMixin'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mixin(routePreviewMixin)

app.mount('#app')
