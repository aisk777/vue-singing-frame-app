<template>
  <div class="c-number" :class="{ 'c-number--short': short }">
    <input
      type="number"
      v-model="valueSync"
      :step="step"
      :min="min"
      :max="max"
      @blur="onBlur"
    />
    <div class="c-number__arrow">
      <button
        class="c-number__btn c-number__btn__increment"
        @click="onIncrement"
      >
        <arrowUp />
      </button>
      <button
        class="c-number__btn c-number__btn__decrement"
        @click="onDecrement"
      >
        <arrowDown />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import arrowDown from '@/assets/img/icon/arrow_down.svg';
import arrowUp from '@/assets/img/icon/arrow_up.svg';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FormInputNumber',
  components: {
    arrowUp,
    arrowDown
  },
  props: {
    modelValue: Number,
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    short: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, { emit }) {
    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => {
        if (value && !isNaN(value)) emit('update:modelValue', value);
      }
    });

    const clamp = (n: number) => {
      return Math.max(prop.min, Math.min(n, prop.max));
    };

    const onBlur = () => {
      if (!valueSync.value) return;
      valueSync.value = clamp(valueSync.value);
    };

    const onIncrement = () => {
      if (!valueSync.value) return;
      valueSync.value = clamp(valueSync.value + prop.step);
    };

    const onDecrement = () => {
      if (!valueSync.value) return;
      valueSync.value = clamp(valueSync.value - prop.step);
    };

    return {
      valueSync,
      onIncrement,
      onDecrement,
      onBlur
    };
  }
});
</script>

<style scoped lang="scss">
.c-number {
  display: inline-block;
  position: relative;
  z-index: 0;
  > input {
    border: 1px solid var(--subColor);
    background-color: var(--backColor);
    border-radius: 4px;
    letter-spacing: 0.05em;
    width: 100px;
    height: 48px;
    padding: 0 32px 2px 16px;
  }
  &__arrow {
    color: var(--subColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 14px;
    margin: auto 0;
    z-index: 1;
  }
  &__btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 10px;
  }
  &--short {
    > input {
      width: 70px;
      height: 36px;
      font-size: 14px;
      padding: 0 16px 0 12px;
    }
    .c-number__arrow {
      right: 6px;
    }
  }
}
</style>
