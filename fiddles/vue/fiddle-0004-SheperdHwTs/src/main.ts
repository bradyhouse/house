import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'bootswatch/dist/sketchy/bootstrap.css'

import Vue3DirectiveShepherd from "vue3-directive-shepherd"
import "shepherd.js/dist/css/shepherd.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { faJs, faVuejs } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faPersonCircleQuestion, faJs, faVuejs)

const options = {
  router,
  tourMap: {
    startupTour: {
      useModalOverlay: true
    },
    secondaryTour: {}
  }
};

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(Vue3DirectiveShepherd, options)
app.mount('#app')
