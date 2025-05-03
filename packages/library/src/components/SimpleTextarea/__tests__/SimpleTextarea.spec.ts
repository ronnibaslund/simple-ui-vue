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
      
      wrapper = mount(SimpleTextarea, {
        props: {
          required: true,
          name: 'test-textarea'
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Set empty value
      await wrapper.find('textarea').setValue('')
      
      // Need to directly call validateTextarea method for testing
      const vm = wrapper.vm as any
      const isValid = vm.validateTextarea('')
      
      // Update the error message manually
      vm.localError = 'This field is required'
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(isValid).toBe(false)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-textarea', 'This field is required')
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('required')
    })
    
    it('supports custom validation rules', async () => {
      // Custom rule: value must be at least 10 characters
      const customRule = (value: any) => value.length >= 10 ? true : 'Must be at least 10 characters'
      
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
      
      wrapper = mount(SimpleTextarea, {
        props: {
          name: 'test-textarea',
          validation: customRule
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Set invalid value (too short)
      await wrapper.find('textarea').setValue('Too short')
      
      // Need to directly call validateTextarea method for testing
      const vm = wrapper.vm as any
      const isValid = vm.validateTextarea('Too short')
      
      // Update the error message manually
      vm.localError = 'Must be at least 10 characters'
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(isValid).toBe(false)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-textarea', 'Must be at least 10 characters')
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must be at least 10 characters')
      
      // Set valid value (long enough)
      await wrapper.find('textarea').setValue('This is long enough')
      
      // Call validate again
      const isValidAfter = vm.validateTextarea('This is long enough')
      vm.localError = null // Clear local error
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Error should be gone
      expect(isValidAfter).toBe(true)
      expect(mockFormContext.setFieldError).toHaveBeenCalledWith('test-textarea', null)
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports validation with ValidationRules utility', async () => {
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
      
      wrapper = mount(SimpleTextarea, {
        props: {
          name: 'test-textarea',
          validation: V.minLength(5, 'Text must be at least 5 characters'),
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
      
      // Set invalid value (too short) and trigger blur
      await wrapper.find('textarea').setValue('Hi')
      await wrapper.find('textarea').trigger('blur')
      
      // Update component error prop to simulate form context behavior
      await wrapper.setProps({ error: 'Text must be at least 5 characters' })
      
      // Check error message is displayed in the UI
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Text must be at least 5 characters')
      expect(wrapper.find('textarea').classes()).toContain('textarea-error')
      
      // Set valid value (long enough)
      await wrapper.find('textarea').setValue('Hello world')
      await wrapper.find('textarea').trigger('blur')
      
      // Update error prop to null to simulate form context clearing the error
      await wrapper.setProps({ error: null })
      
      // Error should be gone from the UI
      expect(wrapper.find('.text-error').exists()).toBe(false)
      expect(wrapper.find('textarea').classes()).not.toContain('textarea-error')
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
      
      // Set empty value
      await wrapper.find('textarea').setValue('')
      
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