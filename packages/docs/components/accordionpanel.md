<script setup lang="ts">
import { SimpleAccordion, SimpleAccordionPanel } from 'simple-daisy-vue'
</script>

# AccordionPanel Component

The AccordionPanel component is designed to be used within a SimpleAccordion. It represents an individual collapsible section with a title and content.

## Basic Usage

AccordionPanel components must be used as children of a SimpleAccordion component.

<div class="my-8">
  <SimpleAccordion>
    <SimpleAccordionPanel title="Basic Panel">
      <p>This is the content of the accordion panel. It's hidden by default and shown when the panel is expanded.</p>
      <p class="mt-2">You can include any content in an accordion panel, including text, images, forms, and other components.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<SimpleAccordion>
  <SimpleAccordionPanel title="Basic Panel">
    <p>This is the content of the accordion panel.</p>
    <p class="mt-2">You can include any content in an accordion panel.</p>
  </SimpleAccordionPanel>
</SimpleAccordion>
```

## Custom Title

You can customize the title of the panel using the `title` slot.

<div class="my-8">
  <SimpleAccordion>
    <SimpleAccordionPanel>
      <template #title>
        <div class="flex items-center gap-2">
          <span class="badge badge-secondary">Custom</span>
          <span>Panel with custom title</span>
        </div>
      </template>
      <p>This panel has a custom title with a badge component.</p>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<SimpleAccordion>
  <SimpleAccordionPanel>
    <template #title>
      <div class="flex items-center gap-2">
        <span class="badge badge-secondary">Custom</span>
        <span>Panel with custom title</span>
      </div>
    </template>
    <p>This panel has a custom title with a badge component.</p>
  </SimpleAccordionPanel>
</SimpleAccordion>
```

## Rich Content

You can include rich content within accordion panels, such as lists, images, or other components.

<div class="my-8">
  <SimpleAccordion>
    <SimpleAccordionPanel title="Rich Content Example">
      <h3 class="text-lg font-bold">Nested Content</h3>
      <ul class="list-disc pl-5 mt-2">
        <li>First item in a list</li>
        <li>Second item in a list</li>
        <li>Third item with <a href="#" class="text-primary underline">a link</a></li>
      </ul>
      <div class="alert alert-info mt-4">
        <p>You can even include other components inside accordion panels!</p>
      </div>
    </SimpleAccordionPanel>
  </SimpleAccordion>
</div>

```vue
<SimpleAccordion>
  <SimpleAccordionPanel title="Rich Content Example">
    <h3 class="text-lg font-bold">Nested Content</h3>
    <ul class="list-disc pl-5 mt-2">
      <li>First item in a list</li>
      <li>Second item in a list</li>
      <li>Third item with <a href="#" class="text-primary underline">a link</a></li>
    </ul>
    <div class="alert alert-info mt-4">
      <p>You can even include other components inside accordion panels!</p>
    </div>
  </SimpleAccordionPanel>
</SimpleAccordion>
```

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | The title text to display in the panel header. |

### Slots

| Slot | Description |
|------|-------------|
| `default` | The content to display when the panel is expanded. |
| `title` | Custom content for the panel title. Overrides the `title` prop if both are provided. |

### Notes

- AccordionPanel must be used within a SimpleAccordion component.
- The panel's open/close state is managed by the parent SimpleAccordion.
- When the `multipleOpen` prop on SimpleAccordion is `false` (default), opening one panel will close any other open panels. 