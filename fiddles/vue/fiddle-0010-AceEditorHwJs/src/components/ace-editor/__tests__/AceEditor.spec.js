import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AceEditor from '../AceEditor.vue'

describe('AceEditor.vue', () => {
    it('renders with initial state', () => {
        const wrapper = mount(AceEditor)
        expect(wrapper.vm.states.lang).toBe('yaml')
        expect(wrapper.vm.states.theme).toBe('monokai')
        expect(wrapper.vm.states.content).toBe('')
    })

    it('updates language and theme on selection', async () => {
        const wrapper = mount(AceEditor)
        
        const selects = wrapper.findAll('select')
        const langSelect = selects[0]
        await langSelect.setValue('javascript')
        expect(wrapper.vm.states.lang).toBe('javascript')

        const themeSelect = selects[1]
        await themeSelect.setValue('chrome')
        expect(wrapper.vm.states.theme).toBe('chrome')
    })

    it('updates content when language changes', async () => {
        const wrapper = mount(AceEditor)
        const langSelect = wrapper.findAll('select')[0]
        
        await langSelect.setValue('json')
        expect(wrapper.vm.states.content).toBe('')
    })

})
