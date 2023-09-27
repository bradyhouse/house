import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TopNav from '../TopNav.vue'


describe('TopNav', () => {
  it('renders properly', () => {
    const wrapper = mount(TopNav, { props: { 
        href: 'https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0002-AgGridSparklineTs'
    } })

    expect(wrapper.text()).toContain('Fork Me On Github')
  })
})
