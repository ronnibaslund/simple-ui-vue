<script setup lang="ts">
import {SimpleTabs, SimpleTab} from 'simple-daisy-vue'

const types = ['Bordered', 'Boxed', 'Lifted'] as const

</script>

# Tabs

### Lifted

<SimpleTabs type="lifted">
    <SimpleTab name="Preview">
        <SimpleTabs type="lifted">
        <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
        <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
        <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
    </SimpleTabs>
    </SimpleTab>
<SimpleTab name="Code">

```html
<SimpleTabs type="lifted">
  <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
  <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
  <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
</SimpleTabs>
```

</SimpleTab>

</SimpleTabs>

### Bordered

<SimpleTabs type="lifted">
    <SimpleTab name="Preview">
        <SimpleTabs type="bordered">
        <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
        <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
        <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
    </SimpleTabs>
    </SimpleTab>
<SimpleTab name="Code">

```html
<SimpleTabs type="bordered">
  <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
  <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
  <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
</SimpleTabs>
```

</SimpleTab>

</SimpleTabs>

### Boxed

<SimpleTabs type="lifted">
    <SimpleTab name="Preview">
        <SimpleTabs type="boxed">
        <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
        <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
        <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
    </SimpleTabs>
    </SimpleTab>
<SimpleTab name="Code">

```html
<SimpleTabs type="boxed">
  <SimpleTab name="Tab 1">Tab 1 Content</SimpleTab>
  <SimpleTab name="Tab 2">Tab 2 Content</SimpleTab>
  <SimpleTab name="Tab 3">Tab 3 Content</SimpleTab>
</SimpleTabs>
```

</SimpleTab>

</SimpleTabs>
