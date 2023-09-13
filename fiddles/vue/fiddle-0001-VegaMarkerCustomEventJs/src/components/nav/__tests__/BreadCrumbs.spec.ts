import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BreadCrumbs from '../BreadCrumbs.vue'

describe('BreadCrumbs', () => {
  it('renders properly', () => {
    const wrapper = mount(BreadCrumbs, { props: { crumbs: [{
        title: 'fiddle.sh',
        url: 'https://github.com/bradyhouse/house'
    }, {
        title: 'Vue',
        url: 'https://github.com/bradyhouse/house/tree/master/fiddles/vue'
    }, {
        title: 'Fiddle #1 ~ Vega Marker Custom Event',
        url: null
    }] } })

    expect(wrapper.text()).toContain('fiddle.sh')
    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.text()).toContain('Fiddle #1 ~ Vega Marker Custom Event')
  })
})
