// SimpleButton.vue
<script setup lang="ts">
import { computed } from 'vue'
import type { Sizes, ColorsBrand, ColorsState } from '../../globals'
import { SimpleLoading } from '../components';

const props = withDefaults(
  defineProps<{
    color?: ColorsBrand | ColorsState | 'ghost' | 'link'
    size?: Sizes
    wide?: boolean
    outline?: boolean
    square?: boolean
    circle?: boolean
    loading?: boolean
    glass?: boolean
    active?: boolean
    dashed?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    size: 'md',
    wide: false,
    outline: false
  }
)

// Add emits declaration to properly handle click events
const emit = defineEmits<{
  'click': [event: MouseEvent]
}>()

const colorClasses = computed(() => {
  if (!props.color) return '';
  
  const colorMap = {
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    error: 'btn-error',
    warning: 'btn-warning',
    success: 'btn-success',
    info: 'btn-info',
    ghost: 'btn-ghost',
    link: 'btn-link'
  };
  
  return colorMap[props.color] || '';
})

const sizeClasses = computed(() => {
  if (!props.size) return 'btn-md';
  
  const sizeMap = {
    lg: 'btn-lg',
    md: 'btn-md',
    sm: 'btn-sm',
    xs: 'btn-xs'
  };
  
  return sizeMap[props.size] || 'btn-md';
})

const otherClasses = computed(() => {
  return {
    'btn-outline': props.outline,
    'btn-wide': props.wide,
    'btn-square': props.square,
    'btn-circle': props.circle,
    glass: props.glass,
    'btn-active': props.active,
    'btn-dash': props.dashed
  }
})

// Handler for the click event to properly emit it
const handleClick = (event: MouseEvent) => {
  if (!props.loading) {
    emit('click', event)
  }
}
</script>
<template>
  <button 
    class="btn" 
    :class="[colorClasses, sizeClasses, otherClasses]"
    :type="type"
    @click="handleClick"
  >
    <SimpleLoading v-if="loading" :size="size" />
    <slot></slot>
  </button>
</template>