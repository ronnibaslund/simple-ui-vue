<script setup lang="ts">
import { computed } from 'vue'

interface SimpleProgressProps {
  value?: number
  max?: number
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  width?: string
}

const props = withDefaults(defineProps<SimpleProgressProps>(), {
  max: 100,
  width: 'w-full',
  color: undefined
})

const isIndeterminate = computed(() => props.value === undefined)

// Use the same approach as SimpleToggle for color classes
const progressColorClasses = computed(() => {
  if (!props.color) return '';
  
  const colorMap = {
    neutral: 'progress-neutral',
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    accent: 'progress-accent',
    error: 'progress-error',
    warning: 'progress-warning',
    success: 'progress-success',
    info: 'progress-info'
  };
  
  return colorMap[props.color] || '';
})

</script>

<template>
  <progress 
    :class="`progress ${progressColorClasses} ${props.width}`" 
    :value="props.value" 
    :max="props.max">
  </progress>
</template>

<style scoped>

</style>