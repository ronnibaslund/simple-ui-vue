<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'

interface SimpleRangeProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
}

const props = withDefaults(defineProps<SimpleRangeProps>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
  color: undefined,
  size: 'md',
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

// Use the same approach as SimpleToggle for color classes
const rangeColorClasses = computed(() => {
  return {
    neutral: 'range-neutral',
    primary: 'range-primary',
    secondary: 'range-secondary',
    accent: 'range-accent',
    error: 'range-error',
    warning: 'range-warning',
    success: 'range-success',
    info: 'range-info'
  }[props.color]
})

// Size classes using the same approach
const rangeSizeClasses = computed(() => {
  if (props.size === 'md') return ''
  
  return {
    xs: 'range-xs',
    sm: 'range-sm',
    lg: 'range-lg',
    xl: 'range-xl'
  }[props.size]
})

// Compute the fill percentage based on the current value
const fillPercentage = computed(() => {
  const percentage = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return `${percentage}%`
})

const rangeRef = ref<HTMLInputElement | null>(null)

// Update the CSS variable when value changes
watch(() => fillPercentage.value, (newValue) => {
  if (rangeRef.value) {
    rangeRef.value.style.setProperty('--value', newValue)
  }
})

// Set initial value when component mounts
onMounted(() => {
  if (rangeRef.value) {
    rangeRef.value.style.setProperty('--value', fillPercentage.value)
  }
})

function updateValue(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', Number(value))
}
</script>

<template>
  <input 
    ref="rangeRef"
    type="range"
    :class="`range ${rangeColorClasses} ${rangeSizeClasses}`"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    @input="updateValue"
  />
</template>

<style scoped>

</style>