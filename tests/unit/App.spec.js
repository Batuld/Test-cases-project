import Vue from 'vue';
import App from '@/App.vue'
import { shallowMount, mount } from '@vue/test-utils'
import axios from 'axios'

// const mockClick = jest.fn();
describe('implementation for app axios call', () => {
    let wrapper = null


    beforeEach(() => {

        const responseGet = {
            data: {
                name: 'ahemdabad',
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


    it('success of  axios call', async () => {
        wrapper.vm.searchCity('ahemdabad')
        await Promise.resolve();
        expect(axios.get).toHaveBeenCalledTimes(1);

        expect(axios.get).toBeCalledWith(expect.stringMatching(/ahemdabad/))
        wrapper.vm.$nextTick().then(function () {

            // console.log(wrapper.vm.weatherData, "weather data");
            expect(wrapper.vm.weatherData.city).toMatch('ahemdabad')
            expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
            expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
            expect(wrapper.vm.weatherData.currentTemperature).toEqual(56.3)
            expect(wrapper.vm.weatherData.lowTemperature).toEqual(53.8)
            expect(wrapper.vm.weatherData.highTemperature).toEqual(58.6)
            expect(wrapper.vm.validWeatherData).toBe(true)
        })
    })
})

//when fails

describe('Implementation Test for App.vue with Failed HTTP GET', () => {
    let wrapper = null

    beforeEach(() => {
        axios.get.mockRejectedValue(new Error('BAD REQUEST'))
        wrapper = shallowMount(App)
    })

    afterEach(() => {
        axios.get.mockReset()
        wrapper.unmount()

    })

    it('does not call the api', async () => {
        wrapper.vm.searchCity('ahemdabad')

        expect(axios.get).toHaveBeenCalledTimes(1);

        expect(axios.get).toBeCalledWith(expect.stringMatching(/ahemdabad/))
        await Promise.resolve();
        // wrapper.vm.$nextTick().then(function () {


        // console.log(wrapper.vm, "weather data");
        expect(wrapper.vm.weatherData.city).toMatch(/^$/)
        expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
        expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
        expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
        expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
        expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
        expect(wrapper.vm.validWeatherData).toBe(false)
        expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for ahemdabad!')
        expect(wrapper.vm.messageType).toMatch('Error')

        // })

    })

    it('when api is not loaded', () => {
        wrapper.created('5b59d0f6dbbe87dd97035b964b2b1677')
        expect(axios.get).toBeCalledWith(expect.stringMatching(/5b59d0f6dbbe87dd97035b964b2b1677/))


        // expect(wrapper.vm.messageToDisplay).toMatch('Error! API Key needs to be loaded to use openweathermap.org!')
        // expect(wrapper.vm.messageType).toMatch('Error')
    })

})