<template>
  <label class="c-check" :class="activeCls">
    <input :type="type" :value="item.value" v-model="valueSync" />
    <span class="c-check__item">
      <iconCheck v-if="type === 'checkbox'" class="c-check--box__arrow" />
      {{ item.label }}
    </span>
  </label>
</template>

<script lang="ts">
import iconCheck from '@/assets/img/icon/icon_check.svg';
import { computed, defineComponent, PropType } from 'vue';

type CheckItem = {
  value: string | boolean;
  label: string;
};

export default defineComponent({
  name: 'FormInputCheck',
  components: {
    iconCheck
  },
  props: {
    modelValue: [String, Boolean],
    item: {
      type: Object as PropType<CheckItem>,
      required: true
    },
    type: {
      type: String,
      default: 'radio'
    }
  },
  setup(prop, { emit }) {
    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const activeCls = computed(() => {
      return prop.type === 'radio'
        ? { 'c-check--radio': true }
        : { 'c-check--box': true };
    });

    return {
      valueSync,
      activeCls
    };
  }
});
</script>

<style scoped lang="scss">
.c-check {
  display: inline-block;
  vertical-align: top;
  user-select: none;
  &__item {
    position: relative;
    display: block;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1.5;
    text-align: justify;
    padding: 0 0 1px 34px;
    &::before,
    &::after,
    .c-check--box__arrow {
      content: '';
      position: absolute;
      transition: 0.4s $easeOutQuart;
      transition-property: background-color, border-color, opacity, transform,
        clip-path;
    }
    &::before {
      border: 1px solid var(--iconColor);
      width: 22px;
      height: 22px;
      top: 0;
      left: 0;
    }
  }
}

.c-check--radio {
  > input[type='radio']:checked + span {
    &::before {
      border-color: var(--subColor);
    }
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > span {
    &::before,
    &::after {
      border-radius: 50%;
    }
    &::after {
      background-color: var(--subColor);
      width: 12px;
      height: 12px;
      top: 5px;
      left: 5px;
      opacity: 0;
      transform: scale(0.6);
    }
  }
}

.c-check--box {
  > input[type='checkbox']:checked + span {
    &::before {
      border-color: var(--subColor);
      background-color: var(--subColor);
    }
    .c-check--box__arrow {
      clip-path: inset(0 0 0 0);
    }
  }
  > span {
    &::after {
      content: none !important;
    }
  }
  .c-check--box__arrow {
    position: absolute;
    color: var(--backColor);
    top: 7px;
    left: 4px;
    clip-path: inset(0 100% 0 0);
  }
}
</style>
