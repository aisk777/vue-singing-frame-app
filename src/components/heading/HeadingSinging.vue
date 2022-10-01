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
        <span class="c-en main__singing__drop__txt"
          ><txtDrop role="img" aria-label="DROP"
        /></span>
        <span class="main__singing__drop__icon">
          <iconDrop /><iconDrop /><iconDrop />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import txtDrop from '@/assets/img/common/txt_drop.svg';
import iconDrop from '@/assets/img/icon/arrow_drop.svg';
import { key } from '@/background/_ipcDatastore';
import { State as StoreState } from '@/store';
import { computed, defineComponent, inject } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HeadingSinging',
  components: {
    iconDrop,
    txtDrop
  },
  setup() {
    const $db = inject(key);
    if (!$db) throw new Error('NO DB');

    const store = useStore<StoreState>();

    // 変更を同期
    const now_singing = computed({
      get: () => store.state.now_singing,
      set: (value: string) => {
        $db.storeDispatch('now_singing', value);
        $db.updateData('Main', 'now_singing', { value: value });
      }
    });

    const onDrop = async () => {
      const value = now_singing.value.trim();
      if (value === '') return;

      try {
        // レコードを追加
        await $db.insertData('Record', {
          order: store.state.main_record.length,
          value: value,
          history_id: null
        });

        // DBから値を取得しストアを更新
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
    position: relative;
    color: var(--primaryColor);
    font-size: 12px;
    letter-spacing: 0.1em;
    padding-left: 12px;
    &::before {
      content: '';
      background-color: currentColor;
      position: absolute;
      top: 0;
      bottom: 2px;
      left: 0;
      margin: auto 0;
      width: 3px;
      height: 10px;
    }
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
      padding: 12px 16px;
    }
    &__txt {
      padding-bottom: 1px;
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
