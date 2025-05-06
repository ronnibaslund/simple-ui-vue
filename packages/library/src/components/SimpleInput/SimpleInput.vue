<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue'
import type { Sizes, ColorsBrand, ColorsState, IconSizes } from '../../globals'
import { icons } from '../../globals'
import SimpleIcon from '../SimpleIcon/SimpleIcon.vue'
import type { ValidationRule } from '../../utils/ValidationRules'

type IconNames = (typeof icons)[number]
type ValidationRules = ValidationRule | ValidationRule[] | null

// Define the FormContext interface based on usage
interface FormContext {
  values: Record<string | number, any>;
  errors: Record<string, string | null>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string | null) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  formState: { value: { disabled: boolean } };
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    name?: string
    type?: string
    placeholder?: string
    color?: ColorsBrand | ColorsState
    size?: Sizes
    disabled?: boolean
    fieldset?: boolean
    fieldsetLegend?: string
    fieldsetLabel?: string
    icon?: IconNames
    iconSize?: IconSizes
    error?: string
    required?: boolean
    validation?: ValidationRules
    validationMessages?: Record<string, string>
    label?: string
    errorMessage?: string
    hasError?: boolean
  }>(),
  {
    type: 'text',
    size: 'md',
    disabled: false,
    required: false,
    color: 'neutral',
    hasError: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'change': [event: Event]
  'input': [event: Event]
}>()

// Track password visibility state
const passwordVisible = ref(false)
const localError = ref<string | null>(null)

// Try to inject form context from SimpleForm if available
const formContext = inject<FormContext | null>('formContext', null)

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

const inputValue = computed({
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
      validateInput(value)
    }
  }
})

const inputPlaceholder = computed(() => {
  return props.placeholder
})

const inputDisabled = computed(() => {
  return props.disabled || (formContext?.formState.value?.disabled || false)
})

const colorClasses = computed(() => {
  if (!props.color) return 'input-neutral';
  
  return {
    neutral: 'input-neutral',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    error: 'input-error',
    warning: 'input-warning',
    success: 'input-success',
    info: 'input-info',
    ghost: 'input-ghost',
    link: 'input-link'
  }[props.color]
})

const sizeClasses = computed(() => {
  return {
    xl: 'input-xl',
    lg: 'input-lg',
    md: 'input-md',
    sm: 'input-sm',
    xs: 'input-xs'
  }[props.size]
})

const type = computed(() => {
  const baseType = {
    text: 'text',
    email: 'email',
    password: 'password',
    number: 'number',
    date: 'date',
    time: 'time',
    url: 'url',
    tel: 'tel'
  }[props.type]
  
  // Override type when password is visible
  if (baseType === 'password' && passwordVisible.value) {
    return 'text'
  }
  
  return baseType
})

const isPassword = computed(() => props.type === 'password')

const requiredIndicator = computed(() => {
  return props.required ? ' *' : ''
})

const errorMessage = computed(() => {
  // First check the new errorMessage prop
  if (props.errorMessage) return props.errorMessage
  
  // Then use directly provided error prop
  if (props.error) return props.error
  
  // Then use local validation error
  if (localError.value) return localError.value
  
  // Then try to get error from form context
  if (formContext && props.name) {
    return formContext.errors[props.name]
  }
  
  return null
})

// Check if input has error
const hasError = computed(() => {
  return props.hasError || !!errorMessage.value
})

// Get validation message based on rule name
const getValidationMessage = (ruleName: string, defaultMessage: string): string => {
  if (props.validationMessages && props.validationMessages[ruleName]) {
    return props.validationMessages[ruleName]
  }
  return defaultMessage
}

