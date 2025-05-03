<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Sizes, ColorsBrand, ColorsState, ToggleColorsContent } from '../../globals'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    color?: ColorsBrand | ColorsState | ToggleColorsContent
    size?: Sizes
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    size: 'md',
    disabled: false
  }
)

const toggleColorClasses = computed(() => {
  if (!props.color) return '';
  
  // Handle direct toggle-* class names
  if (typeof props.color === 'string' && props.color.startsWith('toggle-')) {
    return props.color;
  }
  
  // Map color names to toggle-* classes
  const colorMap = {
    neutral: 'toggle-neutral',
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    accent: 'toggle-accent',
    error: 'toggle-error',
    warning: 'toggle-warning',
    success: 'toggle-success',
    info: 'toggle-info'
  };
  
  if (typeof props.color === 'string') {
    return colorMap[props.color as keyof typeof colorMap] || '';
  }
  
  return '';
})

const sizeClasses = computed(() => {
  if (!props.size) return 'toggle-md';
  return {
    lg: 'toggle-lg',
    md: 'toggle-md',
    sm: 'toggle-sm',
    xs: 'toggle-xs'
  }[props.size] || 'toggle-md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = ref(props.modelValue || false)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      checked.value = newValue
    }
  }
)

const toggleChanged = () => {
  checked.value = !checked.value
  emit('update:modelValue', checked.value)
}
</script>

<template>
  <div class="simple-toggle">
    <label class="fieldset-label" v-if="label">
      <input
        type="checkbox"
        class="toggle"
        :class="[toggleColorClasses, sizeClasses]"
        @change="toggleChanged"
        :disabled="disabled"
      />
      {{ label }}
    </label>

    <input
      type="checkbox"
      class="toggle"
      :class="[toggleColorClasses, sizeClasses]"
      @change="toggleChanged"
      :disabled="disabled"
      v-else
    />
  </div>
</template>
