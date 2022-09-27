<template>
  <h1 class="c-ttl">カスタマイズ</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeadingTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss">
.c-ttl {
  border-bottom: 2px solid currentColor;
  color: var(--subColor);
  font-size: 26px;
  font-weight: 700;
  padding-bottom: 12px;
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}
</style>
