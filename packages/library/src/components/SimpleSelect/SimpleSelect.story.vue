<script setup lang="ts">
import { reactive, ref } from 'vue'
import SimpleSelect from './SimpleSelect.vue'
import * as V from '../../utils/ValidationRules'

// Basic state
const selectedColor = ref('')
const selectedFont = ref('')
const selectedBrowser = ref('')
const selectedEditor = ref('')
const selectedLanguage = ref('')
const selectedScheme = ref('')
const selectedSize = ref('')
const selectedModel = ref('')

// Standard options
const colorOptions = [
  { value: 'crimson', label: 'Crimson' },
  { value: 'amber', label: 'Amber' },
  { value: 'velvet', label: 'Velvet' }
]

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'raleway', label: 'Raleway' }
]

const browserOptions = [
  { value: 'chrome', label: 'Chrome' },
  { value: 'firefox', label: 'FireFox' },
  { value: 'safari', label: 'Safari' }
]

const editorOptions = [
  { value: 'vscode', label: 'VScode' },
  { value: 'vscode-fork', label: 'VScode fork' },
  { value: 'another-vscode-fork', label: 'Another VScode fork' }
]

const languageOptions = [
  { value: 'zig', label: 'Zig' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' }
]

const schemeOptions = [
  { value: 'light', label: 'Light mode' },
  { value: 'dark', label: 'Dark mode' },
  { value: 'system', label: 'System' }
]

const aiModelOptions = [
  { value: 'gpt3', label: 'GPT-3' },
  { value: 'gpt4', label: 'GPT-4' },
  { value: 'claude', label: 'Claude' },
  { value: 'llama', label: 'Llama' }
]

// Form with validation
const formState = reactive({
  country: '',
  language: '',
  color: '',
  submitted: false
})

// Country options with validation
const countryOptions = [
  { value: '', label: 'Select a country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' }
]

// Handle form submission
const handleSubmit = () => {
  formState.submitted = true
  setTimeout(() => {
    formState.submitted = false
  }, 1500)
}
</script>

<template>
  <Story title="SimpleSelect">
    <Variant title="Basic Select">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Basic Select</h3>
        <SimpleSelect 
          v-model="selectedColor" 
          :options="colorOptions" 
          placeholder="Pick a color"
        />
      </div>
    </Variant>

    <Variant title="Label and Error Examples">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Label and Error Examples</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">With Label</h4>
            <SimpleSelect 
              v-model="selectedColor" 
              :options="colorOptions" 
              placeholder="Pick a color"
              label="Favorite Color"
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Label + Required</h4>
            <SimpleSelect 
              v-model="selectedColor" 
              :options="colorOptions" 
              placeholder="Pick a color"
              label="Favorite Color"
              required
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Error Message</h4>
            <SimpleSelect 
              v-model="selectedColor" 
              :options="colorOptions" 
              placeholder="Pick a color"
              label="Favorite Color"
              error-message="Please select a color"
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Has Error Flag</h4>
            <SimpleSelect 
              v-model="selectedColor" 
              :options="colorOptions" 
              placeholder="Pick a color"
              label="Favorite Color"
              has-error
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Ghost Style">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Ghost Style (no background)</h3>
        <SimpleSelect 
          v-model="selectedFont" 
          :options="fontOptions" 
          placeholder="Pick a font"
          ghost
        />
      </div>
    </Variant>

    <Variant title="With Fieldset">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">With Fieldset</h3>
        <SimpleSelect 
          v-model="selectedBrowser" 
          :options="browserOptions" 
          placeholder="Pick a browser"
          fieldset
          fieldsetLegend="Browsers"
          fieldsetLabel="Optional"
        />
      </div>
    </Variant>

    <Variant title="Colors">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Color Variants</h3>
        <div class="space-y-4">
          <SimpleSelect 
            v-model="selectedEditor" 
            :options="editorOptions" 
            placeholder="Pick a text editor"
            color="primary"
          />
          
          <SimpleSelect 
            v-model="selectedLanguage" 
            :options="languageOptions" 
            placeholder="Pick a language"
            color="secondary"
          />
          
          <SimpleSelect 
            v-model="selectedScheme" 
            :options="schemeOptions" 
            placeholder="Color scheme"
            color="accent"
          />
          
          <SimpleSelect 
            v-model="selectedModel" 
            :options="aiModelOptions" 
            placeholder="Choose AI model"
            color="info"
          />
          
          <SimpleSelect 
            :options="aiModelOptions" 
            placeholder="Choose AI model"
            color="success"
          />
          
          <SimpleSelect 
            :options="aiModelOptions" 
            placeholder="Choose AI model"
            color="warning"
          />
          
          <SimpleSelect 
            :options="aiModelOptions" 
            placeholder="Choose AI model"
            color="error"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Size Variants</h3>
        <div class="space-y-4">
          <SimpleSelect 
            :options="colorOptions" 
            placeholder="Extra Small"
            size="xs"
          />
          
          <SimpleSelect 
            :options="colorOptions" 
            placeholder="Small"
            size="sm"
          />
          
          <SimpleSelect 
            :options="colorOptions" 
            placeholder="Medium (default)"
            size="md"
          />
          
          <SimpleSelect 
            :options="colorOptions" 
            placeholder="Large"
            size="lg"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Disabled State</h3>
        <SimpleSelect 
          :options="[{ value: 'disabled', label: 'You can\'t touch this' }]"
          placeholder="Disabled select"
          disabled
        />
      </div>
    </Variant>

    <Variant title="With Validation">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Form with Validation</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <SimpleSelect 
            v-model="formState.country" 
            :options="countryOptions" 
            placeholder="Select a country"
            name="country"
            fieldset
            fieldsetLegend="Country"
            required
            :validation="V.required('Please select a country')"
          />
          
          <SimpleSelect 
            v-model="formState.language" 
            :options="languageOptions" 
            placeholder="Select a language"
            name="language"
            fieldset
            fieldsetLegend="Programming Language"
            color="primary"
            required
            :validation="V.required('Please select a programming language')"
          />
          
          <SimpleSelect 
            v-model="formState.color" 
            :options="colorOptions" 
            placeholder="Select a color"
            name="color"
            fieldset
            fieldsetLegend="Favorite Color"
            color="secondary"
            required
            :validation="V.required('Please select your favorite color')"
          />
          
          <div class="flex justify-end">
            <button 
              type="submit" 
              class="btn btn-primary"
              :class="{ 'loading': formState.submitted }"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Variant>

    <Variant title="Using Slot for Options">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Using Slot for Custom Options</h3>
        <SimpleSelect placeholder="Choose a framework">
          <option value="vue">Vue.js</option>
          <option value="react">React</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
          <option value="solid">Solid</option>
        </SimpleSelect>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# SimpleSelect

A customizable select component that supports various styles, colors, sizes, and fieldset options.

## Features
- Various styles (default, ghost)
- Multiple sizes (xs, sm, md, lg)
- Color variants (primary, secondary, accent, etc.)
- Fieldset wrapper with legend and helper text
- Disabled state
- Required fields with validation
- Labels and error handling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string \| number | undefined | v-model value for the select |
| options | Array | [] | Array of options with value and label properties |
| placeholder | string | undefined | Placeholder text (shown as disabled option) |
| color | ColorsBrand \| ColorsState | undefined | Color variant of the select |
| size | Sizes | 'md' | Size of the select (xs, sm, md, lg) |
| disabled | boolean | false | Whether the select is disabled |
| ghost | boolean | false | Whether to show a ghost style (no background) |
| fieldset | boolean | false | Whether to wrap select in a fieldset |
| fieldsetLegend | string | undefined | Legend text for the fieldset |
| fieldsetLabel | string | undefined | Helper text below the select |
| error | string | undefined | Error message to display |
| required | boolean | false | Whether the field is required |
| label | string | undefined | Label to display above the select |
| errorMessage | string | undefined | Alternative way to provide error message |
| hasError | boolean | false | Whether to show select in error state |
| validation | ValidationRules | undefined | Validation rules to apply |
| validationMessages | object | undefined | Custom validation messages |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | string \| number \| null | Emitted when select value changes |
| blur | FocusEvent | Emitted when select loses focus |
| focus | FocusEvent | Emitted when select gains focus |
| change | Event | Emitted when select value changes |

## Usage Examples

### Basic Select
```vue
<SimpleSelect 
  v-model="selectedValue" 
  :options="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]" 
  placeholder="Select an option"
/>
```

### With Label
```vue
<SimpleSelect 
  v-model="selectedValue" 
  :options="options"
  label="Customer"
  placeholder="Select a customer"
/>
```

### With Error Message
```vue
<SimpleSelect 
  v-model="selectedValue" 
  :options="options"
  label="Customer"
  placeholder="Select a customer"
  error-message="Please select a customer"
/>
```

### With Fieldset
```vue
<SimpleSelect 
  v-model="selectedValue" 
  :options="options"
  placeholder="Select an option"
  fieldset
  fieldsetLegend="Options"
  fieldsetLabel="Select your preferred option"
/>
```

### With Validation
```vue
<SimpleSelect 
  v-model="selectedValue" 
  :options="options"
  name="country"
  fieldset
  fieldsetLegend="Country"
  required
  :validation="V.required('Please select a country')"
/>
```
</docs>
