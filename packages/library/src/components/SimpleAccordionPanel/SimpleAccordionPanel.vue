<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue'
import { nanoid } from 'nanoid'

const props = withDefaults(defineProps<{
  title?: string;
  icon?: 'arrow' | 'plus' | 'none'; 
  checked?: boolean;
}>(), {
  icon: 'arrow',
  checked: false
})

const id = nanoid()

interface AccordionData {
  id: string | null;
  activeIds: string[];
  multipleOpen?: boolean;
  groupName: string;
}

const defaultData = ref<AccordionData>({
  id: null,
  activeIds: [],
  multipleOpen: false,
  groupName: ''
})

const accordion = inject<typeof defaultData>('SimpleAccordionData', defaultData)

if (accordion.value.id === null) {
  throw new Error('SimpleAccordionPanel must be used within a SimpleAccordion')
}

// Initialize the panel to open state if checked prop is true
onMounted(() => {
  if (props.checked && !accordion.value.activeIds.includes(id)) {
    // If not multiple open, clear other active IDs first
    if (!accordion.value.multipleOpen) {
      accordion.value.activeIds = []
    }
    // Add this panel's ID to active IDs
    accordion.value.activeIds.push(id)
  }
})

const isOpen = computed(() => {
  return accordion.value.activeIds.includes(id)
})

function handleToggle() {
  // if currently active panel is clicked, close it
  if (accordion.value.activeIds.includes(id)) {
    accordion.value.activeIds = accordion.value.activeIds.filter((activeId) => activeId !== id)
  } else {
    // otherwise open it
    if (!accordion.value.multipleOpen) {
      accordion.value.activeIds = []
    }
    accordion.value.activeIds.push(id)
  }
}

// Generate a unique input ID for this panel
const inputId = `panel-${id}`

// Determine the icon class based on the icon prop
const iconClass = computed(() => {
  if (props.icon === 'arrow') return 'collapse-arrow'
  if (props.icon === 'plus') return 'collapse-plus'
  return ''
})
</script>

<template>
  <div
    class="collapse join-item border border-base-300 bg-base-100"
    :class="[{ 'collapse-open': isOpen }, iconClass]"
  >
    <!-- Hidden radio input for DaisyUI accordion pattern -->
    <input 
      type="radio" 
      :name="accordion.groupName" 
      :id="inputId"
      :checked="isOpen"
      @change="handleToggle"
    />
    
    <div
      class="collapse-title font-medium"
      @click="handleToggle"
      @keydown.Enter="handleToggle"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    
    <div class="collapse-content">
      <slot></slot>
    </div>
  </div>
</template>