// Validate the input value
const validateInput = (value: any): boolean => {
  // Reset error state
  localError.value = null
  
  // Required validation
  if (props.required && (!value || value === '')) {
    const message = getValidationMessage('required', 'This field is required')
    localError.value = message
    
    // Update form context if available
    if (formContext && props.name) {
      formContext.setFieldError(props.name, message)
    }
    
    return false
  }
  
  // Skip other validations if empty and not required
  if (!value || value === '') {
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
    
    // If we have validation rules but no errors, we can skip the built-in validation
    if (!hasErrors) {
      // Clear any previous errors in form context
      if (formContext && props.name) {
        formContext.setFieldError(props.name, null)
      }
      return true
    }
  }
  
  // Email validation
  if (props.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      const message = getValidationMessage('email', 'Please enter a valid email address')
      localError.value = message
      
      // Update form context if available
      if (formContext && props.name) {
        formContext.setFieldError(props.name, message)
      }
      
      return false
    }
  }
  
  // URL validation
  if (props.type === 'url' && value) {
    try {
      new URL(value)
    } catch (e) {
      const message = getValidationMessage('url', 'Please enter a valid URL')
      localError.value = message
      
      // Update form context if available
      if (formContext && props.name) {
        formContext.setFieldError(props.name, message)
      }
      
      return false
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
  if ((props.required || props.validation) && event.target instanceof HTMLInputElement) {
    validateInput(event.target.value)
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
      event.target instanceof HTMLInputElement) {
    validateInput(event.target.value)
  }
}

const handleInput = (event: Event) => {
  emit('input', event)
}
</script>

<template>
  <!-- Wrap everything in a single root div to avoid fragment issues -->
  <div class="simple-input-wrapper">
    <!-- Standard input with optional label -->
    <div class="relative" v-if="!fieldset">
      <!-- Display label if provided -->
      <div v-if="label" class="mb-1 text-sm font-medium">
        {{ label }}{{ requiredIndicator }}
      </div>
  
      <label :class="[colorClasses, sizeClasses, 'input w-full', { 'input-error': hasError }]">
        <SimpleIcon
          v-if="icon"
          :icon="icon"
          :size="props.iconSize"
        />
        <input
          v-model="inputValue"
          :name="name"
          :type="type"
          :placeholder="inputPlaceholder"
          :disabled="inputDisabled"
          :required="required"
          class="grow focus:outline-0"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
          @input="handleInput"
        />
        
        <!-- Password visibility toggle using swap -->
        <label v-if="isPassword" class="swap btn btn-xs btn-ghost btn-circle text-base-content/60">
          <input 
            type="checkbox" 
            aria-label="Toggle password visibility" 
            v-model="passwordVisible"
          />
          <SimpleIcon class="swap-off" icon="eye" :size="2" />
          <SimpleIcon class="swap-on" icon="eye-off" :size="2" />
        </label>
      </label>
      
      <!-- Error message -->
      <div v-if="errorMessage" class="text-error text-xs mt-1">
        {{ errorMessage }}
      </div>
    </div>

    <!-- Fieldset version -->
    <fieldset class="fieldset mb-0" v-else>
      <legend class="fieldset-legend" v-if="fieldsetLegend">{{ fieldsetLegend }}{{ requiredIndicator }}</legend>
      <label :class="[colorClasses, sizeClasses, 'input w-full', { 'input-error': hasError }]">
        <SimpleIcon
          v-if="icon"
          :icon="icon"
          :size="props.iconSize"
        />
        <input
          v-model="inputValue"
          :name="name"
          :type="type"
          :placeholder="inputPlaceholder"
          :disabled="inputDisabled"
          :required="required"
          class="grow focus:outline-0"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
          @input="handleInput"
        />
        
        <!-- Password visibility toggle using swap -->
        <label v-if="isPassword" class="swap btn btn-xs btn-ghost btn-circle text-base-content/60">
          <input 
            type="checkbox" 
            aria-label="Toggle password visibility" 
            v-model="passwordVisible"
          />
          <SimpleIcon class="swap-off" icon="eye" :size="2" />
          <SimpleIcon class="swap-on" icon="eye-off" :size="2" />
        </label>
      </label>
      
      <!-- Show error message and/or fieldset label -->
      <div class="mt-1">
        <p v-if="errorMessage" class="text-error text-xs">{{ errorMessage }}</p>
        <p v-else-if="fieldsetLabel" class="fieldset-label">{{ fieldsetLabel }}</p>
      </div>
    </fieldset>
  </div>
</template>
