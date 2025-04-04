import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DocListItem from '../DocListItem.vue'

describe('DocListItem', () => {
  it('renders slots correctly', async () => {
    const wrapper = mount(DocListItem, {
      global: {
        stubs: ['slot']
      },
      slots: {
        icon: '<span>Icon</span>',
        heading: '<h3>Title</h3>',
        default: '<p>Description</p>'
      }
    })

    expect(wrapper.find('.item').exists()).toBe(true)
    expect(wrapper.find('i > span').text()).toBe('Icon')
    expect(wrapper.find('.details > h3').text()).toBe('Title')
    expect(wrapper.find('.details > p').text()).toBe('Description')
  })
})
