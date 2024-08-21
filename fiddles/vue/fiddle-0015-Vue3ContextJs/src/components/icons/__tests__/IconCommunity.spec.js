import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconCommunity from '@/components/icons/IconCommunity.vue'; 

describe('IconCommunity', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconCommunity);
    expect(wrapper.html()).toContain('svg'); 
  });
});
