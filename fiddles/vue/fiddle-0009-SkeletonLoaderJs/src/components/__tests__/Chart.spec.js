import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Chart from '../Chart.vue';

// Mock Plotly module
vi.mock('plotly.js/dist/plotly', async () => {
  const actual = await vi.importActual('plotly.js/dist/plotly');
  // Mocking both default and named exports
  return {
    __esModule: true, // This line is important to signify this is a module with ES6 exports
    default: {
      newPlot: vi.fn(),
      Plots: {
        resize: vi.fn(),
      },
      purge: vi.fn(),
    },
    ...actual,
  };
});

// Mocking window.URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-object-url');


describe('Chart', () => {
  it('renders correctly when loading', () => {
    const wrapper = mount(Chart, {
      props: {
        data: [],
        layout: {},
        options: {},
      },
    });
    expect(wrapper.find('.skeleton').exists()).toBe(true);
  });

  // Additional tests...
});
