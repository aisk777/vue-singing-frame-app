<template>
  <Heading />
  <main class="main">
    <div class="main__head"></div>
    <RecordList :records="records" @update-db="onUpdate" />
    <div class="main__clear">
      <button type="button" class="main__clear__btn" @click="onClear">
        内容を破棄してリセット
      </button>
    </div>
    <BackImage class="main__bg" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, inject, provide } from 'vue';
import { useStore } from 'vuex';
import { State as StoreState, RecordItem } from '@/store';
import { key } from '@/@types/ipc-db';
import Heading from '@/components/Heading.vue';
import RecordList from '@/components/RecordList.vue';
import BackImage from '@/assets/img/common/set_list.svg';

type UpdateRecordName = { _id: string; value: string };

export default defineComponent({
  name: 'MainView',
  components: {
    Heading,
    RecordList,
    BackImage
  },
  setup() {
    const $db = inject(key);
    if (!$db) throw new Error('NO DB');

    const store = useStore<StoreState>();
    const records = computed(() => store.state.main_record);

    // レコードの削除
    const deleteRecordName = async (_id: string) => {
      const newRecords = records.value
        .filter((x: RecordItem) => x._id !== _id)
        .map((x: RecordItem, index: number) => {
          return { ...x, order: index };
        });
      $db.storeDispatch('main_record', newRecords);

      // DBを更新
      try {
        const promise = newRecords.map((record: RecordItem) => {
          return $db.updateData(
            'Record',
            { _id: record._id },
            { $set: { order: record.order } }
          );
        });
        await Promise.all([$db.removeData('Record', { _id: _id }), ...promise]);
      } catch (e) {
        console.error(e);
      }
    };
    provide('delete-record-name', deleteRecordName);

    // テキストの更新
    const updateRecordName = async ({ _id, value }: UpdateRecordName) => {
      // ストアを更新
      const newRecords = records.value.map((x: RecordItem) => {
        return x._id === _id ? { ...x, value } : { ...x };
      });
      $db.storeDispatch('main_record', newRecords);

      // DBを更新
      try {
        await $db.updateData('Record', { _id: _id }, { $set: { value } });
      } catch (e) {
        console.error(e);
      }
    };
    provide('update-record-name', updateRecordName);

    // 並び替えの更新
    const onUpdate = async (value: RecordItem[]) => {
      $db.storeDispatch('main_record', value);

      // DBを更新
      const promise = value.map((record: RecordItem) => {
        return $db.updateData(
          'Record',
          { _id: record._id },
          { $set: { order: record.order } }
        );
      });
      try {
        await Promise.all(promise);
      } catch (e) {
        console.error(e);
      }
    };

    const onClear = () => {
      console.log(1);
    };

    return {
      records,
      onUpdate,
      onClear
    };
  }
});
</script>

<style scoped lang="scss">
.main {
  position: relative;
  padding: 24px 32px;
  z-index: 0;
  &__clear {
    margin-top: 16px;
    text-align: right;
    &__btn {
      color: var(--primaryColor);
      border-bottom: 1px solid currentColor;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 0;
      letter-spacing: 0.05em;
    }
  }
  &__bg {
    color: var(--subColor);
    opacity: 0.1;
    position: fixed;
    bottom: 0;
    left: 276px;
    z-index: -1;
  }
}
</style>
