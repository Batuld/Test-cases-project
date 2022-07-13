import { shallowMount } from "@vue/test-utils";
import Search from "@/components/Search.vue";

describe('search implemenation', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = shallowMount(Search)
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('check label', () => {
        expect(wrapper.findAll('label').at(0).text()).toMatch('City:')
    })

    it('search city is called', () => {
        wrapper.vm.inputCity = 'Ahmedabad, Gujarat'
        wrapper.vm.searchCity()

        expect(wrapper.emitted('search-city')).toBeTruthy()
        expect(wrapper.vm.inputCity).toMatch('Ahmedabad, Gujarat')
    })

    // search behaviour

    it('buttons for disable', () => {
        expect(wrapper.findAll('button').length).toEqual(2)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
        expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
        expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()
    })
    it('buttons for unable', async () => {
        wrapper.vm.inputCity = 'San Francisco'
        await Promise.resolve();

        expect(wrapper.findAll('button').length).toEqual(2)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
        expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
        expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
    })
    it('clears the input value', () => {
        wrapper.vm.inputCity = 'San Francisco'
        wrapper.vm.clearCity()
        expect(wrapper.vm.inputCity).toMatch(/^$/)
    })
})

