// GridComponent.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Agrid from '../Agrid.vue'
import { nextTick } from 'vue'
import Api from '@/Api' // Mock the Api class

// Mock the Api class and its methods
vi.mock('@/Api', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      getMockData: vi.fn(() => [{ id: 1, name: 'Test Row' }]),
      getMockSchema: vi.fn(() => ['id', 'name'])
    }))
  }
})

describe('Agrid.vue', () => {
  it('should initialize the grid and set gridApi and columnApi', async () => {
    const wrapper = mount(Agrid)

    // Wait for the grid to be ready
    await wrapper.vm.onGridReady({
      api: { setRowData: vi.fn() },
      columnApi: {
        autoSizeColumns: () => true
      }
    })

    // Check if gridApi and columnApi are set
    expect(wrapper.vm.gridApi).not.toBeNull()
    expect(wrapper.vm.columnApi).not.toBeNull()
  })

  it('should call resizeColumns when grid is ready', async () => {
    const wrapper = mount(Agrid)

    // Spy on the resizeColumns method
    const resizeColumnsSpy = vi.spyOn(wrapper.vm, 'resizeColumns')

    // Simulate grid ready event
    await wrapper.vm.onGridReady({
      api: { setRowData: vi.fn() },
      columnApi: {
        autoSizeColumns: () => true
      }
    })

    // Wait for nextTick to ensure resizeColumns is called
    await nextTick()

    // Check if resizeColumns was called
    expect(resizeColumnsSpy).toHaveBeenCalled()
  })

  it('should dispatch a contextmenu event in showContextMenu', async () => {
    const wrapper = mount(Agrid)

    // Mock the DOM elements
    const mockCellElement = {
      getBoundingClientRect: vi.fn(() => ({
        left: 100,
        bottom: 200
      })),
      dispatchEvent: vi.fn()
    }

    const mockRowElement = {
      querySelector: vi.fn(() => mockCellElement)
    }

    const mockGridElement = {
      querySelector: vi.fn(() => mockRowElement)
    }

    wrapper.vm.el = mockGridElement

    // Call showContextMenu with mock params
    const params = {
      node: { id: 1 },
      column: { getId: vi.fn(() => 'name') },
      context: { componentParent: wrapper.vm }
    }

    wrapper.vm.showContextMenu(params, new MouseEvent('contextmenu'))

    // Check if the contextmenu event was dispatched
    expect(mockCellElement.dispatchEvent).toHaveBeenCalled()
  })
})
