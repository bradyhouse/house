import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconDocumentation from '@/components/icons/IconDocumentation.vue'; 

describe('IconCommunity', () => {
  it('renders correctly', () => {
    const wrapper = mount(IconDocumentation);
    expect(wrapper.html()).toContain('svg'); 
  });
});
