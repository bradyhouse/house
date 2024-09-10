import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DocList from '../DocList.vue'

describe('DocList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DocList)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders DocList with correct content', async () => {
    // Check if a specific link is rendered
    expect(wrapper.find('a[href="https://plotly.com/javascript/"]').exists()).toBe(true)

    // Check if slot content is rendered correctly
    expect(wrapper.text()).toContain('3rd Party Libraries')
    expect(wrapper.text()).toContain('Plotly.js')
  })
})
