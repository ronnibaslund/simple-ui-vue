<script setup lang="ts">
import { ref } from 'vue'
import SimpleModal from './SimpleModal.vue'

const basicModalRef = ref(null)
const customModalRef = ref(null)
const slotModalRef = ref(null)

const showBasicModal = () => {
  basicModalRef.value?.showModal()
}

const showCustomModal = () => {
  customModalRef.value?.showModal()
}

const showSlotModal = () => {
  slotModalRef.value?.showModal()
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
