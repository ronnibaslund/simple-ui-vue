<script setup lang="ts">
import { provide, watch, ref } from 'vue'
import { nanoid } from 'nanoid'

const props = defineProps<{
  multipleOpen?: boolean
}>()

const accordionData = ref({
  id: nanoid(),
  activeIds: [],
  multipleOpen: props.multipleOpen
})

watch(
  () => props.multipleOpen,
  () => {
    accordionData.value.multipleOpen = props.multipleOpen
    accordionData.value.activeIds = [accordionData.value.activeIds.at(0)].filter((n) => n)
  }
)

provide('SimpleAccordionData', accordionData)
</script>

<template>
  <div class="w-full join join-vertical">
    <slot></slot>
  </div>
</template>
