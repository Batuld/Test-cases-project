import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header test', () => {
    it('render msg when component is created', () => {
        const wrapper = shallowMount(Header, {
            propsData: {
                title: 'vue test project'
            }
        })
        expect(wrapper.vm.$options.name).toMatch('Header')

        expect(wrapper.text()).toMatch('vue test project')
    })
})