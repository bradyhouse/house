import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '../AboutView.vue'

describe('AboutView', () => {
  let wrapper

  // Mock the global fetch function before each test
  beforeEach(() => {
    global.fetch = () => {
        return new Promise((resolve) => {
            resolve({
                text: () => '# Test Markdown Content'
            })
        })
    }
    wrapper = mount(AboutView)
  })

  // Restore the original fetch function after each test
  afterEach(() => {
    wrapper.unmount()
  })

  test('renders without errors', async () => {
    await wrapper.vm.$nextTick() // Wait for the component to update after mounting
    expect(wrapper.exists()).toBe(true)
  })
})
