# Technical Context

## Technology Stack
The Daisy UI Vue component library is built with the following core technologies:

- **Vue 3**: The progressive JavaScript framework for building user interfaces
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Component library for Tailwind CSS that provides pre-designed components
- **Vite**: Modern build tool for frontend development
- **Histoire**: Component documentation and showcase tool
- **Vitest**: Unit testing framework for Vite
- **VitePress**: Static site generator for documentation

## Key Dependencies
```json
{
  "dependencies": {
    "@iconify/vue": "^4.3.0",
    "@tailwindcss/postcss": "^4.0.11",
    "@tailwindcss/vite": "^4.0.11",
    "daisyui": "^5.0.0",
    "nanoid": "^5.1.3",
    "radix-vue": "^1.9.17",
    "tailwindcss": "^4.0.11"
  }
}
```

## Development Setup
The project uses the following development tools and configurations:

- **pnpm**: Package manager with workspace support for monorepo structure
- **ESLint**: For code linting with Vue and TypeScript rules
- **Prettier**: For code formatting
- **Changesets**: For managing versioning and changelogs
- **Hygen**: For code generation templates

## Build System
The library is built using Vite with the following configuration:

- Vue SFC (Single File Components) with TypeScript
- TypeScript declaration files are generated during build
- CSS is extracted to separate files
- Components are exported both as ES modules and CommonJS

## Testing Environment
- **Vitest**: For unit testing Vue components
- **@vue/test-utils**: For component testing utilities
- **jsdom**: For DOM environment in Node.js

## Deployment
The library is published to npm with the following structure:

- **dist/**: Built JS and CSS files
- **dist/types/**: TypeScript declaration files
- **src/**: Source code (also published for easier debugging)

## Technical Constraints
- Must support Vue 3.x
- Components must be compatible with DaisyUI classes and structure
- Maintain backward compatibility for minor version updates
- Support both module and CommonJS imports
- Support tree-shaking to allow importing individual components 