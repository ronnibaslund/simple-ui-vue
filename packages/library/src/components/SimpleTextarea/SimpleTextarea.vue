<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue'
import type { ExtendedSizes, ColorsBrand, ColorsState } from '../../globals'
import type { ValidationRule } from '../../utils/ValidationRules'

type ValidationRules = ValidationRule | ValidationRule[] | null

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    name?: string
    placeholder?: string
    color?: ColorsBrand | ColorsState
    size?: ExtendedSizes
    disabled?: boolean
    ghost?: boolean
    fieldset?: boolean
    fieldsetLegend?: string
    fieldsetLabel?: string
    error?: string
    required?: boolean
    validation?: ValidationRules
    validationMessages?: Record<string, string>
    rows?: number
  }>(),
  {
    size: 'md',
    disabled: false,
    ghost: false,
    required: false,
    rows: 3
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'change': [event: Event]
}>()

const localError = ref<string | null>(null)

// Try to inject form context from SimpleForm if available
const formContext = inject('formContext', null)

// Initialize with form context if available
onMounted(() => {
  if (formContext && props.name) {
    // Register initial value with form if present
    if (props.modelValue !== undefined) {
      formContext.setFieldValue(props.name, props.modelValue)
    }
    
    // Set error if provided directly through props
    if (props.error) {
      formContext.setFieldError(props.name, props.error)
    }
  }
})

const textareaValue = computed({
  get: () => {
    // Try to get value from form context first if available
    if (formContext && props.name && formContext.values[props.name] !== undefined) {
      return formContext.values[props.name]
    }
    // Fallback to prop value
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
    
    // Update form context if available
    if (formContext && props.name) {
      formContext.setFieldValue(props.name, value)
    }

    // Run validation if we have validation rules
    if (props.validation || props.required) {
      validateTextarea(value)
    }
  }
})

const textareaDisabled = computed(() => {
  return props.disabled || (formContext?.formState.value?.disabled || false)
})

const colorClasses = computed(() => {
  if (!props.color) return ''
  return {
    neutral: 'textarea-neutral',
    primary: 'textarea-primary',
    secondary: 'textarea-secondary',
    accent: 'textarea-accent',
    info: 'textarea-info',
    success: 'textarea-success',
    warning: 'textarea-warning',
    error: 'textarea-error',
    ghost: 'textarea-ghost',
    link: 'textarea-link'
  }[props.color]
})

const sizeClasses = computed(() => {
  return {
    xs: 'textarea-xs',
    sm: 'textarea-sm',
    md: 'textarea-md',
    lg: 'textarea-lg',
    xl: 'textarea-xl'
  }[props.size]
})

const ghostClass = computed(() => {
  return props.ghost ? 'textarea-ghost' : ''
})

const requiredIndicator = computed(() => {
  return props.required ? ' *' : ''
})

const errorMessage = computed(() => {
  // Use directly provided error prop first
  if (props.error) return props.error
  
  // Then use local validation error
  if (localError.value) return localError.value
  
  // Then try to get error from form context
  if (formContext && props.name) {
    return formContext.errors[props.name]
  }
  
  return null
})

// Get validation message based on rule name
const getValidationMessage = (ruleName: string, defaultMessage: string): string => {
  if (props.validationMessages && props.validationMessages[ruleName]) {
    return props.validationMessages[ruleName]
  }
  return defaultMessage
}

// Validate the textarea value
const validateTextarea = (value: any): boolean => {
  // Reset error state
  localError.value = null
  
  // Required validation
  if (props.required && (value === null || value === undefined || value === '')) {
    const message = getValidationMessage('required', 'This field is required')
    localError.value = message
    
    // Update form context if available
    if (formContext && props.name) {
      formContext.setFieldError(props.name, message)
    }
    
    return false
  }
  
  // Skip other validations if empty and not required
  if (value === null || value === undefined || value === '') {
    // Clear any previous errors
    if (formContext && props.name) {
      formContext.setFieldError(props.name, null)
    }
    return true
  }
  
  // Custom validation rules
  if (props.validation) {
    const rules = Array.isArray(props.validation) 
      ? props.validation 
      : [props.validation]
    
    // Track if we have validation errors
    let hasErrors = false
    
    for (const rule of rules) {
      const result = rule(value)
      
      if (result === false || typeof result === 'string') {
        const message = typeof result === 'string' 
          ? result 
          : getValidationMessage('invalid', 'This field is invalid')
        
        localError.value = message
        
        // Update form context if available
        if (formContext && props.name) {
          formContext.setFieldError(props.name, message)
        }
        
        hasErrors = true
        return false
      }
    }
    
    // If we have validation rules but no errors, we can skip additional validation
    if (!hasErrors) {
      // Clear any previous errors in form context
      if (formContext && props.name) {
        formContext.setFieldError(props.name, null)
      }
      return true
    }
  }
  
  // Clear any previous errors in form context
  if (formContext && props.name) {
    formContext.setFieldError(props.name, null)
  }
  
  return true
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  
  // Validate on blur
  if ((props.required || props.validation) && event.target instanceof HTMLTextAreaElement) {
    validateTextarea(event.target.value)
  }
  
  // Update form context if available
  if (formContext && props.name) {
    formContext.setFieldTouched(props.name, true)
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
  
  // Validate on change if there's already an error
  if ((props.required || props.validation) && 
      localError.value && 
      event.target instanceof HTMLTextAreaElement) {
    validateTextarea(event.target.value)
  }
}
</script>

<template>
  <div class="relative" v-if="!fieldset">
    <textarea
      v-model="textareaValue"
      :name="name"
      :disabled="textareaDisabled"
      :required="required"
      :placeholder="placeholder"
      :rows="rows"
      :class="[
        'textarea w-full', 
        colorClasses, 
        sizeClasses, 
        ghostClass, 
        { 'textarea-error': errorMessage }
      ]"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    ></textarea>
    
    <!-- Error message -->
    <div v-if="errorMessage" class="text-error text-xs mt-1">
      {{ errorMessage }}
    </div>
  </div>

  <fieldset class="fieldset" v-if="fieldset">
    <legend class="fieldset-legend" v-if="fieldsetLegend">{{ fieldsetLegend }}{{ requiredIndicator }}</legend>
    <textarea
      v-model="textareaValue"
      :name="name"
      :disabled="textareaDisabled"
      :required="required"
      :placeholder="placeholder"
      :rows="rows"
      :class="[
        'textarea w-full', 
        colorClasses, 
        sizeClasses, 
        ghostClass, 
        { 'textarea-error': errorMessage }
      ]"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    ></textarea>
    
    <!-- Show error message and/or fieldset label -->
    <div class="mt-1">
      <p v-if="errorMessage" class="text-error text-xs">{{ errorMessage }}</p>
      <p v-else-if="fieldsetLabel" class="fieldset-label">{{ fieldsetLabel }}</p>
    </div>
  </fieldset>
</template>