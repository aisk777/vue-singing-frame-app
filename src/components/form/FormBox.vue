<template>
  <div class="form-box"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormBox'
});
</script>

<style scoped lang="scss">
.form-box {
  background-color: var(--backColor);
  border: 1px solid var(--borderColor);
  border-radius: 4px;
  padding: 0 24px;
  > :deep(* + *) {
    border-top: 1px solid var(--borderColor);
  }
}
</style>
