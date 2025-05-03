<script setup lang="ts">
import { provide, watch, ref } from 'vue'
import { nanoid } from 'nanoid'

const props = withDefaults(defineProps<{
  multipleOpen?: boolean
}>(), {
  multipleOpen: false
})

interface AccordionData {
  id: string;
  activeIds: string[];
  multipleOpen?: boolean;
  groupName: string;
}

// Generate a unique ID for this accordion group
const accordionId = nanoid()
const groupName = `accordion-${accordionId}`

const accordionData = ref<AccordionData>({
  id: accordionId,
  activeIds: [],
  multipleOpen: props.multipleOpen,
  groupName
})

watch(
  () => props.multipleOpen,
  () => {
    accordionData.value.multipleOpen = props.multipleOpen
    const firstId = accordionData.value.activeIds.length > 0 ? accordionData.value.activeIds[0] : undefined;
    accordionData.value.activeIds = firstId ? [firstId] : [];
  }
)

provide('SimpleAccordionData', accordionData)
</script>

<template>
  <div class="w-full join join-vertical">
    <slot></slot>
  </div>
</template>
