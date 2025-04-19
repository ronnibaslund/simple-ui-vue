<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SimpleIcon from '../SimpleIcon/SimpleIcon.vue'
import SimpleButton from '../SimpleButton/SimpleButton.vue'
import { iconSizes } from '@/globals'
import type { IconSizes } from '@/globals'
import type { ColorsBrand, ColorsState } from '@/globals'

// Import icons from globals
import { icons } from '@/globals'
type IconNames = typeof icons[number]
type ButtonColor = ColorsBrand | ColorsState | 'ghost' | 'link'
type ButtonType = 'button' | 'submit' | 'reset'

const props = defineProps<{
  id?: string,
  title?: string,
  icon?: IconNames,
  iconSize?: IconSizes,
  showCancelButton?: boolean,
  showCreateButton?: boolean,
  cancelButtonText?: string,
  createButtonText?: string,
  cancelButtonColor?: string,
  createButtonColor?: string,
  closeOnClickOutside?: boolean,
  cancelButtonType?: ButtonType,
  createButtonType?: ButtonType
}>()

const emit = defineEmits(['cancel', 'create'])

const modalId = ref(props.id || `modal-${Math.random().toString(36).substr(2, 9)}`)
const dialogRef = ref<HTMLDialogElement | null>(null)

const showModal = () => {
  if (dialogRef.value) {
    dialogRef.value.showModal()
  }
}

const closeModal = () => {
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}

const handleCancel = () => {
  emit('cancel')
  closeModal()
}

const handleCreate = () => {
  emit('create')
  closeModal()
}

// Extract color for SimpleButton from button class
const getCancelButtonColor = computed<ButtonColor>(() => {
  if (!props.cancelButtonColor) return 'neutral';
  
  // Map from btn-* classes to color names
  if (props.cancelButtonColor === 'btn-outline') return 'neutral';
  if (props.cancelButtonColor === 'btn-ghost') return 'ghost';
  if (props.cancelButtonColor === 'btn-link') return 'link';
  if (props.cancelButtonColor === 'btn-neutral') return 'neutral';
  if (props.cancelButtonColor === 'btn-primary') return 'primary';
  if (props.cancelButtonColor === 'btn-secondary') return 'secondary';
  if (props.cancelButtonColor === 'btn-accent') return 'accent';
  if (props.cancelButtonColor === 'btn-error') return 'error';
  if (props.cancelButtonColor === 'btn-warning') return 'warning';
  if (props.cancelButtonColor === 'btn-success') return 'success';
  if (props.cancelButtonColor === 'btn-info') return 'info';
  
  return 'neutral';
})

const getCreateButtonColor = computed<ButtonColor>(() => {
  if (!props.createButtonColor) return 'primary';
  
  // Map from btn-* classes to color names
  if (props.createButtonColor === 'btn-outline') return 'neutral';
  if (props.createButtonColor === 'btn-ghost') return 'ghost';
  if (props.createButtonColor === 'btn-link') return 'link';
  if (props.createButtonColor === 'btn-neutral') return 'neutral';
  if (props.createButtonColor === 'btn-primary') return 'primary';
  if (props.createButtonColor === 'btn-secondary') return 'secondary';
  if (props.createButtonColor === 'btn-accent') return 'accent';
  if (props.createButtonColor === 'btn-error') return 'error';
  if (props.createButtonColor === 'btn-warning') return 'warning';
  if (props.createButtonColor === 'btn-success') return 'success';
  if (props.createButtonColor === 'btn-info') return 'info';
  
  return 'primary';
})

defineExpose({
  showModal,
  closeModal
})
</script>

<template>
  <dialog ref="dialogRef" :id="modalId" class="modal">
    <div class="modal-box">
      <div v-if="title" class="flex items-center gap-2 mb-2">
        <!-- Icon slot with fallback to icon prop -->
        <slot name="icon">
          <SimpleIcon v-if="icon" :icon="icon" :size="iconSize || 2" />
        </slot>
        <h3 class="font-bold text-lg">{{ title }}</h3>
      </div>
      
      <!-- Main content slot -->
      <div class="py-4">
        <slot></slot>
      </div>
      
      <!-- Action buttons -->
      <div class="modal-action">
        <form method="dialog">
          <slot name="actions">
            <SimpleButton 
              v-if="showCancelButton" 
              :color="getCancelButtonColor"
              :type="cancelButtonType"
              class="mr-2"
              @click="handleCancel"
            >
              {{ cancelButtonText || 'Cancel' }}
            </SimpleButton>
            <SimpleButton 
              v-if="showCreateButton" 
              :color="getCreateButtonColor"
              :type="createButtonType"
              @click="handleCreate"
            >
              {{ createButtonText || 'Create' }}
            </SimpleButton>
            <SimpleButton v-if="!showCancelButton && !showCreateButton">Close</SimpleButton>
          </slot>
        </form>
      </div>
    </div>
    
    <!-- Modal backdrop for clicking outside to close -->
    <form v-if="closeOnClickOutside" method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>