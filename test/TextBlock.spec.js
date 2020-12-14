import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import TextBlock from '@/components/TextBlock.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('TextBlock.vue', () => {
  test('has Vue instance', () => {
    const wrapper = mount(TextBlock, {
      localVue,
      propsData: {
        block: {
          text: 'test'
        },
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('props and scructure feel good', async () => {
    const wrapper = mount(TextBlock, {
      localVue,
      propsData: {
        block: {
          text: '',
          editing: true
        },
        blockNumber: 0
      }
    })

    const input = wrapper.find('.form-control')

    expect(input.element.value).toBe('')
    await wrapper.setProps({ block: { text: 'test', editing: true }, blockNumber: 1 })
    expect(input.element.value).toBe('test')
  })
})
