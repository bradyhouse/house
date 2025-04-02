import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconVeeValidate from '@/components/icons/IconVeeValidate.vue'

describe('Icon VeeValidate', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconVeeValidate)
    expect(wrapper.html()).toContain('img')
  })
})
