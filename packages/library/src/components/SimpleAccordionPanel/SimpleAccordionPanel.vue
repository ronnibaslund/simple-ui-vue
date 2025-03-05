<script setup lang="ts">
import { inject, ref } from 'vue'
import { nanoid } from 'nanoid'
const props = defineProps<{
  title?: string
}>()

const id = nanoid()

const defaultData = ref({
  id: null,
  activeIds: [],
  multipleOpen: false
})

const accordion = inject('SimpleAccordionData', defaultData)

if (accordion.value.id === null) {
  throw new Error('SimpleAccordionPanel must be used within a SimpleAccordion')
}

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
</script>

<template>
  <div
    class="border collapse collapse-arrow join-item border-base-300 bg-base-100"
    :class="{ 'collapse-open': accordion.activeIds.includes(id) }"
  >
    <button
      class="block font-bold text-left cursor-pointer collapse-title focus:shadow-primary focus:outline-hidden"
      @click="handleToggle"
      @keydown.Enter="handleToggle"
    >
      <slot name="title">{{ title }}</slot>
    </button>
    <div class="collapse-content">
      <slot></slot>
    </div>
  </div>
</template>
