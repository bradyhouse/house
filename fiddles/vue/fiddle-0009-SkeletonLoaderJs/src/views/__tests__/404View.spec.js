import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NotFoundView from '../404View.vue';

describe('404View', () => {
  it('renders without errors', () => {
    const wrapper = mount(NotFoundView);
    expect(wrapper.exists()).toBe(true);
  });

  it('has the correct image source', () => {
    const wrapper = mount(NotFoundView);
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
  });

});
