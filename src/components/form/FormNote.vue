<template>
  <ul class="form-note">
    <li v-for="(item, i) in list" :key="i">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormNote',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.form-note {
  color: var(--primaryColor);
  font-size: 12px;
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-align: justify;
  margin-top: 12px;
  > li + li {
    margin-top: 4px;
  }
}
</style>
