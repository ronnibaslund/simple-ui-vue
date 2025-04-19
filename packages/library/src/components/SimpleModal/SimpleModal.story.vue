<script setup lang="ts">
import { ref, reactive } from 'vue'
import SimpleModal from './SimpleModal.vue'
import SimpleIcon from '../SimpleIcon/SimpleIcon.vue'
import SimpleButton from '../SimpleButton/SimpleButton.vue'

const basicModalRef = ref(null)
const customModalRef = ref(null)
const slotModalRef = ref(null)
const iconModalRef = ref(null)
const colorButtonsModalRef = ref(null)
const submitFormModalRef = ref(null)

// State to track events
const eventState = reactive({
  lastEvent: null,
  formSubmitted: false
})

const showBasicModal = () => {
  basicModalRef.value?.showModal()
}

const showCustomModal = () => {
  customModalRef.value?.showModal()
}

const showSlotModal = () => {
  slotModalRef.value?.showModal()
}

const showIconModal = () => {
  iconModalRef.value?.showModal()
}

const showColorButtonsModal = () => {
  colorButtonsModalRef.value?.showModal()
}

const showSubmitFormModal = () => {
  submitFormModalRef.value?.showModal()
  // Reset form submission state
  eventState.formSubmitted = false
}

/**
 * Handle create button click
 * Updates event state for display
 */
const handleCreate = () => {
  console.log('Create button clicked')
  eventState.lastEvent = { type: 'create', time: new Date().toISOString() }
}

/**
 * Handle cancel button click
 * Updates event state for display
 */
const handleCancel = () => {
  console.log('Cancel button clicked')
  eventState.lastEvent = { type: 'cancel', time: new Date().toISOString() }
}

/**
 * Handle form submission
 */
const handleFormSubmit = (e) => {
  e.preventDefault() // Prevent actual form submission
  eventState.formSubmitted = true
  console.log('Form submitted')
}
</script>

<template>
  <Story
    :layout="{ type: 'grid', width: '100%' }"
    title="SimpleModal"
    :description="
      'A flexible modal dialog component built with daisyUI\'s HTML dialog element. ' +
      'Supports icons, custom buttons, and various customization options.'
    "
  >
    <Variant 
      title="Basic Modal" 
      description="The most basic modal with just a title and close button."
    >
      <SimpleButton color="primary" @click="showBasicModal">Open Basic Modal</SimpleButton>
      <SimpleModal 
        ref="basicModalRef" 
        title="Basic Modal"
        closeOnClickOutside
      >
        This is a basic modal with default close button.
      </SimpleModal>
    </Variant>

    <Variant 
      title="Modal with Custom Buttons" 
      description="Modal with custom buttons that emit events when clicked."
    >
      <SimpleButton color="secondary" @click="showCustomModal">Open Custom Modal</SimpleButton>
      <SimpleModal 
        ref="customModalRef" 
        title="Custom Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonText="Dismiss"
        createButtonText="Confirm"
        @cancel="handleCancel"
        @create="handleCreate"
      >
        <div>
          <p>This modal has custom buttons with event handlers.</p>
          <p class="mt-2 text-sm text-info">Last event: {{ eventState.lastEvent ? JSON.stringify(eventState.lastEvent) : 'None' }}</p>
        </div>
      </SimpleModal>
    </Variant>

    <Variant 
      title="Modal with Form Submit Button" 
      description="Modal with a form that uses a submit type button."
    >
      <SimpleButton color="primary" @click="showSubmitFormModal">Open Form Modal</SimpleButton>
      <SimpleModal 
        ref="submitFormModalRef" 
        title="Form Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonText="Cancel"
        createButtonText="Submit Form"
        createButtonType="submit"
      >
        <form @submit="handleFormSubmit">
          <div class="flex flex-col gap-4">
            <p>This modal demonstrates a form with a submit button.</p>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your name" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" placeholder="email@example.com" class="input input-bordered" required />
            </div>
            
            <p v-if="eventState.formSubmitted" class="text-success">
              Form submitted successfully!
            </p>
          </div>
          
          <!-- Custom action buttons with form submission -->
          <template #actions>
            <SimpleButton 
              color="neutral" 
              class="mr-2"
              type="button" 
              @click="() => { 
                handleCancel();
                submitFormModalRef.showModal(); 
              }"
            >
              Cancel
            </SimpleButton>
            <SimpleButton 
              color="success" 
              type="submit"
            >
              Submit
            </SimpleButton>
          </template>
        </form>
      </SimpleModal>
    </Variant>

    <Variant 
      title="Modal with Icon" 
      description="Modal with an icon before the title."
    >
      <SimpleButton color="info" @click="showIconModal">Open Modal with Icon</SimpleButton>
      <SimpleModal 
        ref="iconModalRef" 
        title="Modal with Icon"
        icon="message-circle"
        :iconSize="3"
        :showCancelButton="true"
        :showCreateButton="true"
      >
        This modal includes an icon before its title.
      </SimpleModal>
    </Variant>

    <Variant 
      title="Modal with Custom Button Colors" 
      description="Modal with customized button colors."
    >
      <SimpleButton color="warning" @click="showColorButtonsModal">Open Modal with Colored Buttons</SimpleButton>
      <SimpleModal 
        ref="colorButtonsModalRef" 
        title="Custom Button Colors"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="btn-error"
        createButtonColor="btn-success"
        cancelButtonText="Delete"
        createButtonText="Save"
      >
        This modal has custom colored buttons.
      </SimpleModal>
    </Variant>

    <Variant 
      title="Modal with Custom Content" 
      description="Modal with custom content and custom icon implementation using slots."
    >
      <SimpleButton color="accent" @click="showSlotModal">Open Content Modal</SimpleButton>
      <SimpleModal 
        ref="slotModalRef" 
        title="Rich Content Modal"
        :showCancelButton="true"
        closeOnClickOutside
      >
        <div class="flex flex-col gap-4">
          <p>This modal demonstrates rich content using slots.</p>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email@example.com" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" />
          </div>
        </div>

        <template #icon>
          <SimpleIcon icon="user" :size="3" />
        </template>

        <template #actions>
          <SimpleButton color="neutral" outline>Cancel</SimpleButton>
          <SimpleButton color="primary" class="ml-2">Login</SimpleButton>
        </template>
      </SimpleModal>
    </Variant>
  </Story>
</template>
