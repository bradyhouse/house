import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import FourOnFourView from '../404View.vue'

describe('404View', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(FourOnFourView)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('renders without errors', async ({ mount }) => {
    expect(wrapper.exists()).toBe(true)
  })
})
