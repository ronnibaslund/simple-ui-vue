import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleSelect from '../SimpleSelect.vue'
import * as V from '../../../utils/ValidationRules'
import type { ColorsBrand, ColorsState, Sizes } from '../../../globals'

describe('SimpleSelect', () => {
  let wrapper

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleSelect)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('select').classes()).toContain('select')
  })
  
  it('renders with a single root element', () => {
    wrapper = mount(SimpleSelect)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('simple-select-wrapper')
  })

  it('binds v-model correctly', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]
    
    wrapper = mount(SimpleSelect, {
      props: {
        modelValue: 'option1',
        options
      }
    })

    expect(wrapper.find('select').element.value).toBe('option1')

    // Select a different option
    await wrapper.find('select').setValue('option2')
    
    // Check if update:modelValue event was emitted with correct value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('option2')
  })

  it('renders options correctly', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3', disabled: true }
    ]
    
    wrapper = mount(SimpleSelect, {
      props: {
        options,
        placeholder: 'Select an option'
      }
    })

    // Check placeholder option
    const allOptions = wrapper.findAll('option')
    expect(allOptions.length).toBe(options.length + 1) // +1 for placeholder
    expect(allOptions[0].text()).toBe('Select an option')
    expect(allOptions[0].attributes('disabled')).toBeDefined()
    
    // Check regular options
    expect(allOptions[1].text()).toBe('Option 1')
    expect(allOptions[1].attributes('value')).toBe('option1')
    
    // Check disabled option
    expect(allOptions[3].attributes('disabled')).toBeDefined()
  })

  it('handles slot content', () => {
    wrapper = mount(SimpleSelect, {
      slots: {
        default: `
          <option value="custom1">Custom Option 1</option>
          <option value="custom2">Custom Option 2</option>
        `
      }
    })
    
    const options = wrapper.findAll('option')
    expect(options.length).toBe(2)
    expect(options[0].text()).toBe('Custom Option 1')
    expect(options[1].text()).toBe('Custom Option 2')
  })

  it('applies color classes correctly', () => {
    const colors: (ColorsBrand | ColorsState)[] = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
    
    colors.forEach((color) => {
      wrapper = mount(SimpleSelect, {
        props: { color }
      })
      expect(wrapper.find('select').classes()).toContain(`select-${color}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes: Sizes[] = ['xs', 'sm', 'md', 'lg']
    
    sizes.forEach((size) => {
      wrapper = mount(SimpleSelect, {
        props: { size }
      })
      expect(wrapper.find('select').classes()).toContain(`select-${size}`)
    })
  })

  it('applies ghost class when ghost prop is true', () => {
    wrapper = mount(SimpleSelect, {
      props: {
        ghost: true
      }
    })
    
    expect(wrapper.find('select').classes()).toContain('select-ghost')
  })

  it('disables the select when disabled prop is true', () => {
    wrapper = mount(SimpleSelect, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })
  
  // Test new label prop
  describe('Label functionality', () => {
    it('renders label when label prop is provided', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          label: 'Customer'
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').exists()).toBe(true)
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Customer')
    })
    
    it('adds required indicator to label when required prop is true', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          label: 'Customer',
          required: true
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Customer *')
    })
  })
  
  // Test new error handling props
  describe('Error handling', () => {
    it('displays error message when errorMessage prop is provided', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          errorMessage: 'Please select a customer'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Please select a customer')
    })
    
    it('prioritizes errorMessage prop over error prop', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          error: 'Error from error prop',
          errorMessage: 'Error from errorMessage prop'
        }
      })
      
      expect(wrapper.find('.text-error').text()).toBe('Error from errorMessage prop')
    })
    
    it('applies error styling when hasError prop is true even without error message', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          hasError: true
        }
      })
      
      expect(wrapper.find('select').classes()).toContain('select-error')
    })
  })

  describe('Fieldset functionality', () => {
    it('renders with fieldset when fieldset prop is true', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Test Legend',
          fieldsetLabel: 'Test Label'
        }
      })

      expect(wrapper.find('fieldset').exists()).toBe(true)
      expect(wrapper.find('legend').text()).toBe('Test Legend')
      expect(wrapper.find('.fieldset-label').text()).toBe('Test Label')
    })

    it('adds required indicator (*) to fieldset legend', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Test Legend',
          required: true
        }
      })
      
      expect(wrapper.find('legend').text()).toBe('Test Legend *')
    })

    it('displays error message instead of label when there is an error', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Test Legend',
          fieldsetLabel: 'Helper text',
          error: 'This field has an error'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field has an error')
      expect(wrapper.find('.fieldset-label').exists()).toBe(false)
    })
  })

  describe('Form integration', () => {
    it('sets name attribute when name prop is provided', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          name: 'test-select'
        }
      })
      
      expect(wrapper.find('select').attributes('name')).toBe('test-select')
    })
    
    it('adds required attribute when required prop is true', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          required: true
        }
      })
      
      expect(wrapper.find('select').attributes('required')).toBeDefined()
    })
    
    it('displays error message when error prop is provided', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field is required')
    })
    
    it('adds error class to select when error is present', () => {
      wrapper = mount(SimpleSelect, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('select').classes()).toContain('select-error')
    })
  })

  describe('Event handling', () => {
    it('emits blur event when select loses focus', async () => {
      wrapper = mount(SimpleSelect)
      
      await wrapper.find('select').trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
    
    it('emits focus event when select gains focus', async () => {
      wrapper = mount(SimpleSelect)
      
      await wrapper.find('select').trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
    
    it('emits change event when selection changes', async () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      wrapper = mount(SimpleSelect, {
        props: { options }
      })
      
      await wrapper.find('select').setValue('option1')
      
      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('Validation functionality', () => {
    it('validates required fields on blur', async () => {
      wrapper = mount(SimpleSelect, {
        props: {
          required: true,
          name: 'test-select'
        }
      })
      
      // Trigger blur with empty value
      await wrapper.find('select').trigger('blur')
      
      // Check if error message is displayed
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('required')
    })
    
    it('supports custom validation rules', async () => {
      const customRule = (value: any) => value === 'option2' ? true : 'Must select Option 2'
      
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      wrapper = mount(SimpleSelect, {
        props: {
          options,
          validation: customRule
        }
      })
      
      // Select invalid option
      await wrapper.find('select').setValue('option1')
      
      // Need to directly call validateSelect method for testing
      const vm = wrapper.vm as any
      vm.validateSelect('option1')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Check if validation error is displayed
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must select Option 2')
      
      // Select valid option
      await wrapper.find('select').setValue('option2')
      
      // Call validate again
      vm.validateSelect('option2')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Error should be gone
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports array of validation rules', async () => {
      const rule1 = (value: any) => !!value || 'Value is required'
      const rule2 = (value: any) => value === 'option2' || 'Must select Option 2'
      
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      wrapper = mount(SimpleSelect, {
        props: {
          options,
          validation: [rule1, rule2]
        }
      })
      
      // Test first rule fails (empty value)
      await wrapper.find('select').setValue('')
      
      // Need to directly call validateSelect method for testing
      const vm = wrapper.vm as any
      vm.validateSelect('')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Value is required')
      
      // Test second rule fails
      await wrapper.find('select').setValue('option1')
      
      // Call validate directly
      vm.validateSelect('option1')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must select Option 2')
      
      // Test all rules pass
      await wrapper.find('select').setValue('option2')
      
      // Call validate directly
      vm.validateSelect('option2')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports custom validation messages', async () => {
      wrapper = mount(SimpleSelect, {
        props: {
          required: true,
          validationMessages: {
            required: 'Custom required message'
          }
        }
      })
      
      // Call validate directly
      const vm = wrapper.vm as any
      vm.validateSelect('')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show custom message
      expect(wrapper.find('.text-error').text()).toBe('Custom required message')
    })
  })
}) 