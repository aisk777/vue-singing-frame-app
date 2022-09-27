<template>
  <li class="form__row">
    <h2 class="form__ttl">{{ title }}</h2>
    <div class="form__box"><slot /></div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormBlock',
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.form {
  &__ttl {
    width: 160px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding-right: 32px;
    flex-shrink: 0;
  }
  &__row {
    border-bottom: 1px solid var(--lineColor);
    display: flex;
    padding: 24px 0;
  }
  &__box {
    border-left: 1px dashed var(--lineColor);
    padding-left: 32px;
  }
}
</style>
