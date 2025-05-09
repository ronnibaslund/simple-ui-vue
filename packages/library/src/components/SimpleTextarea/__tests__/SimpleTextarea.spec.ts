import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleTextarea from '../SimpleTextarea.vue'
import * as V from '../../../utils/ValidationRules'
import type { ColorsBrand, ColorsState, ExtendedSizes } from '../../../globals'

describe('SimpleTextarea', () => {
  let wrapper

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleTextarea)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').classes()).toContain('textarea')
  })
  
  it('renders with a single root element', () => {
    wrapper = mount(SimpleTextarea)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('simple-textarea-wrapper')
  })

  it('binds v-model correctly', async () => {
    wrapper = mount(SimpleTextarea, {
      props: {
        modelValue: 'Initial text'
      }
    })

    expect(wrapper.find('textarea').element.value).toBe('Initial text')

    // Change the textarea value
    await wrapper.find('textarea').setValue('Updated text')
    
    // Check if update:modelValue event was emitted with correct value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('Updated text')
  })

  it('applies placeholder correctly', () => {
    wrapper = mount(SimpleTextarea, {
      props: {
        placeholder: 'Enter your comment'
      }
    })
    
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter your comment')
  })

  it('applies rows attribute correctly', () => {
    wrapper = mount(SimpleTextarea, {
      props: {
        rows: 5
      }
    })
    
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('applies color classes correctly', () => {
    const colors: (ColorsBrand | ColorsState)[] = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
    
    colors.forEach((color) => {
      wrapper = mount(SimpleTextarea, {
        props: { color }
      })
      expect(wrapper.find('textarea').classes()).toContain(`textarea-${color}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes: ExtendedSizes[] = ['xs', 'sm', 'md', 'lg', 'xl']
    
    sizes.forEach((size) => {
      wrapper = mount(SimpleTextarea, {
        props: { size }
      })
      expect(wrapper.find('textarea').classes()).toContain(`textarea-${size}`)
    })
  })

  it('applies ghost class when ghost prop is true', () => {
    wrapper = mount(SimpleTextarea, {
      props: {
        ghost: true
      }
    })
    
    expect(wrapper.find('textarea').classes()).toContain('textarea-ghost')
  })

  it('disables the textarea when disabled prop is true', () => {
    wrapper = mount(SimpleTextarea, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })
  
  // Test new label prop
  describe('Label functionality', () => {
    it('renders label when label prop is provided', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          label: 'Description'
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').exists()).toBe(true)
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Description')
    })
    
    it('adds required indicator to label when required prop is true', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          label: 'Description',
          required: true
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Description *')
    })
  })
  
  // Test new error handling props
  describe('Error handling', () => {
    it('displays error message when errorMessage prop is provided', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          errorMessage: 'Please enter a description'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Please enter a description')
    })
    
    it('prioritizes errorMessage prop over error prop', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          error: 'Error from error prop',
          errorMessage: 'Error from errorMessage prop'
        }
      })
      
      expect(wrapper.find('.text-error').text()).toBe('Error from errorMessage prop')
    })
    
    it('applies error styling when hasError prop is true even without error message', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          hasError: true
        }
      })
      
      expect(wrapper.find('textarea').classes()).toContain('textarea-error')
    })
  })

  describe('Fieldset functionality', () => {
    it('renders with fieldset when fieldset prop is true', () => {
      wrapper = mount(SimpleTextarea, {
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
      wrapper = mount(SimpleTextarea, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Test Legend',
          required: true
        }
      })
      
      expect(wrapper.find('legend').text()).toBe('Test Legend *')
    })

    it('displays error message instead of label when there is an error', () => {
      wrapper = mount(SimpleTextarea, {
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
      wrapper = mount(SimpleTextarea, {
        props: {
          name: 'test-textarea'
        }
      })
      
      expect(wrapper.find('textarea').attributes('name')).toBe('test-textarea')
    })
    
    it('adds required attribute when required prop is true', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          required: true
        }
      })
      
      expect(wrapper.find('textarea').attributes('required')).toBeDefined()
    })
    
    it('displays error message when error prop is provided', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field is required')
    })
    
    it('adds error class to textarea when error is present', () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('textarea').classes()).toContain('textarea-error')
    })
  })

  describe('Event handling', () => {
    it('emits blur event when textarea loses focus', async () => {
      wrapper = mount(SimpleTextarea)
      
      await wrapper.find('textarea').trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
    
    it('emits focus event when textarea gains focus', async () => {
      wrapper = mount(SimpleTextarea)
      
      await wrapper.find('textarea').trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
    
    it('emits change event when textarea content changes', async () => {
      wrapper = mount(SimpleTextarea)
      
      await wrapper.find('textarea').trigger('change')
      
      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('Validation functionality', () => {
    it('validates required fields on blur', async () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          required: true,
          name: 'test-textarea'
        }
      })
      
      // Trigger blur with empty value
      await wrapper.find('textarea').trigger('blur')
      
      // Check if error message is displayed
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('required')
    })
    
    it('supports custom validation rules', async () => {
      // Custom rule: value must be at least 10 characters
      const customRule = (value: any) => value.length >= 10 ? true : 'Must be at least 10 characters'
      
      wrapper = mount(SimpleTextarea, {
        props: {
          validation: customRule
        }
      })
      
      // Set invalid value (too short)
      await wrapper.find('textarea').setValue('Too short')
      
      // Need to directly call validateTextarea method for testing
      const vm = wrapper.vm as any
      vm.validateTextarea('Too short')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must be at least 10 characters')
      
      // Set valid value (long enough)
      await wrapper.find('textarea').setValue('This is long enough')
      
      // Call validate again
      vm.validateTextarea('This is long enough')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Error should be gone
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports array of validation rules', async () => {
      const rule1 = (value: any) => !!value || 'Value is required'
      const rule2 = (value: any) => value.length >= 10 || 'Must be at least 10 characters'
      
      wrapper = mount(SimpleTextarea, {
        props: {
          validation: [rule1, rule2]
        }
      })
      
      // Test first rule fails (empty value)
      await wrapper.find('textarea').setValue('')
      
      // Need to directly call validateTextarea method for testing
      const vm = wrapper.vm as any
      vm.validateTextarea('')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Value is required')
      
      // Test second rule fails
      await wrapper.find('textarea').setValue('Too short')
      
      // Call validate directly
      vm.validateTextarea('Too short')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must be at least 10 characters')
      
      // Test all rules pass
      await wrapper.find('textarea').setValue('This is long enough')
      
      // Call validate directly
      vm.validateTextarea('This is long enough')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports custom validation messages', async () => {
      wrapper = mount(SimpleTextarea, {
        props: {
          required: true,
          validationMessages: {
            required: 'Custom required message for textarea'
          }
        }
      })
      
      // Call validate directly
      const vm = wrapper.vm as any
      vm.validateTextarea('')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show custom message
      expect(wrapper.find('.text-error').text()).toBe('Custom required message for textarea')
    })
  })
}) 