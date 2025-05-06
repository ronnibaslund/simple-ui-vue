<script setup lang="ts">
import { reactive, ref } from 'vue'
import SimpleTextarea from './SimpleTextarea.vue'
import * as V from '../../utils/ValidationRules'

// Basic state
const basicValue = ref('')
const feedbackValue = ref('')
const descriptionValue = ref('')
const blogPostValue = ref('')
const commentsValue = ref('')
const notesValue = ref('')

// Form with validation
const formState = reactive({
  bio: '',
  comments: '',
  description: '',
  submitted: false
})

// Handle form submission
const handleSubmit = () => {
  formState.submitted = true
  setTimeout(() => {
    formState.submitted = false
  }, 1500)
}
</script>

<template>
  <Story title="SimpleTextarea">
    <Variant title="Basic Textarea">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Basic Textarea</h3>
        <SimpleTextarea 
          v-model="basicValue" 
          placeholder="Enter text here"
        />
      </div>
    </Variant>
    
    <Variant title="Label and Error Examples">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Label and Error Examples</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">With Label</h4>
            <SimpleTextarea 
              v-model="basicValue" 
              label="Description"
              placeholder="Enter a description" 
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Label + Required</h4>
            <SimpleTextarea 
              v-model="basicValue" 
              label="Description"
              placeholder="Enter a description"
              required
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Error Message</h4>
            <SimpleTextarea 
              v-model="basicValue" 
              label="Description"
              placeholder="Enter a description"
              error-message="Please enter a description"
            />
          </div>
          
          <div>
            <h4 class="font-medium mb-2">With Has Error Flag</h4>
            <SimpleTextarea 
              v-model="basicValue" 
              label="Description"
              placeholder="Enter a description"
              has-error
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Ghost Style">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Ghost Style (no background)</h3>
        <SimpleTextarea 
          v-model="feedbackValue" 
          placeholder="Your feedback"
          ghost
        />
      </div>
    </Variant>

    <Variant title="With Fieldset">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">With Fieldset</h3>
        <SimpleTextarea 
          v-model="descriptionValue" 
          placeholder="Describe yourself"
          fieldset
          fieldsetLegend="Your bio"
          fieldsetLabel="Optional"
          :rows="4"
        />
      </div>
    </Variant>

    <Variant title="Colors">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Color Variants</h3>
        <div class="space-y-4">
          <SimpleTextarea 
            placeholder="Primary textarea"
            color="primary"
          />
          
          <SimpleTextarea 
            placeholder="Secondary textarea"
            color="secondary"
          />
          
          <SimpleTextarea 
            placeholder="Accent textarea"
            color="accent"
          />
          
          <SimpleTextarea 
            placeholder="Info textarea"
            color="info"
          />
          
          <SimpleTextarea 
            placeholder="Success textarea"
            color="success"
          />
          
          <SimpleTextarea 
            placeholder="Warning textarea"
            color="warning"
          />
          
          <SimpleTextarea 
            placeholder="Error textarea"
            color="error"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Size Variants</h3>
        <div class="space-y-4">
          <SimpleTextarea 
            placeholder="Extra Small"
            size="xs"
          />
          
          <SimpleTextarea 
            placeholder="Small"
            size="sm"
          />
          
          <SimpleTextarea 
            placeholder="Medium (default)"
            size="md"
          />
          
          <SimpleTextarea 
            placeholder="Large"
            size="lg"
          />
          
          <SimpleTextarea 
            placeholder="Extra Large"
            size="xl"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Rows">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Different Row Heights</h3>
        <div class="space-y-4">
          <SimpleTextarea 
            v-model="blogPostValue" 
            placeholder="Short comment (2 rows)"
            :rows="2"
          />
          
          <SimpleTextarea 
            v-model="commentsValue" 
            placeholder="Medium text (default 3 rows)"
          />
          
          <SimpleTextarea 
            v-model="notesValue" 
            placeholder="Long content (6 rows)"
            :rows="6"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Disabled State</h3>
        <SimpleTextarea 
          placeholder="This textarea is disabled"
          disabled
        />
      </div>
    </Variant>

    <Variant title="With Validation">
      <div class="p-4 max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-4">Form with Validation</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <SimpleTextarea 
            v-model="formState.bio" 
            placeholder="Enter your bio"
            name="bio"
            fieldset
            fieldsetLegend="Bio"
            required
            :validation="V.required('Please enter your bio')"
            :rows="4"
          />
          
          <SimpleTextarea 
            v-model="formState.comments" 
            placeholder="Your comments"
            name="comments"
            fieldset
            fieldsetLegend="Comments"
            color="primary"
            required
            :validation="[
              V.required('Please enter your comments'),
              V.minLength(10, 'Comments must be at least 10 characters')
            ]"
            :rows="3"
          />
          
          <SimpleTextarea 
            v-model="formState.description" 
            placeholder="Optional description"
            name="description"
            fieldset
            fieldsetLegend="Description"
            color="secondary"
            :rows="3"
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
  </Story>
</template>

<docs lang="md">
# SimpleTextarea

A textarea component with various styling options and validation support.

## Features

- Various color variants (primary, secondary, accent, etc.)
- Different sizes (xs, sm, md, lg, xl)
- Ghost variant (no background)
- Fieldset with legend and label support
- Validation integration
- Form context integration
- Customizable number of rows
- Labels and error handling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string \| null | undefined | v-model binding value |
| name | string | undefined | Input name for form submission |
| placeholder | string | undefined | Placeholder text |
| color | string | undefined | Color variant (primary, secondary, accent, etc.) |
| size | string | 'md' | Size variant (xs, sm, md, lg, xl) |
| rows | number | 3 | Number of rows to display |
| disabled | boolean | false | Whether the textarea is disabled |
| ghost | boolean | false | Whether to use ghost style (no background) |
| fieldset | boolean | false | Whether to wrap in a fieldset |
| fieldsetLegend | string | undefined | Legend text for fieldset |
| fieldsetLabel | string | undefined | Helper text below the textarea |
| required | boolean | false | Whether the field is required |
| validation | ValidationRule \| ValidationRule[] | undefined | Custom validation rules |
| error | string | undefined | Error message to display |
| label | string | undefined | Label to display above the textarea |
| errorMessage | string | undefined | Alternative way to provide error message |
| hasError | boolean | false | Whether to show textarea in error state |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | string \| null | Emitted when content changes |
| change | Event | Native change event |
| focus | FocusEvent | Native focus event |
| blur | BlurEvent | Native blur event |

## Usage Examples

### Basic Usage

```vue
<SimpleTextarea 
  v-model="feedback" 
  placeholder="Enter your feedback"
/>
```

### With Label

```vue
<SimpleTextarea 
  v-model="description" 
  label="Description"
  placeholder="Enter a description"
/>
```

### With Error Message

```vue
<SimpleTextarea 
  v-model="description" 
  label="Description"
  placeholder="Enter a description"
  error-message="Please enter a description"
/>
```

### With Fieldset

```vue
<SimpleTextarea 
  v-model="bio" 
  placeholder="Tell us about yourself"
  fieldset
  fieldsetLegend="Your Bio"
  fieldsetLabel="Optional"
  rows="4"
/>
```

### With Validation

```vue
<SimpleTextarea 
  v-model="comments" 
  placeholder="Your comments"
  required
  :validation="V.minLength(10, 'Comments must be at least 10 characters')"
/>
```
</docs>
