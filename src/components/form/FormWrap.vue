<template>
  <div class="form-wrap">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormWrap'
});
</script>

<style scoped lang="scss">
.form-wrap {
  & + & {
    margin-top: 24px;
  }
}
</style>
