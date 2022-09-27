<template>
  <draggable
    class="c-list"
    tag="ul"
    item-key="_id"
    animation="200"
    handle=".c-list__icon--handle"
    group="sort"
    chosenClass="is-chosen"
    v-model="recordsWatch"
  >
    <template #item="{ element, index }">
      <RecordListItem
        :key="element._id"
        :record="element"
        :index="index"
        :digits="`${records.length}`.length"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect, PropType } from 'vue';
import draggable from 'vuedraggable';
import { RecordItem } from '@/store';
import RecordListItem from '@/components/record/RecordListItem.vue';

export default defineComponent({
  name: 'RecordList',
  components: {
    draggable,
    RecordListItem
  },
  props: {
    records: {
      type: Array as PropType<RecordItem[]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const recordsWatch = ref<RecordItem[]>([]);

    // チラつき防止でwatchによる更新
    watchEffect(() => (recordsWatch.value = props.records));
    watch(recordsWatch, (newValue: RecordItem[]) => {
      if (newValue === props.records) return;
      const value = newValue.map((x: RecordItem, index: number) => {
        return { ...x, order: index };
      });
      emit('update-db', value);
    });

    return { recordsWatch };
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
