# System Patterns

## Architecture
The Daisy UI Vue component library follows a modular architecture with the following key principles:

1. **Component-based**: Each UI element is a self-contained Vue component with its own functionality, styles, and tests
2. **Composition API**: All components use Vue 3's Composition API with `<script setup>` for better type inference and improved organization
3. **Flat Structure**: Components are organized in a flat directory structure by feature, making it easy to locate and maintain components

## Directory Structure
```
packages/
  ├── library/           # Main component library
  │   ├── src/
  │   │   ├── components/   # All UI components
  │   │   │   ├── SimpleButton/
  │   │   │   │   ├── SimpleButton.vue
  │   │   │   │   ├── SimpleButton.story.vue
  │   │   │   │   └── __tests__/
  │   │   │   │       └── SimpleButton.spec.ts
  │   │   ├── globals/      # Global types, constants, and settings
  │   │   ├── utils/        # Utility functions
  │   │   └── directives/   # Vue directives
  │   └── dist/            # Built artifacts
  └── docs/               # VitePress documentation site
```

## Component Patterns
Each component follows these patterns:

### Naming Conventions
- All component names start with "Simple" prefix (e.g., `SimpleButton`)
- Props use camelCase
- Component files are named with PascalCase
- TypeScript types are named with PascalCase
- CSS classes use kebab-case

### Component Structure
```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'
import type { Props } from '../../globals'

// Props definition with defaults
const props = withDefaults(defineProps<{
  size?: Sizes
  color?: Colors
  // other props
}>(), {
  size: 'md'
  // other defaults
})

// Computed properties for classes/styles
const classes = computed(() => { /* ... */ })

// Event emitters
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'click': [event: MouseEvent]
}>()

// Component logic
</script>

<template>
  <div class="component-wrapper">
    <!-- Component template -->
  </div>
</template>
```

### Type System
- Global types are defined in `globals/` directory
- Component props use TypeScript interfaces or type aliases
- Strict type checking is enforced
- Enums are avoided in favor of union types with string literals

## Documentation Patterns
- Each component has a story file for Histoire to showcase its usage
- Components include JSDoc comments for better developer experience
- The documentation site built with VitePress provides usage examples and API documentation

## Testing Strategy
- Unit tests are written using Vitest
- Components are tested for:
  - Rendering properly
  - Handling props correctly 
  - Emitting events as expected
  - Edge cases and error conditions

## Design System Integration
- Components leverage DaisyUI's design tokens and utility classes
- Tailwind CSS is used for styling
- Custom styles are minimized and only used when necessary 