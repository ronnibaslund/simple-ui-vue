<script setup lang="ts">
import { ref } from 'vue'
import SimpleModal from './SimpleModal.vue'

// Basic modal references
const basicModalRef = ref(null)
const customModalRef = ref(null)
const slotModalRef = ref(null)

// Color variants references
const primaryModalRef = ref(null)
const secondaryModalRef = ref(null)
const errorModalRef = ref(null)
const successModalRef = ref(null)
const infoModalRef = ref(null)

// Icon modal references
const iconModalRef = ref(null)

// Type references
const submitTypeModalRef = ref(null)

// Click outside modal
const clickOutsideModalRef = ref(null)
const noClickOutsideModalRef = ref(null)

// Show methods for each modal
const showBasicModal = () => {
  basicModalRef.value?.showModal()
}

const showCustomModal = () => {
  customModalRef.value?.showModal()
}

const showSlotModal = () => {
  slotModalRef.value?.showModal()
}

const showPrimaryModal = () => {
  primaryModalRef.value?.showModal()
}

const showSecondaryModal = () => {
  secondaryModalRef.value?.showModal()
}

const showErrorModal = () => {
  errorModalRef.value?.showModal()
}

const showSuccessModal = () => {
  successModalRef.value?.showModal()
}

const showInfoModal = () => {
  infoModalRef.value?.showModal()
}

const showIconModal = () => {
  iconModalRef.value?.showModal()
}

const showSubmitTypeModal = () => {
  submitTypeModalRef.value?.showModal()
}

const showClickOutsideModal = () => {
  clickOutsideModalRef.value?.showModal()
}

const showNoClickOutsideModal = () => {
  noClickOutsideModalRef.value?.showModal()
}

const handleCreate = () => {
  alert('Create button clicked!')
}

const handleCancel = () => {
  alert('Cancel button clicked!')
}
</script>

<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Basic Modal">
      <button class="btn btn-primary" @click="showBasicModal">Open Basic Modal</button>
      <SimpleModal 
        ref="basicModalRef" 
        title="Basic Modal"
      >
        This is a basic modal with default close button.
      </SimpleModal>
    </Variant>

    <Variant title="Modal with Custom Buttons">
      <button class="btn btn-secondary" @click="showCustomModal">Open Custom Modal</button>
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
        This modal has custom buttons with event handlers.
      </SimpleModal>
    </Variant>

    <Variant title="Color Variants - Primary Buttons">
      <button class="btn btn-primary" @click="showPrimaryModal">Open Primary Modal</button>
      <SimpleModal 
        ref="primaryModalRef" 
        title="Primary Buttons Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="primary"
        createButtonColor="primary"
      >
        This modal uses primary color for both buttons.
      </SimpleModal>
    </Variant>

    <Variant title="Color Variants - Secondary Buttons">
      <button class="btn btn-secondary" @click="showSecondaryModal">Open Secondary Modal</button>
      <SimpleModal 
        ref="secondaryModalRef" 
        title="Secondary Buttons Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="secondary"
        createButtonColor="secondary"
      >
        This modal uses secondary color for both buttons.
      </SimpleModal>
    </Variant>

    <Variant title="Color Variants - Error/Success Buttons">
      <div class="flex gap-2">
        <button class="btn btn-error" @click="showErrorModal">Open Error Modal</button>
        <button class="btn btn-success" @click="showSuccessModal">Open Success Modal</button>
      </div>
      
      <SimpleModal 
        ref="errorModalRef" 
        title="Error Buttons Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="error"
        createButtonColor="error"
      >
        This modal uses error color for both buttons.
      </SimpleModal>

      <SimpleModal 
        ref="successModalRef" 
        title="Success Buttons Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="success"
        createButtonColor="success"
      >
        This modal uses success color for both buttons.
      </SimpleModal>
    </Variant>

    <Variant title="Color Variants - Mixed Colors">
      <button class="btn btn-info" @click="showInfoModal">Open Mixed Colors Modal</button>
      <SimpleModal 
        ref="infoModalRef" 
        title="Mixed Color Buttons Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonColor="error"
        createButtonColor="success"
      >
        This modal uses error color for cancel and success color for create.
      </SimpleModal>
    </Variant>

    <Variant title="Modal with Icon">
      <button class="btn btn-accent" @click="showIconModal">Open Icon Modal</button>
      <SimpleModal 
        ref="iconModalRef" 
        title="Modal with Icon"
        icon="info"
        :iconSize="3"
        :showCancelButton="true"
        :showCreateButton="true"
      >
        This modal has an info icon in the title.
      </SimpleModal>
    </Variant>

    <Variant title="Modal with Button Types">
      <button class="btn" @click="showSubmitTypeModal">Open Button Types Modal</button>
      <SimpleModal 
        ref="submitTypeModalRef" 
        title="Button Types Modal"
        :showCancelButton="true"
        :showCreateButton="true"
        cancelButtonType="reset"
        createButtonType="submit"
      >
        <p>This modal has specific button types:</p>
        <ul class="list-disc ml-5 mt-2">
          <li>Cancel button: reset type</li>
          <li>Create button: submit type</li>
        </ul>
      </SimpleModal>
    </Variant>

    <Variant title="Modal with Click Outside Options">
      <div class="flex gap-2">
        <button class="btn" @click="showClickOutsideModal">Modal with Click Outside</button>
        <button class="btn" @click="showNoClickOutsideModal">Modal without Click Outside</button>
      </div>
      
      <SimpleModal 
        ref="clickOutsideModalRef" 
        title="Click Outside Modal"
        :closeOnClickOutside="true"
        :showCancelButton="true"
      >
        <p>This modal can be closed by clicking outside.</p>
        <p class="mt-2">Try clicking on the backdrop!</p>
      </SimpleModal>

      <SimpleModal 
        ref="noClickOutsideModalRef" 
        title="No Click Outside Modal"
        :closeOnClickOutside="false"
        :showCancelButton="true"
      >
        <p>This modal cannot be closed by clicking outside.</p>
        <p class="mt-2">You must use the button to close it.</p>
      </SimpleModal>
    </Variant>

    <Variant title="Modal with Custom Content">
      <button class="btn btn-accent" @click="showSlotModal">Open Content Modal</button>
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

        <template #actions>
          <button class="btn btn-outline">Cancel</button>
          <button class="btn btn-primary ml-2">Login</button>
        </template>
      </SimpleModal>
    </Variant>
  </Story>
