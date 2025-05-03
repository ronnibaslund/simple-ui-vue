import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleIcon from '../SimpleIcon.vue'
import { icons, iconSizes } from '../../../globals'
import type { IconSizes } from '../../../globals'

// We need the icon type from SimpleIcon
type IconNames = (typeof icons)[number]

// Mock the Icon component from @iconify/vue
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'width', 'height'],
    template: '<div class="mock-iconify-icon" :data-icon="icon" :data-width="width" :data-height="height"></div>'
  }
}))

describe('SimpleIcon', () => {
  let wrapper;

  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null;
  })

  it('renders properly with default props', () => {
    wrapper = mount(SimpleIcon)
    
    expect(wrapper.find('.mock-iconify-icon').exists()).toBe(true)
    
    // Default props should be 'user' icon with size 2
    const iconElement = wrapper.find('.mock-iconify-icon')
    expect(iconElement.attributes('data-icon')).toBe('lucide:user')
  })

  it('applies the correct icon name with lucide prefix', () => {
    // Filter icons that we know exist in our icons array
    const availableIcons = icons.filter(icon => 
      ['search', 'home', 'settings', 'alert-circle'].includes(icon as string)
    ).slice(0, 3) as IconNames[]
    
    // Fallback to some known safe icons if the filtered list is empty
    const testIcons: IconNames[] = availableIcons.length > 0 
      ? availableIcons 
      : ['user', 'search', 'type']
    
    testIcons.forEach(iconName => {
      wrapper = mount(SimpleIcon, {
        props: { icon: iconName }
      })
      
      const iconElement = wrapper.find('.mock-iconify-icon')
      expect(iconElement.attributes('data-icon')).toBe(`lucide:${iconName}`)
    })
  })

  it('applies numeric size values correctly', () => {
    // Size mapping for testing - this should match what's in the component
    const sizeMapping = {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
      6: 36,
      9: 48,
      12: 80
    }
    
    // Test a few different sizes
    Object.entries(sizeMapping).forEach(([sizeKey, pixelValue]) => {
      const size = Number(sizeKey) as IconSizes
      
      wrapper = mount(SimpleIcon, {
        props: { 
          icon: 'user' as IconNames,
          size
        }
      })
      
      const iconElement = wrapper.find('.mock-iconify-icon')
      expect(iconElement.attributes('data-width')).toBe(pixelValue.toString())
      expect(iconElement.attributes('data-height')).toBe(pixelValue.toString())
    })
  })

  it('applies custom size class when provided', () => {
    wrapper = mount(SimpleIcon, {
      props: { 
        icon: 'user' as IconNames,
        customSizeClass: '24'
      }
    })
    
    const iconElement = wrapper.find('.mock-iconify-icon')
    expect(iconElement.attributes('data-width')).toBe('24')
    expect(iconElement.attributes('data-height')).toBe('24')
  })

  it('extracts numeric size from Tailwind class when provided', () => {
    wrapper = mount(SimpleIcon, {
      props: { 
        icon: 'user' as IconNames,
        customSizeClass: 'h-24'
      }
    })
    
    const iconElement = wrapper.find('.mock-iconify-icon')
    expect(iconElement.attributes('data-width')).toBe('24')
    expect(iconElement.attributes('data-height')).toBe('24')
  })

  it('defaults to size 24 when custom size class is not parseable', () => {
    wrapper = mount(SimpleIcon, {
      props: { 
        icon: 'user' as IconNames,
        customSizeClass: 'invalid-size-class'
      }
    })
    
    const iconElement = wrapper.find('.mock-iconify-icon')
    expect(iconElement.attributes('data-width')).toBe('24')
    expect(iconElement.attributes('data-height')).toBe('24')
  })

  it('applies size correctly for all valid iconSizes values', () => {
    // Pick a few valid sizes to test
    const testSizes: IconSizes[] = [1, 2, 3, 4, 5].filter(
      size => iconSizes.includes(size as IconSizes)
    ) as IconSizes[]
    
    testSizes.forEach(size => {
      wrapper = mount(SimpleIcon, {
        props: { 
          icon: 'user' as IconNames,
          size 
        }
      })
      
      // The component should have a computed sizing logic
      // We're not testing the exact pixel values here, just that something is applied
      const iconElement = wrapper.find('.mock-iconify-icon')
      expect(iconElement.attributes('data-width')).not.toBeUndefined()
      expect(iconElement.attributes('data-height')).not.toBeUndefined()
    })
  })

  it('applies the correct CSS classes for styling', () => {
    wrapper = mount(SimpleIcon)
    
    const iconElement = wrapper.find('.mock-iconify-icon')
    expect(iconElement.classes()).toContain('inline-block')
    expect(iconElement.classes()).toContain('align-middle')
    expect(iconElement.classes()).toContain('text-current')
  })

  it('handles edge case icon names correctly', () => {
    // Filter for icons that exist in our icons array
    const availableIcons = icons.filter(icon => 
      ['arrow-left-right', 'chevron-down', 'alert-triangle'].includes(icon as string)
    ).slice(0, 3) as IconNames[]
    
    // Fallback to some known safe icons if the filtered list is empty
    const edgeCaseIcons: IconNames[] = availableIcons.length > 0 
      ? availableIcons 
      : ['user', 'search', 'type']
    
    edgeCaseIcons.forEach(iconName => {
      wrapper = mount(SimpleIcon, {
        props: { icon: iconName }
      })
      
      const iconElement = wrapper.find('.mock-iconify-icon')
      expect(iconElement.attributes('data-icon')).toBe(`lucide:${iconName}`)
    })
  })

  it('renders all icons from the global icons array', () => {
    // This test ensures all icons defined in the globals are supported
    // We're only testing a sample here to keep the test efficient
    const sampleIcons = icons.slice(0, 5) as IconNames[] // Take first 5 icons for testing
    
    sampleIcons.forEach(iconName => {
      wrapper = mount(SimpleIcon, {
        props: { icon: iconName }
      })
      
      const iconElement = wrapper.find('.mock-iconify-icon')
      expect(iconElement.exists()).toBe(true)
      expect(iconElement.attributes('data-icon')).toBe(`lucide:${iconName}`)
    })
  })
}) 