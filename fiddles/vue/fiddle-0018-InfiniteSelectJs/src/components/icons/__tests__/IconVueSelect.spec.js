import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconVueSelect from '@/components/icons/IconVueSelect.vue'

describe('Icon Vue Select', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconVueSelect)
    expect(wrapper.html()).toContain('img')
  })
})
