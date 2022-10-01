<template>
  <div class="form__box"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormBox'
});
</script>

<style scoped lang="scss">
.form__box {
  background-color: var(--backColor);
  border: 1px solid var(--borderColor);
  border-radius: 4px;
  padding: 24px;
}
</style>
