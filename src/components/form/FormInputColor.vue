<template>
  <h3 class="c-label">ベース</h3>
  <div class="c-color">
    <label class="c-color__label">
      <input type="color" v-model="valueSync.hex" />
    </label>
  </div>
  <FormItem class="form-item--short" gap="12px">
    <template #icon="o">
      <div :class="o.class"><iconOpacity /></div>
    </template>
    <FormInputNumber short v-model="valueSync.opacity" />
    <template #txt="o">
      <span :class="o.class">%</span>
    </template>
  </FormItem>
</template>

<script lang="ts">
import IconOpacity from '@/assets/img/icon/icon_opacity.svg';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormItem from '@/components/form/FormItem.vue';
import { ColorData } from '@/store';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FormInputColor',
  components: { FormInputNumber, FormItem, IconOpacity },
  props: {
    modelValue: {
      type: Object as PropType<ColorData>,
      required: true
    }
  },
  setup(prop, { emit }) {
    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const hex = computed(() => prop.modelValue.hex);
    const opacity = computed(() => prop.modelValue.opacity / 100);

    return { valueSync, hex, opacity };
  }
});
</script>

<style lang="scss" scoped>
.c-label {
  display: block;
  color: #999;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.c-color {
  position: relative;
  border: 1px solid var(--iconColor);
  border-radius: 4px;
  z-index: 0;
  margin-bottom: 12px;
  &::after {
    content: '';
    position: absolute;
    right: 4px;
    bottom: 4px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 8px 8px;
    border-color: transparent;
    border-bottom-color: #000;
    opacity: 0.4;
    z-index: 2;
  }
  &__label {
    position: relative;
    background-color: v-bind(hex);
    opacity: v-bind(opacity);
    width: 100%;
    height: 36px;
    z-index: 0;
  }
}
</style>
