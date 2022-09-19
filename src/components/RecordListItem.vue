<template>
  <li class="c-list__item" tabindex="-1">
    <div class="c-list__icon c-list__icon--handle"><iconHandle /></div>
    <p class="c-en c-list__index">{{ indexFormat }}</p>
    <p class="c-list__name" ref="name" v-if="!isEdit">
      <span ref="nameInner" :style="{ '--x': `${this.x}px` }">{{
        item.value
      }}</span>
    </p>
    <div class="c-list__edit" v-else>
      <input
        type="text"
        class="c-list__edit__input"
        v-model="inputValue"
        @keydown.enter.prevent="onConfirm"
        @blur="onBlur"
        ref="edit"
      />
    </div>
    <button
      type="button"
      class="c-list__icon c-list__icon--pen"
      @click="onEdit"
      :disabled="isEdit"
    >
      <iconPen />
    </button>
    <button
      type="button"
      class="c-list__icon c-list__icon--delete"
      @click="onDelete"
    >
      <iconDelete />
    </button>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import iconHandle from '@/assets/img/icon/icon_handle.svg';
import iconPen from '@/assets/img/icon/icon_pen.svg';
import iconDelete from '@/assets/img/icon/icon_delete.svg';

@Options({
  components: {
    iconHandle,
    iconPen,
    iconDelete
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    digits: {
      type: Number,
      required: true
    }
  }
})
export default class RecordListItem extends Vue {
  digits!: number;
  index!: number;
  item!: any;
  $db!: any;
  x = 0;
  isEdit = false;
  tmpInputValue = '';

  get inputValue() {
    return this.item.value;
  }

  set inputValue(value) {
    this.tmpInputValue = value;
  }

  mounted() {
    this.setVariable();
  }

  // CSS変数を更新
  setVariable() {
    const width = (this.$refs.name as HTMLElement).clientWidth;
    const innerW = (this.$refs.nameInner as HTMLElement).clientWidth;
    this.x = -Math.max(0, innerW - width);
  }

  // 編集開始
  onEdit() {
    this.isEdit = true;
    this.$nextTick(() => (this.$refs.edit as HTMLInputElement).select());
  }

  // 編集の選択解除
  onBlur() {
    this.isEdit = false;
    this.onUpdate();
  }

  // 編集の確定
  onConfirm(e: any) {
    if (e.isComposing) return;
    this.isEdit = false;
  }

  // テキストの更新
  async onUpdate() {
    if (this.tmpInputValue === '') return;
    await this.$db.recordUpdateData(
      { _id: this.item._id },
      { ...this.item, value: this.tmpInputValue }
    );
    this.tmpInputValue = '';
  }

  // リストの削除
  onDelete() {
    console.log(1);
  }

  // 数値の変換
  get indexFormat() {
    const digits = this.digits === 1 ? this.digits + 1 : this.digits;
    const numberFormat = new Intl.NumberFormat('ja', {
      minimumIntegerDigits: digits
    });
    return numberFormat.format(this.index + 1);
  }
}
</script>

<style scoped lang="scss">
.c-list {
  &__item {
    background-color: var(--backColor);
    cursor: pointer;
    display: grid;
    align-items: center;
    grid-template-columns: 26px 56px 1fr 26px auto;
    padding: 12px 16px;
    transition: background-color 0.2s $easeInOutCubic;
    &:not(.is-chosen):focus {
      background-color: #fffff0;
      .c-list__name > span {
        animation: txtScroll 10s linear 0.3s both running infinite;
      }
    }
    & + & {
      position: relative;
      z-index: 0;
      &::before {
        content: '';
        background-color: var(--borderColor);
        position: absolute;
        top: 0;
        left: 16px;
        right: 16px;
        height: 1px;
        pointer-events: none;
        z-index: -1;
      }
    }
  }
  &__index {
    color: var(--subColor);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
  }
  &__name {
    font-size: 14px;
    letter-spacing: 0.05em;
    line-height: 26px;
    margin-right: 16px;
    overflow: hidden;
    > span {
      display: block;
      width: max-content;
      backface-visibility: hidden;
    }
  }
  &__edit {
    margin: 0 8px 0 -8px;
    &__input {
      background-color: var(--baseColor);
      border-radius: 4px;
      font-size: 14px;
      width: 100%;
      height: 26px;
      padding: 0 8px;
      letter-spacing: 0.05em;
    }
  }
  &__icon {
    color: var(--iconColor);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    flex-shrink: 0;
    &--handle {
      cursor: grab;
    }
    &--pen,
    &--delete {
      transition: background-color 0.2s $easeInOutCubic;
      &:hover {
        background-color: rgba(#000, 0.06);
      }
    }
    &--pen {
      &:disabled {
        background-color: rgba(#000, 0.06);
        pointer-events: none;
      }
    }
    &--delete {
      margin-left: 8px;
    }
  }
}

@keyframes txtScroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  90%,
  100% {
    transform: translate3d(var(--x), 0, 0);
  }
}
</style>
