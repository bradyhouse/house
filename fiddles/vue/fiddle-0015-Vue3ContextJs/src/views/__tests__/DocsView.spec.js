import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import DocsView from '../DocsView.vue'

describe('DocsView', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(DocsView)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
    
  test('renders without errors', async ({ mount }) => {
    expect(wrapper.exists()).toBe(true)
  })
})

