<template>
  <div class="c-select">
    <select v-model="valueSync">
      <option value="">-</option>
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
    <arrowBottom />
    <!--    <p class="pretext">ここにプレビューが入ります。</p>-->
  </div>
</template>

<script lang="ts">
import arrowBottom from '@/assets/img/icon/arrow_bottom.svg';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FormInputSelect',
  components: {
    arrowBottom
  },
  props: {
    modelValue: String,
    options: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '360px'
    }
  },
  setup(prop, { emit }) {
    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => emit('update:modelValue', value)
    });
    return { valueSync };
  }
});
</script>

<style scoped lang="scss">
.c-select {
  position: relative;
  display: inline-block;
  z-index: 0;
  > select {
    background-color: var(--backColor);
    border: 1px solid var(--subColor);
    border-radius: 4px;
    padding: 0 32px 0 16px;
    width: v-bind(width);
    height: 48px;
    line-height: 1.5;
    letter-spacing: 0.05em;
  }
  > svg {
    color: var(--subColor);
    position: absolute;
    top: 0;
    bottom: 1px;
    right: 16px;
    margin: auto 0;
    z-index: 1;
    pointer-events: none;
  }
}
// TODO font-family指定の見本
//.pretext {
//  font-size: 40px;
//  font-family: v-bind(family);
//}
</style>
