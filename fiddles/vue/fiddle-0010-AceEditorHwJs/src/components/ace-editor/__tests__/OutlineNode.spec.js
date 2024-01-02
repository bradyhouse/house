import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OutlineNode from '../OutlineNode.vue';

// Mocking OutlineFoldNodeInterface
const createMockNode = (children = []) => ({
  children,
  text: 'Node Text',
  range: { start: { row: Math.random() } },
});

describe('OutlineNode.vue', () => {
  it('renders properly', () => {
    const node = createMockNode();
    const wrapper = mount(OutlineNode, {
      props: { node },
    });
    expect(wrapper.text()).toContain(node.text);
  });

  it('toggles open state on icon click', async () => {
    const node = createMockNode();
    const wrapper = mount(OutlineNode, {
      props: { node },
    });

    const icon = wrapper.find('header > i');
    await icon.trigger('click');
    expect(wrapper.classes()).toContain('closed');
    await icon.trigger('click');
    expect(wrapper.classes()).toContain('open');
  });

  it('emits click-title event on title click', async () => {
    const node = createMockNode();
    const wrapper = mount(OutlineNode, {
      props: { node },
    });

    const title = wrapper.find('header > a');
    await title.trigger('click');
    expect(wrapper.emitted('click-title')).toBeTruthy();
  });

  it('renders children when open', () => {
    const childNode = createMockNode();
    const node = createMockNode([childNode]);
    const wrapper = mount(OutlineNode, {
      props: { node },
    });

    expect(wrapper.findAllComponents(OutlineNode).length).toBeGreaterThan(0);
  });

  it('applies depth style correctly', () => {
    const node = createMockNode();
    const depth = 3;
    const wrapper = mount(OutlineNode, {
      props: { node, depth },
    });

    expect(wrapper.attributes('style')).toContain(`--depth: ${depth}`);
  });

  it('applies className correctly', () => {
    const node = createMockNode();
    const className = () => 'custom-class';
    const wrapper = mount(OutlineNode, {
      props: { node, className },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });
});
