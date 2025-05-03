<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import SimpleInput from './SimpleInput.vue'
import SimpleButton from '../SimpleButton/SimpleButton.vue'
import { icons, iconSizes, sizes } from '@/globals'
import type { IconSizes, Sizes } from '@/globals'
import * as V from '../../utils/ValidationRules'

type IconNames = (typeof icons)[number]

const state = reactive<{
  value: string
  icon: IconNames
  size: IconSizes
  password: string
}>({
  value: '',
  icon: 'search',
  size: 6,
  password: ''
})

// Basic validation examples
const requiredValue = ref('')
const emailValue = ref('')
const urlValue = ref('')
const passwordValue = ref('')
const ageValue = ref('')

// Form with multiple validations
const formState = reactive({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  age: '',
  errors: {} as Record<string, string | null>,
  submitted: false
})

// Password to match against
const passwordToMatch = computed(() => formState.password)

// Handle form submission
const handleSubmit = () => {
  formState.submitted = true;
  // In a real app, you would submit the form data to your API
  setTimeout(() => {
    formState.submitted = false;
  }, 1500);
}
</script>

<template>
  <Story title="SimpleInput">
    <Variant title="Basic Examples">
      <div class="p-4 story-container">
        <h2 class="text-2xl font-bold mb-6">SimpleInput Component</h2>
        
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Basic Examples</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 class="font-medium mb-2">Default Input</h4>
              <SimpleInput v-model="state.value" placeholder="Type something..." />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">With Icon</h4>
              <SimpleInput v-model="state.value" :icon="state.icon" placeholder="Search..." />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Password Input</h4>
              <SimpleInput v-model="state.password" type="password" placeholder="Enter password" />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Disabled Input</h4>
              <SimpleInput disabled placeholder="Disabled input" />
            </div>
          </div>
        </section>
      </div>
    </Variant>
    
    <Variant title="Validation Examples">
      <div class="p-4 story-container">
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Individual Validation Examples</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 class="font-medium mb-2">Required Field</h4>
              <SimpleInput 
                v-model="requiredValue" 
                placeholder="Required field"
                required
                fieldset
                fieldsetLegend="Required Field"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Email Validation</h4>
              <SimpleInput 
                v-model="emailValue" 
                type="email"
                placeholder="Enter email"
                fieldset
                fieldsetLegend="Email"
                :validation="V.email()"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">URL Validation</h4>
              <SimpleInput 
                v-model="urlValue" 
                type="url"
                placeholder="Enter website URL"
                fieldset
                fieldsetLegend="Website"
                :validation="V.url()"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Password with Requirements</h4>
              <SimpleInput 
                v-model="passwordValue" 
                type="password"
                placeholder="Enter secure password"
                fieldset
                fieldsetLegend="Password"
                :validation="V.password()"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Number with Min/Max</h4>
              <SimpleInput 
                v-model="ageValue" 
                type="number"
                placeholder="Enter age (18-100)"
                fieldset
                fieldsetLegend="Age"
                :validation="V.compose([V.numeric(), V.min(18), V.max(100)])"
              />
            </div>
          </div>
        </section>
      </div>
    </Variant>
    
    <Variant title="Complete Form Validation">
      <div class="p-4 story-container">
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Complete Form Example with Validation</h3>
          
          <form @submit.prevent="handleSubmit" class="max-w-md mx-auto border rounded-lg p-6 shadow-sm">
            <div class="space-y-4">
              <SimpleInput 
                v-model="formState.username" 
                name="username"
                placeholder="Enter username"
                fieldset
                fieldsetLegend="Username"
                :validation="V.compose([V.required(), V.minLength(3), V.maxLength(20)])"
              />
              
              <SimpleInput 
                v-model="formState.email" 
                name="email"
                type="email"
                placeholder="you@example.com"
                fieldset
                fieldsetLegend="Email"
                :validation="V.compose([V.required(), V.email()])"
              />
              
              <SimpleInput 
                v-model="formState.password" 
                name="password"
                type="password"
                placeholder="Create a secure password"
                fieldset
                fieldsetLegend="Password"
                :validation="V.password({
                  minLength: 8,
                  requireUppercase: true,
                  requireLowercase: true,
                  requireNumbers: true,
                  requireSpecial: true
                })"
              />
              
              <SimpleInput 
                v-model="formState.passwordConfirm" 
                name="passwordConfirm"
                type="password"
                placeholder="Confirm your password"
                fieldset
                fieldsetLegend="Confirm Password"
                :validation="V.matches(passwordToMatch, 'Passwords must match')"
              />
              
              <SimpleInput 
                v-model="formState.age" 
                name="age"
                type="number"
                placeholder="Enter your age"
                fieldset
                fieldsetLegend="Age"
                :validation="V.compose([
                  V.required('Age is required'),
                  V.numeric(),
                  V.min(18, 'You must be 18 or older')
                ])"
              />
              
              <div class="flex justify-end mt-6">
                <SimpleButton 
                  type="submit" 
                  color="primary"
                  :loading="formState.submitted"
                >
                  Submit
                </SimpleButton>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Variant>
    
    <Variant title="Style Variants">
      <div class="p-4 story-container">
        <section>
          <h3 class="text-xl font-semibold mb-4">Style Variants</h3>
          
          <div class="space-y-4">
            <h4 class="font-medium mb-2">Size Variants</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <SimpleInput size="xs" placeholder="Extra Small" />
              <SimpleInput size="sm" placeholder="Small" />
              <SimpleInput size="md" placeholder="Medium" />
              <SimpleInput size="lg" placeholder="Large" />
            </div>
            
            <h4 class="font-medium mb-2">Color Variants</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SimpleInput color="primary" placeholder="Primary" />
              <SimpleInput color="secondary" placeholder="Secondary" />
              <SimpleInput color="accent" placeholder="Accent" />
              <SimpleInput color="info" placeholder="Info" />
              <SimpleInput color="success" placeholder="Success" />
              <SimpleInput color="warning" placeholder="Warning" />
              <SimpleInput color="error" placeholder="Error" />
            </div>
          </div>
        </section>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# SimpleInput

