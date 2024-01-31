import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ResizeMonitor from '@/components/ResizeMonitor.vue';

describe('ResizeMonitor.vue', () => {
  // Mock window resize event
  const triggerWindowResize = () => {
    window.dispatchEvent(new Event('resize'));
  };

  it('renders correctly with initial props', () => {
    const wrapper = mount(ResizeMonitor, {
      props: { targetId: 'testElement', isVisible: true }
    });

    expect(wrapper.text()).toContain('testElement');
    expect(wrapper.isVisible()).toBe(true);
  });


  
});
