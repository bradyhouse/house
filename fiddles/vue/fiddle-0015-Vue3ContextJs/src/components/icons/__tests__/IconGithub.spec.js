import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconGithub from '@/components/icons/IconGithub.vue'

describe('Icon Ecosystem', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconGithub)
    expect(wrapper.html()).toContain('svg')
  })
})
