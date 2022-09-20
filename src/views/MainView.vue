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
import { defineComponent, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { State as StoreState } from '@/store';
import { key } from '@/@types/ipc-db';
import Heading from '@/components/Heading.vue';
import RecordList from '@/components/RecordList.vue';
import BackImage from '@/assets/img/common/set_list.svg';

export default defineComponent({
  name: 'MainView',
  components: {
    Heading,
    RecordList,
    BackImage
  },
  setup() {
    const store = useStore<StoreState>();
    const $db = inject(key);

    if (!$db) throw new Error('NO DB');

    const records = computed(() => store.state.main_record);

    // 並び替えの更新
    const onUpdate = async (value: StoreState['main_record']) => {
      $db.storeDispatch('main_record', value);

      const promise = value.map((record: any) => {
        return $db.updateData(
          'Record',
          { _id: record._id },
          { $set: { order: record.order } }
        );
      });
      await Promise.all(promise);
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
