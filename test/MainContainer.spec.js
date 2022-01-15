import { mount } from '@vue/test-utils'
import MainContainer from '@/components/MainContainer.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MainContainer)
    expect(wrapper.vm).toBeTruthy()
  })
})
