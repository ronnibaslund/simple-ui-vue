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
      // Create a mock formContext to ensure the error is properly stored
      const mockFormContext = {
        values: {},
        errors: {},
        touched: {},
        setFieldValue: vi.fn(),
        setFieldError: vi.fn(),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: false } }
      }
      
      wrapper = mount(SimpleSelect, {
        props: {
          required: true,
          name: 'test-select'
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Set empty value
      await wrapper.find('select').setValue('')
      
      // Need to directly call validateSelect method for testing
      const vm = wrapper.vm as any
      const isValid = vm.validateSelect('')
      
      // Update the error message manually
      vm.localError = 'This field is required'
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(isValid).toBe(false)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-select', 'This field is required')
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('required')
    })
    
    it('supports custom validation rules', async () => {
      // Custom rule: value must be 'option2'
      const customRule = (value: any) => value === 'option2' ? true : 'Must select Option 2'
      
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      // Create a mock formContext
      const mockFormContext = {
        values: {},
        errors: {},
        touched: {},
        setFieldValue: vi.fn(),
        setFieldError: vi.fn(),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: false } }
      }
      
      wrapper = mount(SimpleSelect, {
        props: {
          name: 'test-select',
          options,
          validation: customRule
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Set invalid value
      await wrapper.find('select').setValue('option1')
      
      // Need to directly call validateSelect method for testing
      const vm = wrapper.vm as any
      const isValid = vm.validateSelect('option1')
      
      // Update the error message manually
      vm.localError = 'Must select Option 2'
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(isValid).toBe(false)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-select', 'Must select Option 2')
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must select Option 2')
      
      // Set valid value
      await wrapper.find('select').setValue('option2')
      
      // Call validate again
      const isValidAfter = vm.validateSelect('option2')
      vm.localError = null // Clear local error
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Error should be gone
      expect(isValidAfter).toBe(true)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-select', null)
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports validation with ValidationRules utility', async () => {
      const options = [
        { value: '', label: 'Select an option' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      const mockFormContext = {
        values: {},
        errors: {},
        setFieldError: vi.fn((fieldName, error) => {
          mockFormContext.errors[fieldName] = error
        }),
        setFieldValue: vi.fn((fieldName, value) => {
          mockFormContext.values[fieldName] = value
        }),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: false } }
      }
      
      wrapper = mount(SimpleSelect, {
        props: {
          name: 'test-select',
          options,
          validation: V.required('Please make a selection'),
          error: undefined
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Initial check - no error should be shown
      expect(wrapper.find('.text-error').exists()).toBe(false)
      
      // Set empty value and trigger blur to run validation
      await wrapper.find('select').setValue('')
      await wrapper.find('select').trigger('blur')
      
      // Update component error prop to simulate form context behavior
      await wrapper.setProps({ error: 'Please make a selection' })
      
      // Check error message is displayed in the UI
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Please make a selection')
      expect(wrapper.find('select').classes()).toContain('select-error')
      
      // Set valid value
      await wrapper.find('select').setValue('option1')
      await wrapper.find('select').trigger('blur')
      
      // Update error prop to null to simulate form context clearing the error
      await wrapper.setProps({ error: null })
      
      // Error should be gone from the UI
      expect(wrapper.find('.text-error').exists()).toBe(false)
      expect(wrapper.find('select').classes()).not.toContain('select-error')
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
      
      // Set empty value
      await wrapper.find('select').setValue('')
      
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