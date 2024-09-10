import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconTooling from '@/components/icons/IconTooling.vue'

describe('Icon Tooling', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconTooling)
    expect(wrapper.html()).toContain('svg')
  })
})
