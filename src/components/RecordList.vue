<template>
  <draggable
    class="c-list"
    tag="transition-group"
    :component-data="{ tag: 'ul', name: 'list' }"
    handle=".c-list__icon--handle"
    v-bind="dragOptions"
    v-model="recordsDraggable"
    item-key="order"
  >
    <template #item="{ element, index }">
      <RecordListItem
        :item="element"
        :index="index"
        :digits="`${recordsDraggable.length}`.length"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import draggable from 'vuedraggable';
import RecordListItem from '@/components/RecordListItem.vue';

@Options({
  components: { draggable, RecordListItem },
  props: {
    records: Array
  }
})
export default class RecordList extends Vue {
  records?: any;
  isDrag = false;

  get recordsDraggable() {
    return this.records;
  }

  set recordsDraggable(value: any) {
    // orderの値を更新
    const newArray = value.map((x: any, index: number) => {
      return { ...x, order: index };
    });
    this.$emit('update-db', newArray);
  }

  get dragOptions() {
    return {
      animation: 200,
      group: 'sort',
      chosenClass: 'is-chosen'
    };
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
