<template>
  <h3 class="c-label">{{ sub }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormSubTitle',
  props: {
    sub: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.c-label {
  width: max-content;
  font-size: 12px;
  font-weight: 700;
  background-color: var(--primaryColor);
  color: var(--baseColor);
  letter-spacing: 0.05em;
  padding: 5px 6px 6px;
  margin-bottom: 8px;
}
</style>
