<script setup lang="ts">
import { reactive } from 'vue'
import SimpleAccordion from './SimpleAccordion.vue'
import SimpleAccordionPanel from '../SimpleAccordionPanel/SimpleAccordionPanel.vue'

const state = reactive({
  multipleOpen: false
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Default Accordion">
      <SimpleAccordion>
        <SimpleAccordionPanel title="How do I create an account?" checked>
          <p>Click the "Sign Up" button in the top right corner and follow the registration process.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="I forgot my password. What should I do?">
          <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="How do I update my profile information?">
          <p>Go to "My Account" settings and select "Edit Profile" to make changes.</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <Variant title="Accordion with Arrow">
      <SimpleAccordion>
        <SimpleAccordionPanel title="How do I create an account?" icon="arrow" checked>
          <p>Click the "Sign Up" button in the top right corner and follow the registration process.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="I forgot my password. What should I do?" icon="arrow">
          <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="How do I update my profile information?" icon="arrow">
          <p>Go to "My Account" settings and select "Edit Profile" to make changes.</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <Variant title="Accordion with Plus/Minus">
      <SimpleAccordion>
        <SimpleAccordionPanel title="How do I create an account?" icon="plus" checked>
          <p>Click the "Sign Up" button in the top right corner and follow the registration process.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="I forgot my password. What should I do?" icon="plus">
          <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="How do I update my profile information?" icon="plus">
          <p>Go to "My Account" settings and select "Edit Profile" to make changes.</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <Variant title="Multiple Open Accordion">
      <SimpleAccordion multipleOpen>
        <SimpleAccordionPanel title="How do I create an account?" checked>
          <p>Click the "Sign Up" button in the top right corner and follow the registration process.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="I forgot my password. What should I do?">
          <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="How do I update my profile information?">
          <p>Go to "My Account" settings and select "Edit Profile" to make changes.</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <template #controls>
      <HstCheckbox v-model="state.multipleOpen" title="Allow Multiple Open" />
    </template>
  </Story>
</template>
