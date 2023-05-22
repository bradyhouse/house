import { createRouter, createWebHistory } from 'vue-router'

const publicPath = process.env.NODE_ENV === 'production' ? '/vue/fiddle-0002-AgGridSparklineTs/' : '/'

const router = createRouter({
  history: createWebHistory(publicPath),
  routes: [
    {
      path: '/',
      name: 'fiddle',
      component: () => import('../views/FiddleView.vue')
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/HomeView.vue')
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
  console.log('to', to)
  console.log('from', from)
  debugger
  if (from.fullPath === '/' || from.fullPath.includes('index.html')) {
    next('/')
  } else {
    next()
  }
}

export default router
