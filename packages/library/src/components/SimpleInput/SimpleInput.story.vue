<script setup lang="ts">
import { reactive } from 'vue'
import SimpleInput from './SimpleInput.vue'
import { icons, iconSizes, sizes } from '@/globals'
import type { IconSizes, Sizes } from '@/globals'

type IconNames = (typeof icons)[number]

const state = reactive<{
  value: string
  icon: IconNames
  size: IconSizes
}>({
  value: '',
  icon: 'search',
  size: 6
})
</script>

<template>
  <Story :layout="{ type: 'grid', width: '100%' }" title="SimpleInput">
    <!-- Basic Input -->
    <Variant title="Basic">
      <SimpleInput v-model="state.value" placeholder="Basic input" />
    </Variant>

    <!-- With Icon -->
    <Variant title="With Icon">
      <SimpleInput v-model="state.value" :icon="state.icon" placeholder="Search..." />
    </Variant>

    <!-- Sizes -->
    <Variant title="Sizes">
      <div class="flex flex-col gap-2">
        <SimpleInput size="xs" placeholder="Extra Small" />
        <SimpleInput size="sm" placeholder="Small" />
        <SimpleInput size="md" placeholder="Medium" />
        <SimpleInput size="lg" placeholder="Large" />
      </div>
    </Variant>

    <!-- Colors -->
    <Variant title="Colors">
      <div class="flex flex-col gap-2">
        <SimpleInput color="primary" placeholder="Primary" />
        <SimpleInput color="secondary" placeholder="Secondary" />
        <SimpleInput color="accent" placeholder="Accent" />
        <SimpleInput color="info" placeholder="Info" />
        <SimpleInput color="success" placeholder="Success" />
        <SimpleInput color="warning" placeholder="Warning" />
        <SimpleInput color="error" placeholder="Error" />
      </div>
    </Variant>

    <!-- Types -->
    <Variant title="Input Types">
      <div class="flex flex-col gap-2">
        <SimpleInput type="text" placeholder="Text" />
        <SimpleInput type="email" placeholder="Email" />
        <SimpleInput type="password" placeholder="Password" />
        <SimpleInput type="number" placeholder="Number" />
        <SimpleInput type="date" />
        <SimpleInput type="time" />
        <SimpleInput type="url" placeholder="URL" />
        <SimpleInput type="tel" placeholder="Phone" />
      </div>
    </Variant>

    <!-- Fieldset -->
    <Variant title="With Fieldset">
      <SimpleInput 
        v-model="state.value" 
        fieldset 
        fieldsetLegend="Contact Information" 
        fieldsetLabel="Enter your email address"
        type="email"
        placeholder="email@example.com"
      />
    </Variant>

    <!-- Disabled -->
    <Variant title="Disabled">
      <SimpleInput 
        disabled 
        value="Disabled input" 
        placeholder="This is disabled"
      />
    </Variant>

    <template #controls>
      <HstText v-model="state.value" title="Value" />
      <HstSelect v-model="state.icon" :options="icons" title="Icon" />
      <HstSelect v-model="state.size" :options="iconSizes" title="Icon Size" />
    </template>
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