<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Sizes, ColorsBrand, ColorsState, ToggleColorsContent } from '../../globals'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    color?: ColorsBrand | ColorsState | ToggleColorsContent
    size?: Sizes
  }>(),
  {
    modelValue: false,
    size: 'md'
  }
)

const toggleColorClasses = computed(() => {
  return {
    neutral: 'toggle-neutral',
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    accent: 'toggle-accent',
    error: 'toggle-error',
    warning: 'toggle-warning',
    success: 'toggle-success',
    info: 'toggle-info'
  }[props.color]
})

const sizeClasses = computed(() => {
  return {
    xl: 'toggle-xl',
    lg: 'toggle-lg',
    md: 'toggle-md',
    sm: 'toggle-sm',
    xs: 'toggle-xs'
  }[props.size]
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
      />
      {{ label }}
    </label>

    <input
      type="checkbox"
      class="toggle"
      :class="[toggleColorClasses, sizeClasses]"
      @change="toggleChanged"
      v-else
    />
  </div>
</template>
