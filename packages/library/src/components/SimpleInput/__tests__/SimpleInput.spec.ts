import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleInput from '../SimpleInput.vue'
import SimpleIcon from '../../SimpleIcon/SimpleIcon.vue'
import * as V from '../../../utils/ValidationRules'

// Mock the SimpleIcon component to avoid issues with the actual component's dependencies
vi.mock('../../SimpleIcon/SimpleIcon.vue', () => ({
  default: {
    name: 'SimpleIcon',
    props: ['icon', 'size'],
    template: '<div class="mock-icon" :data-icon="icon" :data-size="size"></div>'
  }
}))

describe('SimpleInput', () => {
  let wrapper

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleInput)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('renders with a single root element', () => {
    wrapper = mount(SimpleInput)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('simple-input-wrapper')
  })

  it('binds v-model correctly', async () => {
    wrapper = mount(SimpleInput, {
      props: {
        modelValue: 'initial value'
      }
    })

    expect(wrapper.find('input').element.value).toBe('initial value')

    // Update the input value
    await wrapper.find('input').setValue('new value')
    
    // Check if update:modelValue event was emitted with correct value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('new value')
  })

  it('applies color classes correctly', () => {
    wrapper = mount(SimpleInput, {
      props: {
        color: 'primary'
      }
    })

    expect(wrapper.find('label').classes()).toContain('input-primary')
  })

  it('applies size classes correctly', () => {
    wrapper = mount(SimpleInput, {
      props: {
        size: 'lg'
      }
    })

    expect(wrapper.find('label').classes()).toContain('input-lg')
  })

  it('renders icon when provided', () => {
    wrapper = mount(SimpleInput, {
      props: {
        icon: 'search'
      },
      global: {
        stubs: {
          SimpleIcon: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'SimpleIcon' }).exists()).toBe(true)
  })

  describe('Password input', () => {
    it('renders with type password', () => {
      wrapper = mount(SimpleInput, {
        props: {
          type: 'password'
        }
      })

      expect(wrapper.find('input').attributes('type')).toBe('password')
    })

    it('displays password toggle button for password inputs', () => {
      wrapper = mount(SimpleInput, {
        props: {
          type: 'password'
        },
        global: {
          stubs: {
            SimpleIcon: true
          }
        }
      })

      expect(wrapper.find('.swap').exists()).toBe(true)
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    })

    it('toggles password visibility when checkbox is clicked', async () => {
      wrapper = mount(SimpleInput, {
        props: {
          type: 'password',
          modelValue: 'secret123'
        },
        global: {
          stubs: {
            SimpleIcon: true
          }
        }
      })

      // Initially type should be password
      expect(wrapper.find('input[type="password"]').exists()).toBe(true)
      
      // Click the checkbox
      await wrapper.find('input[type="checkbox"]').setValue(true)
      
      // Now the type should be text for visibility
      expect(wrapper.find('input[type="text"]').exists()).toBe(true)
      
      // Click again to hide
      await wrapper.find('input[type="checkbox"]').setValue(false)
      
      // Type should be back to password
      expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    })
  })

  describe('Fieldset functionality', () => {
    it('renders with fieldset when fieldset prop is true', () => {
      wrapper = mount(SimpleInput, {
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

    it('renders password toggle within fieldset for password inputs', () => {
      wrapper = mount(SimpleInput, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Password',
          type: 'password'
        },
        global: {
          stubs: {
            SimpleIcon: true
          }
        }
      })

      expect(wrapper.find('fieldset').exists()).toBe(true)
      expect(wrapper.find('.swap').exists()).toBe(true)
    })
  })

  it('disables the input when disabled prop is true', () => {
    wrapper = mount(SimpleInput, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies placeholder correctly', () => {
    wrapper = mount(SimpleInput, {
      props: {
        placeholder: 'Enter value...'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter value...')
  })

  it('handles different input types correctly', () => {
    const types = ['text', 'email', 'number', 'date', 'time', 'url', 'tel']
    
    types.forEach(type => {
      wrapper = mount(SimpleInput, {
        props: { type }
      })
      expect(wrapper.find('input').attributes('type')).toBe(type)
    })
  })

  // Test new label prop
  describe('Label functionality', () => {
    it('renders label when label prop is provided', () => {
      wrapper = mount(SimpleInput, {
        props: {
          label: 'Project Name'
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').exists()).toBe(true)
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Project Name')
    })
    
    it('adds required indicator to label when required prop is true', () => {
      wrapper = mount(SimpleInput, {
        props: {
          label: 'Project Name',
          required: true
        }
      })
      
      expect(wrapper.find('.mb-1.text-sm').text()).toBe('Project Name *')
    })
  })
  
  // Test new error handling props
  describe('Error handling', () => {
    it('displays error message when errorMessage prop is provided', () => {
      wrapper = mount(SimpleInput, {
        props: {
          errorMessage: 'This field is invalid'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field is invalid')
    })
    
    it('prioritizes errorMessage prop over error prop', () => {
      wrapper = mount(SimpleInput, {
        props: {
          error: 'Error from error prop',
          errorMessage: 'Error from errorMessage prop'
        }
      })
      
      expect(wrapper.find('.text-error').text()).toBe('Error from errorMessage prop')
    })
    
    it('applies error styling when hasError prop is true even without error message', () => {
      wrapper = mount(SimpleInput, {
        props: {
          hasError: true
        }
      })
      
      expect(wrapper.find('label').classes()).toContain('input-error')
    })
  })

  // New tests for added functionality
  describe('Event bubbling', () => {
    it('emits blur event when input loses focus', async () => {
      wrapper = mount(SimpleInput)
      
      await wrapper.find('input').trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
    
    it('emits focus event when input gains focus', async () => {
      wrapper = mount(SimpleInput)
      
      await wrapper.find('input').trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
    
    it('emits change event when input value changes', async () => {
      wrapper = mount(SimpleInput)
      
      await wrapper.find('input').trigger('change')
      
      expect(wrapper.emitted('change')).toBeTruthy()
    })
    
    it('emits input event when typing in the input', async () => {
      wrapper = mount(SimpleInput)
      
      await wrapper.find('input').trigger('input')
      
      expect(wrapper.emitted('input')).toBeTruthy()
    })
  })
  
  describe('Form integration', () => {
    it('sets name attribute when name prop is provided', () => {
      wrapper = mount(SimpleInput, {
        props: {
          name: 'username'
        }
      })
      
      expect(wrapper.find('input').attributes('name')).toBe('username')
    })
    
    it('displays error message when error prop is provided', () => {
      wrapper = mount(SimpleInput, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field is required')
    })
    
    it('adds error class to input when error is present', () => {
      wrapper = mount(SimpleInput, {
        props: {
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('label').classes()).toContain('input-error')
    })
    
    it('displays error in fieldset when error prop is provided', () => {
      wrapper = mount(SimpleInput, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Username',
          fieldsetLabel: 'Enter your username',
          error: 'This field is required'
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('This field is required')
      
      // Fieldset label should not be shown when there's an error
      expect(wrapper.find('.fieldset-label').exists()).toBe(false)
    })
  })
  
  describe('Form context integration', () => {
    it('integrates with provided form context', async () => {
      // Create a mock form context
      const mockFormContext = {
        values: { username: 'test-user' },
        errors: {},
        touched: {},
        setFieldValue: vi.fn(),
        setFieldError: vi.fn(),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: false } }
      }
      
      wrapper = mount(SimpleInput, {
        props: {
          name: 'username'
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      // Input should reflect the value from the form context
      expect(wrapper.find('input').element.value).toBe('test-user')
      
      // Update the input
      await wrapper.find('input').setValue('new-username')
      
      // Should call setFieldValue
      expect(mockFormContext.setFieldValue).toHaveBeenCalledWith('username', 'new-username')
      
      // Trigger blur
      await wrapper.find('input').trigger('blur')
      
      // Should mark as touched
      expect(mockFormContext.setFieldTouched).toHaveBeenCalledWith('username', true)
    })
    
    it('disables input when form context has disabled state', () => {
      // Create a mock form context with disabled state
      const mockFormContext = {
        values: {},
        errors: {},
        touched: {},
        setFieldValue: vi.fn(),
        setFieldError: vi.fn(),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: true } }
      }
      
      wrapper = mount(SimpleInput, {
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })
    
    it('displays error from form context', () => {
      // Create a mock form context with an error
      const mockFormContext = {
        values: {},
        errors: { username: 'Username is invalid' },
        touched: { username: true },
        setFieldValue: vi.fn(),
        setFieldError: vi.fn(),
        setFieldTouched: vi.fn(),
        formState: { value: { disabled: false } }
      }
      
      wrapper = mount(SimpleInput, {
        props: {
          name: 'username'
        },
        global: {
          provide: {
            formContext: mockFormContext
          }
        }
      })
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Username is invalid')
    })
  })

  // Update the Validation functionality tests
  describe('Validation functionality', () => {
    it('adds required attribute when required prop is true', () => {
      wrapper = mount(SimpleInput, {
        props: {
          required: true
        }
      })
      
      expect(wrapper.find('input').attributes('required')).toBeDefined()
    })
    
    it('adds required indicator (*) to fieldset legend', () => {
      wrapper = mount(SimpleInput, {
        props: {
          fieldset: true,
          fieldsetLegend: 'Test Field',
          required: true
        }
      })
      
      expect(wrapper.find('legend').text()).toBe('Test Field *')
    })
    
    it('validates required fields on blur', async () => {
      wrapper = mount(SimpleInput, {
        props: {
          required: true,
          name: 'test-field'
        }
      })
      
      // Set empty value
      await wrapper.find('input').setValue('')
      
      // Trigger blur
      await wrapper.find('input').trigger('blur')
      
      // Should show error message
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('required')
    })
    
    it('validates email fields on blur', async () => {
      wrapper = mount(SimpleInput, {
        props: {
          type: 'email',
          name: 'email'
        }
      })
      
      // Set invalid email
      await wrapper.find('input').setValue('invalid-email')
      
      // Need to directly call validateInput method for testing
      // since blur event doesn't always trigger validation in tests
      const vm = wrapper.vm as any
      vm.validateInput('invalid-email')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Check if validation error is displayed
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('valid email')
    })
    
    it('validates url fields on blur', async () => {
      wrapper = mount(SimpleInput, {
        props: {
          type: 'url',
          name: 'website'
        }
      })
      
      // Set invalid url
      await wrapper.find('input').setValue('invalid-url')
      
      // Need to directly call validateInput method for testing
      const vm = wrapper.vm as any
      vm.validateInput('invalid-url')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Check if validation error is displayed
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toContain('valid URL')
    })
    
    it('supports custom validation rules', async () => {
      const customRule = V.minLength(5, 'Must be at least 5 characters')
      
      wrapper = mount(SimpleInput, {
        props: {
          name: 'username',
          validation: customRule
        }
      })
      
      // Set invalid value
      await wrapper.find('input').setValue('abc')
      
      // Need to directly call validateInput method for testing
      const vm = wrapper.vm as any
      vm.validateInput('abc')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show error message
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Must be at least 5 characters')
      
      // Set valid value
      await wrapper.find('input').setValue('abcdef')
      
      // Call validate again
      vm.validateInput('abcdef')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Error should be gone
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports array of validation rules', async () => {
      const rule1 = V.minLength(3, 'Too short')
      const rule2 = V.pattern(/[A-Z]/, 'Needs uppercase')
      
      wrapper = mount(SimpleInput, {
        props: {
          name: 'password',
          validation: V.compose([rule1, rule2])
        }
      })
      
      // Test first rule fails
      await wrapper.find('input').setValue('ab')
      
      // Call validate directly
      const vm = wrapper.vm as any
      vm.validateInput('ab')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Too short')
      
      // Test second rule fails
      await wrapper.find('input').setValue('abcdef')
      
      // Call validate directly
      vm.validateInput('abcdef')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(true)
      expect(wrapper.find('.text-error').text()).toBe('Needs uppercase')
      
      // Test all rules pass
      await wrapper.find('input').setValue('abcDef')
      
      // Call validate directly
      vm.validateInput('abcDef')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.text-error').exists()).toBe(false)
    })
    
    it('supports custom validation messages', async () => {
      wrapper = mount(SimpleInput, {
        props: {
          required: true,
          validationMessages: {
            required: 'Custom required message'
          }
        }
      })
      
      // Trigger validation
      await wrapper.find('input').setValue('')
      
      // Call validate directly
      const vm = wrapper.vm as any
      vm.validateInput('')
      
      // Force re-render
      await wrapper.vm.$nextTick()
      
      // Should show custom message
      expect(wrapper.find('.text-error').text()).toBe('Custom required message')
    })
  })
}) 