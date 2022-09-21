<template>
  <div class="main__singing">
    <label for="now_singing" class="c-en main__singing__label"
      >NOW SINGING</label
    >
    <div class="main__singing__container">
      <input
        id="now_singing"
        type="text"
        class="main__singing__input"
        placeholder="タイトルを入力してください"
        v-model="now_singing"
        @keydown.enter.shift.exact.prevent="onDrop"
      />
    </div>
    <div class="main__singing__drop">
      <button type="button" class="main__singing__drop__btn" @click="onDrop">
        <span class="c-en main__singing__drop__txt">DROP</span>
        <span class="main__singing__drop__icon">
          <iconDrop /><iconDrop /><iconDrop />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { State as StoreState } from '@/store';
import { key } from '@/@types/ipc-db';
import iconDrop from '@/assets/img/icon/arrow_drop.svg';

export default defineComponent({
  name: 'HeadingSinging',
  components: {
    iconDrop
  },
  setup() {
    const store = useStore<StoreState>();
    const $db = inject(key);

    if (!$db) throw new Error('NO DB');

    // 変更を同期
    const now_singing = computed({
      get: () => store.state.now_singing,
      set: (value: string) => {
        $db.storeDispatch('now_singing', value);
        $db.updateData('Main', 'now_singing', { value: value });
      }
    });

    const onDrop = async () => {
      if (now_singing.value === '') return;

      try {
        // レコードを追加
        await $db.insertData('Record', {
          order: store.state.main_record.length,
          value: now_singing.value,
          history_id: null
        });

        // DBから取得しストアを更新
        const records = await $db.getData(
          'Record',
          { history_id: null },
          { order: 1 }
        );
        console.log(records);
        $db.storeDispatch('main_record', records);

        // 入力を空に変更
        now_singing.value = '';
      } catch (e) {
        console.error(e);
      }
    };

    return {
      now_singing,
      onDrop
    };
  }
});
</script>

<style scoped lang="scss">
.main__singing {
  &__label {
    color: var(--primaryColor);
    border-left: 3px solid currentColor;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding-left: 8px;
  }
  &__container {
    border-bottom: 2px solid var(--textColor);
  }
  &__input {
    font-size: 28px;
    font-weight: 700;
    width: 100%;
    height: 78px;
    letter-spacing: 0.1em;
  }
  &__drop {
    text-align: right;
    &__btn {
      background-color: var(--primaryColor);
      border-radius: 0 0 4px 4px;
      color: var(--backColor);
      display: inline-flex;
      gap: 0 16px;
      align-items: center;
      padding: 10px 16px 9px;
    }
    &__txt {
      font-size: 20px;
      letter-spacing: 0.1em;
    }
    &__icon {
      display: flex;
      flex-direction: column;
      > svg {
        margin-top: -8px;
      }
    }
  }
}
</style>
