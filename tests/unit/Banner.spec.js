import { shallowMount } from "@vue/test-utils";
import Banner from "@/components/Banner.vue";

describe('Banner test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(Banner, {
            propsData: {
                bannerMessage: '',
                bannerType: '',
            }
        })
        expect(wrapper.vm.$options.name).toMatch('Banner')
        expect(wrapper.vm.bannerMessage).toMatch('')
        expect(wrapper.vm.bannerBackgroundColor).toMatch('blue')
    })

    it('Error message', () => {
        wrapper = shallowMount(Banner, {
            propsData: {
                bannerMessage: 'Banner msg 111',
                bannerType: 'Error'
            }
        })
        expect(wrapper.vm.bannerMessage).toMatch('Banner msg 111')
        expect(wrapper.vm.bannerType).toMatch('Error')
        expect(wrapper.vm.bannerBackgroundColor).toMatch('red')
    })
    it('success msg', () => {

        wrapper = shallowMount(Banner, {
            propsData: {
                bannerMessage: 'Banner msg 222',
                bannerType: 'Success'
            }
        })
        expect(wrapper.vm.bannerMessage).toMatch('Banner msg 222')
        expect(wrapper.vm.bannerType).toMatch('Success')
        expect(wrapper.vm.bannerBackgroundColor).toMatch('green')
    })
    it('Error message', () => {
        wrapper = shallowMount(Banner, {
            propsData: {
                bannerMessage: 'Banner msg 111',
                bannerType: 'Error'
            }
        })

        expect(wrapper.emitted('clear-banner')).toBeTruthy()


    })

})