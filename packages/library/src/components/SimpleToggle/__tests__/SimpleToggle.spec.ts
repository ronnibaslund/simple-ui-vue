import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleToggle from '../SimpleToggle.vue'
import { colorsBrand, colorsState } from '../../../globals'
import type { Sizes, ColorsBrand, ColorsState, ToggleColorsContent } from '../../../globals'

// Define our types for tests
type ToggleColor = ColorsBrand | ColorsState | ToggleColorsContent
type ToggleSize = Sizes

describe('SimpleToggle', () => {
  let wrapper;

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null;
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleToggle)
    
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.vm.checked).toBe(false)
  })

  it('renders label when provided', () => {
    const testLabel = 'Test Label'
    wrapper = mount(SimpleToggle, {
      props: { label: testLabel }
    })
    
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe(testLabel)
  })

  it('binds to v-model correctly', async () => {
    wrapper = mount(SimpleToggle, {
      props: { modelValue: true }
    })
    
    expect(wrapper.vm.checked).toBe(true)
    
    // Change the model value prop
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.vm.checked).toBe(false)
  })

  it('emits update:modelValue event when toggled', async () => {
    wrapper = mount(SimpleToggle)
    
    // Initially false
    expect(wrapper.vm.checked).toBe(false)
    
    // Trigger toggle
    await wrapper.find('input[type="checkbox"]').trigger('change')
    
    // Should emit event with new value (true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    
    // Trigger toggle again
    await wrapper.find('input[type="checkbox"]').trigger('change')
    
    // Should emit event with new value (false)
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])
  })

  it('applies the correct color classes', () => {
    // Test a subset of colors
    const testColors: ToggleColor[] = ['primary', 'secondary', 'accent', 'success', 'error']
    
    testColors.forEach(color => {
      wrapper = mount(SimpleToggle, {
        props: { color }
      })
      
      const toggle = wrapper.find('input[type="checkbox"]')
      expect(toggle.classes()).toContain(`toggle-${color}`)
    })
  })

  it('applies the correct size classes', () => {
    // Test all sizes
    const testSizes: ToggleSize[] = ['xs', 'sm', 'md', 'lg']
    
    testSizes.forEach(size => {
      wrapper = mount(SimpleToggle, {
        props: { size }
      })
      
      const toggle = wrapper.find('input[type="checkbox"]')
      expect(toggle.classes()).toContain(`toggle-${size}`)
    })
  })

  it('checkbox state matches v-model value', async () => {
    wrapper = mount(SimpleToggle, {
      props: { modelValue: true }
    })
    
    // Check if internal state matches prop
    expect(wrapper.vm.checked).toBe(true)
    
    // Change the prop
    await wrapper.setProps({ modelValue: false })
    
    // Check if internal state updated
    expect(wrapper.vm.checked).toBe(false)
  })

  it('combines color and size classes correctly', () => {
    wrapper = mount(SimpleToggle, {
      props: {
        color: 'primary' as ToggleColor,
        size: 'lg' as ToggleSize
      }
    })
    
    const toggle = wrapper.find('input[type="checkbox"]')
    expect(toggle.classes()).toContain('toggle-primary')
    expect(toggle.classes()).toContain('toggle-lg')
  })

  it('applies the base toggle class', () => {
    wrapper = mount(SimpleToggle)
    
    const toggle = wrapper.find('input[type="checkbox"]')
    expect(toggle.classes()).toContain('toggle')
  })

  it('wraps in a div with simple-toggle class', () => {
    wrapper = mount(SimpleToggle)
    
    expect(wrapper.find('div.simple-toggle').exists()).toBe(true)
  })

  it('updates checked state when toggling', async () => {
    wrapper = mount(SimpleToggle)
    
    // Initially false
    expect(wrapper.vm.checked).toBe(false)
    
    // Toggle
    await wrapper.find('input[type="checkbox"]').trigger('change')
    
    // Should be true now
    expect(wrapper.vm.checked).toBe(true)
    
    // Toggle again
    await wrapper.find('input[type="checkbox"]').trigger('change')
    
    // Should be false again
    expect(wrapper.vm.checked).toBe(false)
  })
}) 