<template>
  <div class="form-item">
    <slot name="icon" class="icon" />
    <slot />
    <slot name="txt" class="txt" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormItem',
  props: {
    gap: {
      type: String,
      default: '16px'
    }
  }
});
</script>

<style scoped lang="scss">
.form-item {
  display: flex;
  align-items: center;
  gap: v-bind(gap);
  :deep(> .icon) {
    color: var(--subColor);
  }
  :deep(> .txt) {
    font-size: 16px;
    font-weight: 700;
    margin-left: -4px;
    padding-bottom: 2px;
  }
  &--short {
    :deep(> .icon) {
      color: var(--iconColor);
    }
    :deep(> .txt) {
      font-size: 14px;
    }
  }
}
</style>
