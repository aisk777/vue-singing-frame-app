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
import { Options, Vue } from 'vue-class-component';
import { Sortable } from 'sortablejs-vue3';
import RecordListItem from '@/components/RecordListItem.vue';

@Options({
  components: { Sortable, RecordListItem },
  props: {
    records: Array
  }
})
export default class RecordList extends Vue {
  records?: any;

  // リストを更新
  onEnd(e: any) {
    const _records = [...this.records];
    const { oldIndex, newIndex } = e;
    const item = _records.splice(oldIndex, 1)[0];
    _records.splice(newIndex, 0, item);

    // orderを更新
    const newRecords = _records.map((x: any, index: number) => {
      return { ...x, order: index };
    });
    this.$emit('update-db', newRecords);
  }
}
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
