import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleInput from '../SimpleInput.vue'
import SimpleIcon from '../../SimpleIcon/SimpleIcon.vue'

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
}) 