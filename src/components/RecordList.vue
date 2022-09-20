<template>
  <Sortable
    class="c-list"
    tag="ul"
    item-key="_id"
    :list="records"
    :options="{
      animation: 200,
      handle: '.c-list__icon--handle',
      group: 'sort',
      chosenClass: 'is-chosen'
    }"
    @end="onEnd"
  >
    <template #item="{ element, index }">
      <RecordListItem
        :key="element._id"
        :item="element"
        :index="index"
        :digits="`${records.length}`.length"
      />
    </template>
  </Sortable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Sortable } from 'sortablejs-vue3';
import { RecordItem } from '@/store';
import RecordListItem from '@/components/RecordListItem.vue';

export default defineComponent({
  name: 'RecordList',
  components: {
    Sortable,
    RecordListItem
  },
  props: {
    records: {
      type: Array as PropType<RecordItem[]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const onEnd = (e: any) => {
      const { oldIndex, newIndex } = e;
      if (oldIndex === newIndex) return;

      // 要素の並び替え処理
      const newRecords = props.records
        .reduce((acc: RecordItem[], cur: RecordItem) => {
          switch (true) {
            case oldIndex === cur.order:
              acc[newIndex] = cur;
              break;
            case oldIndex < cur.order && cur.order <= newIndex:
              acc[cur.order - 1] = cur;
              break;
            case newIndex <= cur.order && cur.order < oldIndex:
              acc[cur.order + 1] = cur;
              break;
            default:
              acc[cur.order] = cur;
              break;
          }
          return acc;
        }, [])
        .map((x: any, index: number) => {
          return { ...x, order: index };
        });

      // orderを更新
      emit('update-db', newRecords);
    };

    return {
      onEnd
    };
  }
});
</script>

<style scoped lang="scss">
.c-list {
  background-color: var(--backColor);
  border: 1px solid var(--borderColor);
  border-radius: 6px;
  overflow: hidden;
  min-height: 50px;
}
.list-enter-active,
.list-leave-active {
  transition: 0.2s $easeInOutCubic;
  transition-property: opacity, transform;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
