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
import { Options, Vue } from 'vue-class-component';

import iconDrop from '@/assets/img/icon/arrow_drop.svg';

@Options({
  components: {
    iconDrop
  }
})
export default class HeadingSinging extends Vue {
  $db!: any;

  get now_singing() {
    return this.$store.state.now_singing;
  }

  // 変更を同期
  set now_singing(value: string) {
    this.$db.storeDispatch('now_singing', { value: value });
    this.$db.mainUpdateData('now_singing', { value: value });
  }

  async onDrop() {
    if (this.now_singing === '') return;

    // レコードを追加
    this.$db.recordInsertData({
      order: this.$store.state.main_record.length,
      value: this.now_singing,
      isHistory: false,
      history_id: null
    });

    // DBから取得しストアを更新
    try {
      const data = await this.$db.recordGetData(
        { isHistory: false },
        { order: 1 }
      );
      this.$db.storeDispatch('main_record', data);
      this.now_singing = '';
    } catch (e) {
      console.error(e);
    }
  }
}
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
      font-weight: 700;
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
