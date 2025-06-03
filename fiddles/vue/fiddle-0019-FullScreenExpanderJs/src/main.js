import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'bootswatch/dist/sketchy/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEllipsisV)
library.add(faExpand)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
