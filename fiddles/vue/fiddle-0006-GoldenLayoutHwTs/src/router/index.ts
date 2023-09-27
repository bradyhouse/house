import { createRouter, createWebHistory } from 'vue-router'


const publicPath = process.env.NODE_ENV === 'production' ? '/vue//' : '/'

const router = createRouter({
  history: createWebHistory(publicPath),
  routes: [
    {
      path: '/',
      name: 'fiddle',
      component: () => import('../views/FiddleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/404',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/:catchAll(.*)',
      beforeEnter: onBeforeError,
      redirect: '/404'
    },
    ]
})

function onBeforeError(to: any, from: any, next: any) {
  if (from.fullPath === '/' || from.fullPath.includes('index.html')) {
    next('/')
  } else {
    next()
  }
}

export default router
