---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Simple Daisy Vue"
  text: "A Vue 3 Component Library based on DaisyUI"
  tagline: Modern, accessible, and customizable components for Vue 3 applications
  actions:
    - theme: brand
      text: Get Started
      link: /install-recommended
    - theme: alt
      text: View Components
      link: /components

features:
  - title: Vue 3 Composition API
    details: Built with Vue 3 and TypeScript using the Composition API and <script setup> syntax.
  - title: DaisyUI + Tailwind CSS
    details: Leverage the power of DaisyUI and Tailwind CSS for beautiful, responsive components.
  - title: Fully Typed
    details: Complete TypeScript support with strong type definitions for better developer experience.
  - title: Highly Customizable
    details: Customize components with props and slots to fit your application's needs.
  - title: Consistent API
    details: All components follow a consistent naming convention and API design pattern.
  - title: Accessible
    details: Components are designed with accessibility in mind, following best practices.
---

<script setup>
import { SimpleButton, SimpleAccordion, SimpleAccordionPanel } from 'simple-daisy-vue'
</script>

<div class="flex flex-col items-center my-12 gap-4">
  <h2 class="text-center text-xl font-bold">Explore Our Components</h2>
  
  <div class="flex gap-4 flex-wrap justify-center">
    <SimpleButton color="primary">Primary Button</SimpleButton>
    <SimpleButton color="secondary">Secondary Button</SimpleButton>
    <SimpleButton color="accent">Accent Button</SimpleButton>
  </div>
  
  <div class="w-full max-w-md mt-6">
    <SimpleAccordion>
      <SimpleAccordionPanel title="Easy to Use">
        <p>Simple Daisy Vue components are designed to be intuitive and easy to implement in your Vue 3 projects.</p>
      </SimpleAccordionPanel>
      <SimpleAccordionPanel title="Customizable">
        <p>Leverage DaisyUI's theming capabilities and component props to customize the look and feel to match your brand.</p>
      </SimpleAccordionPanel>
      <SimpleAccordionPanel title="Type-Safe">
        <p>Built with TypeScript, providing excellent editor support, autocompletion, and type checking.</p>
      </SimpleAccordionPanel>
    </SimpleAccordion>
  </div>
</div>

