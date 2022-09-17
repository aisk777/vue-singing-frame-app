<template>
  <draggable
    class="c-list"
    tag="ul"
    handle=".c-list__icon--handle"
    v-bind="dragOptions"
    v-model="list"
    item-key="order"
  >
    <template #item="{ element, index }">
      <RecordListItem :item="element" :index="index" />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import draggable from 'vuedraggable';
import RecordListItem from '@/components/RecordListItem.vue';

@Options({
  components: { draggable, RecordListItem }
})
export default class RecordList extends Vue {
  isDrag = false;
  list = [
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 1
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 3
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 4
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 5
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 2
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 6
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 7
    },
    {
      name: 'ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。ここにタイトルが入ります。',
      order: 8
    }
  ];

  get dragOptions() {
    return {
      animation: 200,
      group: 'sort'
    };
  }
}
</script>

<style scoped lang="scss">
.c-list {
  background-color: var(--backColor);
  border: 1px solid var(--borderColor);
  border-radius: 4px;
  overflow: hidden;
  min-height: 50px;
}
</style>
