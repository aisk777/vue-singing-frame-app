<template>
  <ul class="form-list">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormList',
  props: {
    gap: {
      type: String,
      default: '16px'
    }
  }
});
</script>

<style scoped lang="scss">
.form-list {
  display: flex;
  gap: v-bind(gap);
}
</style>
