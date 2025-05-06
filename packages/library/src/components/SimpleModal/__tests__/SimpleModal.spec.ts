import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleModal from '../SimpleModal.vue'

// Mock the SimpleIcon and SimpleButton components
vi.mock('../../SimpleIcon/SimpleIcon.vue', () => ({
  default: {
    name: 'SimpleIcon',
    props: ['icon', 'size'],
    template: '<div class="mock-icon" :data-icon="icon" :data-size="size"></div>'
  }
}))

vi.mock('../../SimpleButton/SimpleButton.vue', () => ({
  default: {
    name: 'SimpleButton',
    props: ['color', 'type', 'outline', 'wide', 'loading'],
    template: '<button class="mock-button" :class="color" :type="type"><slot /></button>'
  }
}))

describe('SimpleModal', () => {
  let wrapper;
  
  beforeEach(() => {
    // Reset the wrapper before each test
    wrapper = null;
    
    // Mock the HTMLDialogElement methods
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  })
  
  it('renders properly with default props', () => {
    wrapper = mount(SimpleModal)
    
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.find('.modal-box').exists()).toBe(true)
  })
  
  it('generates a unique modal ID when not provided', () => {
    wrapper = mount(SimpleModal)
    
    const dialogEl = wrapper.find('dialog')
    expect(dialogEl.attributes('id')).toMatch(/modal-[a-z0-9]{9}/)
  })
  
  it('uses the provided ID when specified', () => {
    const testId = 'test-modal-id'
    wrapper = mount(SimpleModal, {
      props: {
        id: testId
      }
    })
    
    const dialogEl = wrapper.find('dialog')
    expect(dialogEl.attributes('id')).toBe(testId)
  })
  
  it('renders the title when provided', () => {
    const testTitle = 'Test Modal Title'
    wrapper = mount(SimpleModal, {
      props: {
        title: testTitle
      }
    })
    
    expect(wrapper.find('h3').text()).toBe(testTitle)
  })
  
  it('doesn\'t render title section when no title is provided', () => {
    wrapper = mount(SimpleModal)
    
    expect(wrapper.find('h3').exists()).toBe(false)
  })
  
  it('renders an icon when icon prop is provided', () => {
    wrapper = mount(SimpleModal, {
      props: {
        title: 'Modal with Icon',
        icon: 'user'
      }
    })
    
    const icon = wrapper.find('.mock-icon')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('data-icon')).toBe('user')
  })
  
  it('applies the correct icon size when provided', () => {
    wrapper = mount(SimpleModal, {
      props: {
        title: 'Modal with Icon',
        icon: 'user',
        iconSize: 3
      }
    })
    
    const icon = wrapper.find('.mock-icon')
    expect(icon.attributes('data-size')).toBe('3')
  })
  
  it('defaults to icon size 2 when not specified', () => {
    wrapper = mount(SimpleModal, {
      props: {
        title: 'Modal with Icon',
        icon: 'user'
      }
    })
    
    const icon = wrapper.find('.mock-icon')
    expect(icon.attributes('data-size')).toBe('2')
  })
  
  it('renders default content in the slot', () => {
    const slotContent = 'This is modal content'
    wrapper = mount(SimpleModal, {
      slots: {
        default: slotContent
      }
    })
    
    expect(wrapper.text()).toContain(slotContent)
  })
  
  it('renders custom icon through slot', () => {
    const customIconSlot = '<div class="custom-icon">Custom Icon</div>'
    wrapper = mount(SimpleModal, {
      props: {
        title: 'Modal with Custom Icon'
      },
      slots: {
        icon: customIconSlot
      }
    })
    
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })
  
  it('renders a single close button by default', () => {
    wrapper = mount(SimpleModal)
    
    const buttons = wrapper.findAll('.mock-button')
    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Close')
    expect(buttons[0].attributes('type')).toBe('button')
  })
  
  it('renders cancel button when showCancelButton is true', () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true
      }
    })
    
    const cancelButton = wrapper.findAll('.mock-button').find(btn => btn.text() === 'Cancel')
    expect(cancelButton).toBeTruthy()
    expect(cancelButton.attributes('type')).toBe('button')
  })
  
  it('uses custom cancel button text when provided', () => {
    const cancelText = 'Dismiss'
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true,
        cancelButtonText: cancelText
      }
    })
    
    const cancelButton = wrapper.findAll('.mock-button').find(btn => btn.text() === cancelText)
    expect(cancelButton).toBeTruthy()
  })
  
  it('renders create button when showCreateButton is true', () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCreateButton: true
      }
    })
    
    const createButton = wrapper.findAll('.mock-button').find(btn => btn.text() === 'Create')
    expect(createButton).toBeTruthy()
    expect(createButton.attributes('type')).toBe('button')
  })
  
  it('uses custom create button text when provided', () => {
    const createText = 'Submit'
    wrapper = mount(SimpleModal, {
      props: {
        showCreateButton: true,
        createButtonText: createText
      }
    })
    
    const createButton = wrapper.findAll('.mock-button').find(btn => btn.text() === createText)
    expect(createButton).toBeTruthy()
  })
  
  it('applies the correct button types when specified', () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true,
        showCreateButton: true,
        cancelButtonType: 'reset',
        createButtonType: 'submit'
      }
    })
    
    const buttons = wrapper.findAll('.mock-button')
    const cancelButton = buttons.find(btn => btn.text() === 'Cancel')
    const createButton = buttons.find(btn => btn.text() === 'Create')
    
    expect(cancelButton.attributes('type')).toBe('reset')
    expect(createButton.attributes('type')).toBe('submit')
  })
  
  it('maps button color classes correctly with btn- prefix', () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true,
        showCreateButton: true,
        cancelButtonColor: 'btn-error',
        createButtonColor: 'btn-success'
      }
    })
    
    const buttons = wrapper.findAll('.mock-button')
    const cancelButton = buttons.find(btn => btn.text() === 'Cancel')
    const createButton = buttons.find(btn => btn.text() === 'Create')
    
    expect(cancelButton.classes()).toContain('error')
    expect(createButton.classes()).toContain('success')
  })
  
  it('accepts direct color names without btn- prefix', () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true,
        showCreateButton: true,
        cancelButtonColor: 'error',
        createButtonColor: 'success'
      }
    })
    
    const buttons = wrapper.findAll('.mock-button')
    const cancelButton = buttons.find(btn => btn.text() === 'Cancel')
    const createButton = buttons.find(btn => btn.text() === 'Create')
    
    expect(cancelButton.classes()).toContain('error')
    expect(createButton.classes()).toContain('success')
  })
  
  it('renders custom action buttons using slot', () => {
    const actionsSlot = `
      <button class="custom-cancel-btn">Custom Cancel</button>
      <button class="custom-submit-btn">Custom Submit</button>
    `
    wrapper = mount(SimpleModal, {
      slots: {
        actions: actionsSlot
      }
    })
    
    expect(wrapper.find('.custom-cancel-btn').exists()).toBe(true)
    expect(wrapper.find('.custom-submit-btn').exists()).toBe(true)
    expect(wrapper.findAll('.mock-button').length).toBe(0) // No default buttons
  })
  
  it('shows backdrop button when closeOnClickOutside is true', () => {
    wrapper = mount(SimpleModal, {
      props: {
        closeOnClickOutside: true
      }
    })
    
    expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
  })
  
  it('doesn\'t show backdrop button when closeOnClickOutside is false', () => {
    wrapper = mount(SimpleModal, {
      props: {
        closeOnClickOutside: false
      }
    })
    
    expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
  })
  
  it('exposes showModal method', async () => {
    wrapper = mount(SimpleModal)
    
    await wrapper.vm.showModal()
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
  })
  
  it('exposes closeModal method', async () => {
    wrapper = mount(SimpleModal)
    
    await wrapper.vm.closeModal()
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
    expect(wrapper.emitted('close')).toBeTruthy()
  })
  
  it('emits cancel event when cancel button is clicked', async () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCancelButton: true
      }
    })
    
    const cancelButton = wrapper.findAll('.mock-button').find(btn => btn.text() === 'Cancel')
    await cancelButton.trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
  })
  
  it('emits create event when create button is clicked', async () => {
    wrapper = mount(SimpleModal, {
      props: {
        showCreateButton: true
      }
    })
    
    const createButton = wrapper.findAll('.mock-button').find(btn => btn.text() === 'Create')
    await createButton.trigger('click')
    
    expect(wrapper.emitted('create')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
  })
  
  it('emits close event when default close button is clicked', async () => {
    wrapper = mount(SimpleModal)
    
    const closeButton = wrapper.findAll('.mock-button').find(btn => btn.text() === 'Close')
    await closeButton.trigger('click')
    
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
  })
}) 