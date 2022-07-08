import Vue from 'vue';
import App from '@/App.vue'
import { shallowMount, mount } from '@vue/test-utils'
import axios from 'axios'

// const mockClick = jest.fn();
describe('implementatiob for app axios call', () => {
    let wrapper = null


    beforeEach(() => {

        const responseGet = {
            data: {
                name: 'Chicago',
                weather: [
                    {
                        main: 'Cloudy',
                        description: 'Cloudy with a chance of rain'
                    }
                ],
                main: {
                    temp: 56.3,
                    temp_min: 53.8,
                    temp_max: 58.6
                }
            }
        }
        jest.spyOn(axios, 'get');
        axios.get.mockResolvedValue(responseGet);
        wrapper = shallowMount(App)
    })
    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
    })

    it('after axios call', () => {
        wrapper.vm.searchCity('Chicago')
        expect(axios.get).toHaveBeenCalledTimes(1);

        expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))
        wrapper.vm.$nextTick().then(function () {

            // console.log(wrapper.vm.weatherData, "weather data");
            expect(wrapper.vm.weatherData.city).toMatch('Chicago')
            expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
            expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
            expect(wrapper.vm.weatherData.currentTemperature).toEqual(56.3)
            expect(wrapper.vm.weatherData.lowTemperature).toEqual(53.8)
            expect(wrapper.vm.weatherData.highTemperature).toEqual(58.6)
            expect(wrapper.vm.validWeatherData).toBe(true)
        })
    })
    // beforeEach(() => {
    //     axios.get.mockRejectedValue(new Error('BAD REQUEST'))
    //     wrapper = shallowMount(App)
    // })
})
//when fails

describe('Implementation Test for App.vue with Failed HTTP GET', () => {
    let wrapper = null

    beforeEach(() => {
        // Set the mock call to GET to return a failed GET request
        axios.get.mockRejectedValue(new Error('BAD REQUEST'))

        // Render the component
        wrapper = shallowMount(App)
    })

    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
    })

    it('does not call the api', () => {
        wrapper.vm.searchCity('ahemdabad')
        expect(axios.get).toHaveBeenCalledTimes(1);

        expect(axios.get).toBeCalledWith(expect.stringMatching(/ahemdabad/))
        wrapper.vm.$nextTick().then(function () {

            // console.log(wrapper.vm, "weather data");
            expect(wrapper.vm.weatherData.city).toMatch('ahemdabad')
            expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
            expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
            expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
            expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
            expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
            expect(wrapper.vm.validWeatherData).toBe(false)
        })

    })

})