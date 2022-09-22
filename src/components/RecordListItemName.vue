<template>
  <p class="c-list__name" ref="nameRef" :class="{ 'is-focus': isFocus }">
    <span ref="nameInnerRef" :class="clsReset">{{ text }}</span>
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useScrollName from '@/composables/useScrollName';

export default defineComponent({
  name: 'RecordListItemName',
  props: {
    text: {
      type: String,
      required: true
    },
    isFocus: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const nameRef = ref<HTMLElement>();
    const nameInnerRef = ref<HTMLElement>();

    const { variableX, variableDuration, clsReset } = useScrollName(
      nameRef,
      nameInnerRef
    );

    return {
      nameRef,
      nameInnerRef,
      variableX,
      variableDuration,
      clsReset
    };
  }
});
</script>

<style scoped lang="scss">
.c-list__name {
  font-size: 14px;
  letter-spacing: 0.05em;
  line-height: 26px;
  margin-right: 16px;
  overflow: hidden;
  &.is-focus > span {
    animation: posX v-bind(variableDuration) 0.2s linear forwards;
    &.is-reset {
      animation: none !important;
    }
  }
  > span {
    display: block;
    width: max-content;
    backface-visibility: hidden;
  }
}
@keyframes posX {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(v-bind(variableX));
  }
}
</style>
