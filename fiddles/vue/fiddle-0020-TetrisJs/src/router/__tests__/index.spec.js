import { createRouter } from 'vue-router'
import router from '../index.js' // Adjust the path according to your project structure
import { test, expect } from 'vitest'

test('routes are defined correctly', () => {
  expect(router.hasRoute('fiddle')).toBe(true)
  expect(router.hasRoute('docs')).toBe(true)
  expect(router.hasRoute('about')).toBe(true)
})

test('404 route redirects correctly', async () => {
  await router.push('/nonexistent')
  const currentRoute = router.currentRoute.value
  expect(currentRoute.path).toBe('/404')
})

test('beforeEnter guard redirects correctly', async () => {
  await router.push('/about')
  let currentRoute = router.currentRoute.value
  expect(currentRoute.path).toBe('/about')

  await router.push('/nonexistent')
  currentRoute = router.currentRoute.value
  expect(currentRoute.path).toBe('/404')
})
