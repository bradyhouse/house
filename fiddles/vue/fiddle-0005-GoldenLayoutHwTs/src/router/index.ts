import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue')
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
