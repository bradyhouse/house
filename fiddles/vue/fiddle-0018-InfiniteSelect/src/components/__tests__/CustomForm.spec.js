import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import CustomForm from '../CustomForm.vue'; 

describe('form validation and submission', async () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CustomForm)
  });

  afterEach(() => {
    wrapper.unmount()
  });

  it('accepts valid email input', async () => {
      // Simulate invalid email input
    const emailInput = wrapper.find('input[name="email"]');
    await emailInput.setValue('bradyhouse@gmail.com');
    await emailInput.trigger('change');

    // Wait for validation to complete
    await flushPromises();

    // Check for error message
    expect(wrapper.find('ErrorMessage[name="email"]').exists()).toBe(false);

  });

});
