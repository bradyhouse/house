import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconSupport from '@/components/icons/IconSupport.vue'

describe('Icon Support', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconSupport)
    expect(wrapper.html()).toContain('svg')
  })
})
