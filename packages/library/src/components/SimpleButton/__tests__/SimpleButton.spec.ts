import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleButton from '../SimpleButton.vue'
import SimpleLoading from '../../SimpleLoading/SimpleLoading.vue'
import type { ColorsBrand, ColorsState, Sizes } from '../../../globals'

// Mock the SimpleLoading component
vi.mock('../../SimpleLoading/SimpleLoading.vue', () => ({
  default: {
    name: 'SimpleLoading',
    props: ['size'],
    template: '<div class="mock-loading" :data-size="size"></div>'
  }
}))

// Define types for button properties
type ButtonColor = ColorsBrand | ColorsState | 'ghost' | 'link'
type ButtonSize = Sizes
type ButtonType = 'button' | 'submit' | 'reset'

describe('SimpleButton', () => {
  let wrapper;

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null;
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleButton, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.find('button').classes()).toContain('btn')
  })

  it('applies color classes correctly', () => {
    const colors: ButtonColor[] = ['neutral', 'primary', 'secondary', 'accent', 'error', 'warning', 'success', 'info', 'ghost', 'link']
    
    colors.forEach(color => {
      wrapper = mount(SimpleButton, {
        props: { color }
      })
      
      expect(wrapper.find('button').classes()).toContain(`btn-${color}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes: ButtonSize[] = ['lg', 'sm', 'xs']
    
    sizes.forEach(size => {
      wrapper = mount(SimpleButton, {
        props: { size }
      })
      
      expect(wrapper.find('button').classes()).toContain(`btn-${size}`)
    })
  })

  it('applies outline style when outline prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { outline: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-outline')
  })

  it('applies wide style when wide prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { wide: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-wide')
  })

  it('applies square style when square prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { square: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-square')
  })

  it('applies circle style when circle prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { circle: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-circle')
  })

  it('applies glass style when glass prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { glass: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('glass')
  })

  it('applies active state when active prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { active: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-active')
  })

  it('applies dashed style when dashed prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { dashed: true }
    })
    
    expect(wrapper.find('button').classes()).toContain('btn-dash')
  })

  it('displays loading indicator when loading prop is true', () => {
    wrapper = mount(SimpleButton, {
      props: { loading: true },
      global: {
        stubs: {
          SimpleLoading: true
        }
      }
    })
    
    expect(wrapper.findComponent({ name: 'SimpleLoading' }).exists()).toBe(true)
  })

  it('applies type attribute correctly', () => {
    const types: ButtonType[] = ['button', 'submit', 'reset']
    
    types.forEach(type => {
      wrapper = mount(SimpleButton, {
        props: { type }
      })
      
      expect(wrapper.find('button').attributes('type')).toBe(type)
    })
  })

  it('emits click event when clicked', async () => {
    wrapper = mount(SimpleButton)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click').length).toBe(1)
  })

  it('does not emit click event when disabled', async () => {
    // Note: In HTML, buttons with a disabled attribute don't emit click events,
    // but in a test environment we need to check this programmatically
    
    const clickHandler = vi.fn()
    
    wrapper = mount(SimpleButton, {
      attrs: {
        disabled: true,
        onClick: clickHandler
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(clickHandler).not.toHaveBeenCalled()
  })

  it('does not emit click event when loading', async () => {
    wrapper = mount(SimpleButton, {
      props: {
        loading: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('combines multiple style props correctly', () => {
    wrapper = mount(SimpleButton, {
      props: {
        color: 'primary',
        size: 'lg',
        outline: true,
        wide: true
      }
    })
    
    const buttonClasses = wrapper.find('button').classes()
    expect(buttonClasses).toContain('btn-primary')
    expect(buttonClasses).toContain('btn-lg')
    expect(buttonClasses).toContain('btn-outline')
    expect(buttonClasses).toContain('btn-wide')
  })

  it('renders slot content correctly', () => {
    wrapper = mount(SimpleButton, {
      slots: {
        default: '<span data-testid="custom-content">Custom Content</span>'
      }
    })
    
    expect(wrapper.find('[data-testid="custom-content"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="custom-content"]').text()).toBe('Custom Content')
  })
}) 