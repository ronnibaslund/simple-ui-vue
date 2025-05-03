import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SimpleAccordion from '../SimpleAccordion.vue'
import SimpleAccordionPanel from '../../SimpleAccordionPanel/SimpleAccordionPanel.vue'

describe('SimpleAccordion', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: 'Accordion content'
      }
    })
    
    expect(wrapper.text()).toContain('Accordion content')
    expect(wrapper.classes()).toContain('join')
    expect(wrapper.classes()).toContain('join-vertical')
  })

  it('allows only one panel open by default', async () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: [
          '<simple-accordion-panel title="Panel 1">Content 1</simple-accordion-panel>',
          '<simple-accordion-panel title="Panel 2">Content 2</simple-accordion-panel>'
        ]
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panels = wrapper.findAllComponents(SimpleAccordionPanel)
    expect(panels.length).toBe(2)

    // No panels should be open initially
    expect(wrapper.html()).not.toContain('collapse-open')

    // Click first panel's title to open it
    await panels[0].find('.collapse-title').trigger('click')
    await nextTick()
    
    // First panel should be open
    expect(panels[0].classes()).toContain('collapse-open')
    expect(panels[1].classes()).not.toContain('collapse-open')

    // Click second panel's title to open it
    await panels[1].find('.collapse-title').trigger('click')
    await nextTick()
    
    // Second panel should be open, first should be closed
    expect(panels[0].classes()).not.toContain('collapse-open')
    expect(panels[1].classes()).toContain('collapse-open')
  })

  it('allows multiple panels open when multipleOpen is true', async () => {
    const wrapper = mount(SimpleAccordion, {
      props: {
        multipleOpen: true
      },
      slots: {
        default: [
          '<simple-accordion-panel title="Panel 1">Content 1</simple-accordion-panel>',
          '<simple-accordion-panel title="Panel 2">Content 2</simple-accordion-panel>'
        ]
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panels = wrapper.findAllComponents(SimpleAccordionPanel)
    
    // Click first panel's title to open it
    await panels[0].find('.collapse-title').trigger('click')
    await nextTick()
    
    // First panel should be open
    expect(panels[0].classes()).toContain('collapse-open')
    
    // Click second panel's title to open it
    await panels[1].find('.collapse-title').trigger('click')
    await nextTick()
    
    // Both panels should be open
    expect(panels[0].classes()).toContain('collapse-open')
    expect(panels[1].classes()).toContain('collapse-open')
  })

  it('closes open panels when multipleOpen changes from true to false', async () => {
    const wrapper = mount(SimpleAccordion, {
      props: {
        multipleOpen: true
      },
      slots: {
        default: [
          '<simple-accordion-panel title="Panel 1">Content 1</simple-accordion-panel>',
          '<simple-accordion-panel title="Panel 2">Content 2</simple-accordion-panel>'
        ]
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panels = wrapper.findAllComponents(SimpleAccordionPanel)
    
    // Open both panels
    await panels[0].find('.collapse-title').trigger('click')
    await panels[1].find('.collapse-title').trigger('click')
    await nextTick()
    
    // Both panels should be open
    expect(panels[0].classes()).toContain('collapse-open')
    expect(panels[1].classes()).toContain('collapse-open')
    
    // Change multipleOpen to false
    await wrapper.setProps({ multipleOpen: false })
    await nextTick()
    
    // Only the last opened panel should remain open
    const openPanelsCount = wrapper.findAll('.collapse-open').length
    expect(openPanelsCount).toBe(1)
  })

  it('allows closing an open panel by clicking it again', async () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: [
          '<simple-accordion-panel title="Panel 1">Content 1</simple-accordion-panel>'
        ]
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    const panel = wrapper.findComponent(SimpleAccordionPanel)
    
    // Open the panel by clicking the title div
    await panel.find('.collapse-title').trigger('click')
    await nextTick()
    
    // Panel should be open
    expect(panel.classes()).toContain('collapse-open')
    
    // Click the panel again to close it
    await panel.find('.collapse-title').trigger('click')
    await nextTick()
    
    // Panel should be closed
    expect(panel.classes()).not.toContain('collapse-open')
  })

  it('renders checked panel as open initially', async () => {
    const wrapper = mount(SimpleAccordion, {
      slots: {
        default: [
          '<simple-accordion-panel title="Panel 1" checked>Content 1</simple-accordion-panel>',
          '<simple-accordion-panel title="Panel 2">Content 2</simple-accordion-panel>'
        ]
      },
      global: {
        components: {
          SimpleAccordionPanel
        }
      }
    })

    await nextTick()
    const panels = wrapper.findAllComponents(SimpleAccordionPanel)
    
    // First panel should be open because it has checked prop
    expect(panels[0].classes()).toContain('collapse-open')
    // Second panel should be closed
    expect(panels[1].classes()).not.toContain('collapse-open')
  })
}) 