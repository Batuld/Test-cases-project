import { shallowMount } from "@vue/test-utils";
import Weather from "@/components/Weather.vue";
import Vue from 'vue';

describe('weather test', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = shallowMount(Weather, {
            propsData: {
                city: '',
                weatherSummary: '',
                weatherDescription: '',
                currentTemperature: 0.0,
                lowTemperature: 0.0,
                highTemperature: 0.0
            }
        })
    })
    it('initializes correct element', () => {
        expect(wrapper.vm.$options.name).toMatch('Weather')
        expect(wrapper.findAll('h2').length).toEqual(2)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Summary')
        expect(wrapper.findAll('h2').at(1).text()).toMatch('Temperatures')
        expect(wrapper.findAll('p').at(0).text()).toMatch('City:')
        expect(wrapper.findAll('p').at(1).text()).toMatch('Summary:')
        expect(wrapper.findAll('p').at(2).text()).toMatch('Details')
        expect(wrapper.findAll('p').at(3).text()).toMatch('Current: 0° F')
        expect(wrapper.findAll('p').at(4).text()).toMatch('High (Today): 0° F')
        expect(wrapper.findAll('p').at(5).text()).toMatch('Low (Today): 0° F')
    })
    //upadte props data

    // it('processes valid props data', async () => {

    //     wrapper.setProps({
    //         city: 'Chicago',
    //         weatherSummary: 'Cloudy',
    //         weatherDescription: 'Cloudy with a chance of rain',
    //         currentTemperature: 45.1,
    //         lowTemperature: 42.0,
    //         highTemperature: 47.7
    //     })

    //     expect(wrapper.vm.city).toMatch('Chicago')

    // })
    it('emits event when click', () => {
        wrapper.findAll('button').at(0).trigger('click')

        expect(wrapper.emitted('clear-weather-data')).toBeTruthy()
        expect(wrapper.emitted('clear-weather-data').length).toBe(1)

    })
})