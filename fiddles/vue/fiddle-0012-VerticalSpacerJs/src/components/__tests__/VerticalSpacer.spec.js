import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VerticalSpacer from '@/components/VerticalSpacer.vue';
import ResizeMonitor from '@/components/ResizeMonitor.vue';

describe('VerticalSpacer.vue', () => {
  // Mock necessary elements and their dimensions
  beforeEach(() => {
    const mockParentElement = document.createElement('div');
    mockParentElement.id = 'mockParent';
    mockParentElement.setAttribute("style", "height: 500px; width: 300px;")
    document.body.appendChild(mockParentElement);
    const verticalSpacerElement = document.createElement('div');
    verticalSpacerElement.id = 'verticalSpacer';
    mockParentElement.appendChild(verticalSpacerElement);
    console.log(document.body.outerHTML)

  });

  it('renders and initializes correctly', () => {
    const wrapper = mount(VerticalSpacer, {
      props: { targetId: 'mockParent', offsetHeight: '50' },
      global: {
        stubs: { ResizeMonitor: true }
      }
    });

    expect(wrapper.find('#verticalSpacer').exists()).toBe(true);
  });

  it('responds to size updates from ResizeMonitor', async () => {
    const wrapper = mount(VerticalSpacer, {
      props: { targetId: 'mockParent', offsetHeight: '50' },
      global: {
        components: { ResizeMonitor }
      }
    });

    // Mock the behavior of ResizeMonitor triggering height and width updates
    await wrapper.vm.onTargetHeightUpdate(400);
    await wrapper.vm.onTargetWidthUpdate();
    const spacerElement = wrapper.find('#verticalSpacer');

    console.log(spacerElement.element.outerHTML)
    expect(spacerElement.element.outerHTML).toContain('0px x 0px');

});

  it('toggles class based on enable/disable', async () => {
    const wrapper = mount(VerticalSpacer, {
      props: { targetId: 'mockParent', offsetHeight: '50' }
    });

    const spacerElement = wrapper.find('#verticalSpacer');

    await wrapper.vm.enable();
    await wrapper.vm.enable(false);
    console.log(spacerElement.element.outerHTML)
    expect(spacerElement.element.outerHTML).toContain('0px x 0px');
  });

});
