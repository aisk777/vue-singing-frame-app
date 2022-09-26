<template>
  <transition-group
    name="list"
    tag="ul"
    class="setlist"
    ref="listRef"
    @before-leave="beforeLeave"
  >
    <SetListItem
      :key="record._id"
      :record="record"
      :index="index"
      :digits="`${records.length}`.length"
      v-for="(record, index) in records"
    />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { RecordItem } from '@/store';
import SetListItem from './SetListItem.vue';

export default defineComponent({
  name: 'SetList',
  components: {
    SetListItem
  },
  props: {
    records: {
      type: Array as PropType<RecordItem[]>,
      required: true
    }
  },
  setup() {
    const listRef = ref();

    // リスト削除時の座標を指定
    const beforeLeave = (el: HTMLElement) => {
      if (!listRef.value) return;

      const $wrap = listRef.value.$el.getBoundingClientRect();
      const $item = el.getBoundingClientRect();

      el.style.top = `${$item.top - $wrap.top}px`;
      el.style.left = `${$item.left - $wrap.left}px`;
    };

    return {
      listRef,
      beforeLeave
    };
  }
});
</script>

<style scoped lang="scss">
.setlist {
  position: relative;
  display: grid;
  gap: 0.94em (32em / 20);
  font-size: 22px;
  letter-spacing: 0.05em;
  line-height: 1.5;
  &__item {
    transition: 0.6s $easeOutQuart;
    &.list-enter-from,
    &.list-leave-to {
      opacity: 0;
      transform: translateX(-1em);
    }
    &.list-leave-active {
      position: absolute;
    }
  }
}
</style>
