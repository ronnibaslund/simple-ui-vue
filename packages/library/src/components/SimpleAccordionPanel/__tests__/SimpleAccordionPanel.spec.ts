import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import SimpleAccordion from '../../SimpleAccordion/SimpleAccordion.vue'
import SimpleAccordionPanel from '../SimpleAccordionPanel.vue'

describe('SimpleAccordionPanel', () => {
  it('throws error when used outside of SimpleAccordion', () => {
    expect(() => {
      mount(SimpleAccordionPanel, {
        props: {
          title: 'Test Panel'
        }
      })
    }).toThrow('SimpleAccordionPanel must be used within a SimpleAccordion')
  })

  it('renders with title prop', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.text()).toContain('Test Panel')
    expect(panel.text()).toContain('Panel content')
  })

  it('uses title slot instead of title prop when both are provided', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: `
          <simple-accordion-panel title="Test Panel">
            <template #title>Custom Title</template>
            Panel content
          </simple-accordion-panel>
        `
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.text()).toContain('Custom Title')
    expect(panel.text()).not.toContain('Test Panel')
    expect(panel.text()).toContain('Panel content')
  })

  it('toggles open/close state when title div is clicked', async () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.classes()).not.toContain('collapse-open')

    // Open the panel by clicking the title div
    await panel.find('.collapse-title').trigger('click')
    await nextTick()
    expect(panel.classes()).toContain('collapse-open')

    // Close the panel by clicking the title div again
    await panel.find('.collapse-title').trigger('click')
    await nextTick()
    expect(panel.classes()).not.toContain('collapse-open')
  })

  it('has correct class structure for DaisyUI styling', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    
    // Check main element classes
    expect(panel.classes()).toContain('collapse')
    expect(panel.classes()).toContain('collapse-arrow')
    expect(panel.classes()).toContain('join-item')
    expect(panel.classes()).toContain('border')
    expect(panel.classes()).toContain('border-base-300')
    expect(panel.classes()).toContain('bg-base-100')
    
    // Check elements exist
    expect(panel.find('input[type="radio"]').exists()).toBe(true)
    expect(panel.find('.collapse-title').exists()).toBe(true)
    expect(panel.find('.collapse-content').exists()).toBe(true)
  })

  it('starts open when checked prop is true', async () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel" checked>Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    await nextTick()
    
    // Panel should be open because of checked prop
    expect(panel.classes()).toContain('collapse-open')
    expect(panel.find('input[type="radio"]').attributes('checked')).toBeDefined()
  })

  it('renders with plus icon when icon prop is "plus"', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel" icon="plus">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.classes()).toContain('collapse-plus')
    expect(panel.classes()).not.toContain('collapse-arrow')
  })

  it('renders with arrow icon when icon prop is "arrow"', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel" icon="arrow">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.classes()).toContain('collapse-arrow')
    expect(panel.classes()).not.toContain('collapse-plus')
  })

  it('renders without icon when icon prop is "none"', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: '<simple-accordion-panel title="Test Panel" icon="none">Panel content</simple-accordion-panel>'
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    expect(panel.classes()).not.toContain('collapse-arrow')
    expect(panel.classes()).not.toContain('collapse-plus')
  })
}) 