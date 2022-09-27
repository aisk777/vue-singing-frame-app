<template>
  <label class="c-radio-box">
    <input type="radio" />
    <span class="c-radio-box__main">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormInputRadioBox'
});
</script>

<style scoped lang="scss">
.c-radio-box {
  display: inline-block;
  &__main {
    display: block;
    background-color: var(--backColor);
    border: 1px dashed var(--borderColor);
    border-radius: 4px;
    width: 60px;
    height: 70px;
  }
}
</style>
