import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import ImageBlock from '@/components/ImageBlock.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageBlock.vue', () => {
  test('has Vue instance', () => {
    const wrapper = mount(ImageBlock, {
      localVue,
      propsData: {
        block: {
          image: 'test'
        },
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('props and scructure feel good', async () => {
    const wrapper = mount(ImageBlock, {
      localVue,
      propsData: {
        block: {
          image: 'test'
        },
      }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    await wrapper.setProps({ block: { } })
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