A versatile input component that supports various types, sizes, colors, and features like icons and fieldsets.

## Features
- Multiple input types (text, email, password, etc.)
- Various sizes (xs, sm, md, lg)
- Color variants (primary, secondary, accent, etc.)
- Optional icon support
- Password visibility toggle
- Fieldset wrapper with legend and helper text
- Disabled state

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string | undefined | v-model value for the input |
| type | string | 'text' | Input type (text, email, password, number, date, time, url, tel) |
| placeholder | string | undefined | Input placeholder text |
| color | ColorsBrand \| ColorsState | undefined | Color variant of the input |
| size | Sizes | 'md' | Size of the input (xs, sm, md, lg) |
| disabled | boolean | false | Whether the input is disabled |
| fieldset | boolean | false | Whether to wrap input in a fieldset |
| fieldsetLegend | string | undefined | Legend text for the fieldset |
| fieldsetLabel | string | undefined | Helper text below the input |
| icon | IconNames | undefined | Icon to display in the input |
| iconSize | IconSizes | undefined | Size of the icon |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | string | Emitted when input value changes |

## Usage Examples

### Basic Input
```vue
<SimpleInput v-model="value" placeholder="Basic input" />
```

### With Icon
```vue
<SimpleInput v-model="value" icon="search" placeholder="Search..." />
```

### Password with Visibility Toggle
```vue
<SimpleInput v-model="password" type="password" placeholder="Enter your password" />
```

### With Fieldset
```vue
<SimpleInput
  v-model="value"
  fieldset
  fieldsetLegend="Contact Information"
  fieldsetLabel="Enter your email address"
  type="email"
  placeholder="email@example.com"
/>
```
</docs>