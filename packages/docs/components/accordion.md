<script setup lang="ts">
import { ref } from 'vue'
import { SimpleAccordion, SimpleAccordionPanel } from 'simple-daisy-vue'

const multipleOpen = ref(false)
</script>

# Accordion Component

The Accordion component provides a way to show collapsible content panels, allowing users to expand and collapse sections as needed. It's useful for organizing content in a space-efficient way.

## Basic Usage

<div class="my-8">
  <SimpleAccordion>
    <SimpleAccordionPanel title="Section 1">
      <p>Content for section 1. This content is hidden by default and will be revealed when the panel is expanded.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 2">
      <p>Content for section 2. This is another collapsible section that can be expanded independently.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 3">
      <p>Content for section 3. Add as many panels as needed to organize your content.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<SimpleAccordion>
  <SimpleAccordionPanel title="Section 1">
    <p>Content for section 1.</p>
  </SimpleAccordionPanel>
  <SimpleAccordionPanel title="Section 2">
    <p>Content for section 2.</p>
  </SimpleAccordionPanel>
  <SimpleAccordionPanel title="Section 3">
    <p>Content for section 3.</p>
  </SimpleAccordionPanel>
</SimpleAccordion>
```

## Multiple Panels Open

By default, only one panel can be open at a time. Set the `multipleOpen` prop to `true` to allow multiple panels to be open simultaneously.

<div class="my-8">
  <div class="form-control mb-4">
    <label class="cursor-pointer label">
      <span class="label-text">Allow multiple panels open</span>
      <input type="checkbox" v-model="multipleOpen" class="toggle toggle-primary" />
    </label>
  </div>
  
  <SimpleAccordion :multipleOpen="multipleOpen">
    <SimpleAccordionPanel title="Section 1">
      <p>Content for section 1. When multiple panels are allowed, this panel can remain open while others are expanded.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 2">
      <p>Content for section 2. Try clicking multiple section headers to see how they behave.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 3">
      <p>Content for section 3. With multiple panels open, you can view all relevant content at once.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<template>
  <SimpleAccordion :multipleOpen="multipleOpen">
    <SimpleAccordionPanel title="Section 1">
      <p>Content for section 1.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 2">
      <p>Content for section 2.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel title="Section 3">
      <p>Content for section 3.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</template>

<script setup>
import { ref } from 'vue'

const multipleOpen = ref(false)
</script>
```

## Custom Title Content

You can customize the title content using the `title` slot instead of the `title` prop.

<div class="my-8">
  <SimpleAccordion>
    <SimpleAccordionPanel>
      <template #title>
        <div class="flex items-center gap-2">
          <span class="badge badge-primary">New</span>
          <span>Custom Title with Badge</span>
        </div>
      </template>
      <p>This panel uses a custom title with a badge component.</p>
    </SimpleAccordionPanel>
    <SimpleAccordionPanel>
      <template #title>
        <div class="flex items-center gap-2">
          <span class="text-primary">🔍</span>
          <span>Search Results</span>
        </div>
      </template>
      <p>You can include icons or any other components in your title.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<SimpleAccordion>
  <SimpleAccordionPanel>
    <template #title>
      <div class="flex items-center gap-2">
        <span class="badge badge-primary">New</span>
        <span>Custom Title with Badge</span>
      </div>
    </template>
    <p>This panel uses a custom title with a badge component.</p>
  </SimpleAccordionPanel>
  
  <SimpleAccordionPanel>
    <template #title>
      <div class="flex items-center gap-2">
        <span class="text-primary">🔍</span>
        <span>Search Results</span>
      </div>
    </template>
    <p>You can include icons or any other components in your title.</p>
  </SimpleAccordionPanel>
</SimpleAccordion>
```

## Component API

### SimpleAccordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `multipleOpen` | `boolean` | `false` | When set to true, allows multiple panels to be open simultaneously. |

### SimpleAccordionPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | The title text to display in the panel header. |

### SimpleAccordionPanel Slots

| Slot | Description |
|------|-------------|
| `default` | The content to display when the panel is expanded. |
| `title` | Custom content for the panel title. Overrides the `title` prop if both are provided. |