</template>

<docs lang="md">
# SimpleModal

A versatile modal component that supports various styling options, custom buttons, and content.

## Features

- Custom title with optional icon
- Configurable buttons (cancel, create)
- Customizable button colors and types
- Option to close on clicking outside
- Support for custom content through slots
- Event handling for modal actions

## Props

| Prop                | Type                        | Default    | Description                                    |
|---------------------|----------------------------|------------|------------------------------------------------|
| id                  | string                     | auto-generated | ID for the dialog element                     |
| title               | string                     | undefined  | Modal title                                    |
| icon                | string                     | undefined  | Icon name to display in the title             |
| iconSize            | number                     | 2          | Size of the icon                               |
| showCancelButton    | boolean                    | false      | Whether to show the cancel button              |
| showCreateButton    | boolean                    | false      | Whether to show the create button              |
| cancelButtonText    | string                     | 'Cancel'   | Text for the cancel button                     |
| createButtonText    | string                     | 'Create'   | Text for the create button                     |
| cancelButtonColor   | string                     | 'neutral'  | Color for the cancel button                    |
| createButtonColor   | string                     | 'primary'  | Color for the create button                    |
| closeOnClickOutside | boolean                    | false      | Whether clicking outside closes the modal      |
| cancelButtonType    | 'button' \| 'submit' \| 'reset' | 'button' | Type attribute for the cancel button          |
| createButtonType    | 'button' \| 'submit' \| 'reset' | 'button' | Type attribute for the create button          |

## Events

| Event              | Payload | Description                             |
|--------------------|---------|-----------------------------------------|
| cancel             | none    | Emitted when the cancel button is clicked |
| create             | none    | Emitted when the create button is clicked |
| close              | none    | Emitted when the modal is closed        |
| update:modelValue  | boolean | Emitted when the modal opens or closes  |

## Slots

| Slot       | Description                                      |
|------------|--------------------------------------------------|
| default    | Content of the modal                             |
| icon       | Custom icon in the title (replaces icon prop)    |
| actions    | Custom action buttons (replaces default buttons) |

## Methods

| Method     | Description                |
|------------|----------------------------|
| showModal  | Opens the modal            |
| closeModal | Closes the modal           |

## Usage Examples

### Basic Modal

```vue
<SimpleModal ref="basicModalRef" title="Basic Modal">
  This is a basic modal with default close button.
</SimpleModal>
```

### Modal with Custom Buttons

```vue
<SimpleModal
  ref="modalRef"
  title="Custom Modal"
  :showCancelButton="true"
  :showCreateButton="true"
  cancelButtonText="Dismiss"
  createButtonText="Confirm"
  @cancel="handleCancel"
  @create="handleCreate"
>
  Modal content goes here.
</SimpleModal>
```

### Modal with Custom Button Colors

```vue
<SimpleModal
  ref="modalRef"
  title="Colored Buttons Modal"
  :showCancelButton="true"
  :showCreateButton="true"
  cancelButtonColor="error"
  createButtonColor="success"
>
  Modal with colored buttons.
</SimpleModal>
```

### Modal with Icon

```vue
<SimpleModal
  ref="modalRef"
  title="Icon Modal"
  icon="info"
  :iconSize="3"
>
  Modal with an icon in the title.
</SimpleModal>
```

### Modal with Custom Content

```vue
<SimpleModal ref="modalRef" title="Rich Content Modal">
  <form class="form-control">
    <input type="text" placeholder="Enter value" class="input input-bordered" />
  </form>
  
  <template #actions>
    <button class="btn btn-outline">Cancel</button>
    <button class="btn btn-primary ml-2">Submit</button>
  </template>
</SimpleModal>
```
</docs>
