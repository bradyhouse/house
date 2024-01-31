import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WysiwygEditor from '../WysiwygEditor.vue' // Adjust the import path as necessary

describe('WysiWygEditor', () => {
  it('renders and initializes with default content', () => {
    const wrapper = mount(WysiwygEditor, {
      
    })

    expect(wrapper.exists()).toBe(true)

  })


})
