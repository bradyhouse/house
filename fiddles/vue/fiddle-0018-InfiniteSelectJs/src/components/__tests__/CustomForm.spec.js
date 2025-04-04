import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mount, unmount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import CustomForm from '../CustomForm.vue'

describe('form validation and submission', async () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CustomForm)
  })

  it('accepts valid location input', async () => {
    // Simulate invalid email input
    const locationInput = wrapper.find('input[name="location"]')
    await locationInput.setValue('lunchpod')
    await locationInput.trigger('change')

    // Wait for validation to complete
    await flushPromises()

    // Check for error message
    expect(wrapper.find('ErrorMessage[name="email"]').exists()).toBe(false)
  })
})
