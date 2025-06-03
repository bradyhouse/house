import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ContextMenu from '../ContextMenu.vue'

describe('ContextMenu', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ContextMenu)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders initially hidden', () => {
    expect(wrapper.find('.context-menu').exists()).toBe(false)
  })

  it('opens on open method call', async () => {
    const mockEvent = { event: { pageX: 100, pageY: 200 }, actions: [{ label: 'Test Action' }] }
    await wrapper.vm.open(mockEvent)
    await wrapper.vm.$nextTick() // Wait for next DOM update cycle
    expect(wrapper.vm.show).toBe(true)
    expect(wrapper.find('.menu-item').text()).toContain('Test Action')
  })

  it('emits action-clicked on click', async () => {
    await wrapper.vm.open({
      event: { pageX: 100, pageY: 200 },
      actions: [{ label: 'Test Action' }]
    })
    await wrapper.vm.$nextTick()
    await wrapper.find('.menu-item').trigger('click')
    expect(wrapper.emitted()['action-clicked']).toBeTruthy()
  })

  // Add more tests as needed for onMouseEnter, onMouseLeave, etc.
})
