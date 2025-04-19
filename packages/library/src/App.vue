<script setup lang="ts">
import { ref } from 'vue'
import SimpleToggle from './components/SimpleToggle/SimpleToggle.vue'
import SimpleButton from './components/SimpleButton/SimpleButton.vue'
import SimpleTabs from './components/SimpleTabs/SimpleTabs.vue'
import SimpleTab from './components/SimpleTab/SimpleTab.vue'

const test = ref(true)
</script>

<template>
  <div class="container">
    <section>
      <h2>SimpleButton</h2>
      <SimpleButton :color="'primary'">Click Me</SimpleButton>
    </section>

    <section>
      <h2>SimpleToggle</h2>
      <SimpleToggle v-model="test" color="error" />
      <SimpleToggle v-model="test" color="warning" />
      <SimpleToggle v-model="test" color="success" />
    </section>

    <section>
      <h2>SimpleInput</h2>
      <p>
        Icons:
        <a href="https://icon-sets.iconify.design/carbon/?keyword=carbon"
          >https://icon-sets.iconify.design/carbon/?keyword=carbon</a
        >
      </p>
      <br />

      <SimpleInput
        type="text"
        placeholder="Type here"
        :color="'primary'"
        :size="'md'"
        :disabled="false"
        icon="user"
      />

      <SimpleInput
        type="text"
        placeholder="Type here"
        :color="'primary'"
        :size="'lg'"
        :disabled="false"
        :fieldset="true"
        fieldsetLegend="This is a legend"
        fieldsetLabel="This is a helper text"
        icon="user"
      />
    </section>

    <section>
      <SimpleTabs :type="'lifted'">
        <SimpleTab name="Tab 1">
          Lorem 1 ipsum dolor sit amet, consectetur adipisicing elit. Expedita saepe sapiente fugit
          minus labore quos libero possimus sint molestiae quisquam, optio quam voluptatem veritatis
          a accusantium, cumque error nam quaerat.
        </SimpleTab>
        <SimpleTab name="Tab 2">
          Lorem 2 ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium
          accusantium optio soluta eaque quam? Labore libero ratione quam aut natus vitae? Error
          voluptatum velit voluptatem accusamus ut optio officia!
        </SimpleTab>
        <SimpleTab name="Tab 3">
          Lorem 3 ipsum dolor sit amet consectetur adipisicing elit. Esse ipsam, deserunt
          accusantium ex dolores, ducimus aperiam consequatur sint debitis maxime saepe inventore
          quisquam officiis fuga voluptatem quia odio, recusandae fugit?
        </SimpleTab>
      </SimpleTabs>
    </section>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
}
section {
  margin-bottom: 2rem;
}
h2 {
  margin-bottom: 1rem;
}
</style>
