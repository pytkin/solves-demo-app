import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import HelloScreen from '@/components/HelloScreen.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('HelloScreen.vue', () => {
  test('has Vue instance', () => {
    const wrapper = mount(HelloScreen)
    expect(wrapper.vm).toBeTruthy()
  })

  test('props and scructure feel good', async () => {
    const wrapper = mount(HelloScreen, {
      localVue,
      propsData: {
        showHelloScreen: true
      }
    })

    expect(wrapper.find('.hello-screen').exists()).toBe(true)
    expect(wrapper.find('.btn').exists()).toBe(true)

    await wrapper.setProps({ showHelloScreen: false })
    expect(wrapper.find('.hello-screen').exists()).toBe(false)
    expect(wrapper.find('.btn').exists()).toBe(false)
  })
})
