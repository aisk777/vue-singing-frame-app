<template>
  <li :data-index="indexFormat" class="set-list__item">
    {{ record.value }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { RecordItem } from '@/store';

export default defineComponent({
  name: 'SetListItem',
  props: {
    record: {
      type: Object as PropType<RecordItem>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    digits: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    // 数値の変換
    const indexFormat = computed(() => {
      const digits = props.digits === 1 ? props.digits + 1 : props.digits;
      const numberFormat = new Intl.NumberFormat('ja', {
        minimumIntegerDigits: digits
      });
      return `${numberFormat.format(props.index + 1)}.`;
    });

    return { indexFormat };
  }
});
</script>

<style scoped lang="scss">
.set-list__item {
  display: flex;
  gap: 0 (20em / 22);
  text-align: justify;
  &::before {
    content: attr(data-index);
    color: #31b6a0;
    font-size: (18em / 22);
    font-family: 'Roboto', sans-serif;
    min-width: 2em;
    padding-top: 0.3em;
    flex-shrink: 0;
  }
}
</style>
