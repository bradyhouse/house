import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconPlotly from '@/components/icons/IconPlotly.vue'

describe('Icon Plotly', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconPlotly)
    expect(wrapper.html()).toContain('img')
  })
})
