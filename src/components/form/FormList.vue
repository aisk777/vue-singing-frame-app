<template>
  <ul class="form__list">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormList'
});
</script>

<style scoped lang="scss">
.form__list {
  display: flex;
  gap: 16px;
}
</style>
