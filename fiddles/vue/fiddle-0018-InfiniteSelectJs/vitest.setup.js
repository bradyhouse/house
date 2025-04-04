// vitest.setup.ts
import { vi } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock v-select component
vi.mock('vue-select', () => ({
  default: {
    template: '<div><slot></slot></div>'
  }
}))

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn()
  }
  
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)



export { mount }