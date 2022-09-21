<template>
  <li class="c-list__item" tabindex="-1">
    <div class="c-list__icon c-list__icon--handle"><iconHandle /></div>
    <p class="c-en c-list__index">{{ indexFormat }}</p>
    <p class="c-list__name" ref="nameRef" v-if="!isEdit">
      <span ref="nameInnerRef" :style="styleObject">{{ record.value }}</span>
    </p>
    <div class="c-list__edit" v-else>
      <input
        type="text"
        class="c-list__edit__input"
        v-model="inputValue"
        @keydown.enter.prevent="onConfirm"
        @blur="onBlur"
        ref="editRef"
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
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  nextTick,
  inject,
  PropType
} from 'vue';
import { RecordItem } from '@/store';
import { key } from '@/@types/ipc-db';
import iconHandle from '@/assets/img/icon/icon_handle.svg';
import iconPen from '@/assets/img/icon/icon_pen.svg';
import iconDelete from '@/assets/img/icon/icon_delete.svg';

type UpdateRecordName = (T: { _id: string; value: string }) => Promise<void>;
type DeleteRecordName = (T: string) => Promise<void>;

export default defineComponent({
  name: 'RecordListItem',
  components: {
    iconHandle,
    iconPen,
    iconDelete
  },
  props: {
    record: {
      type: Object as PropType<RecordItem>,
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
  },
  setup(props) {
    const $db = inject(key);
    if (!$db) throw new Error('NO DB');

    const nameRef = ref<HTMLElement>();
    const nameInnerRef = ref<HTMLElement>();
    const editRef = ref<HTMLInputElement>();

    const x = ref(0);
    const duration = ref(0);
    const isEdit = ref(false);
    const tmpInputValue = ref('');
    const onUpdate = inject<UpdateRecordName>('update-record-name');
    const deleteRecordName = inject<DeleteRecordName>('delete-record-name');

    // 編集時のタイトルを一時的に保持
    const inputValue = computed({
      get: () => props.record.value,
      set: (value: string) => (tmpInputValue.value = value)
    });

    // CSS変数を更新
    const setVariable = () => {
      if (!nameRef.value || !nameInnerRef.value) return;

      const width = nameRef.value.clientWidth;
      const innerW = nameInnerRef.value.clientWidth;
      x.value = -Math.max(0, innerW - width);
      duration.value = -x.value / 30;
    };

    // 編集開始
    const onEdit = async () => {
      isEdit.value = true;

      await nextTick();
      if (editRef.value) editRef.value.select();
    };

    // 編集の選択解除で更新処理
    const onBlur = async () => {
      if (tmpInputValue.value !== '' && onUpdate) {
        await onUpdate({ _id: props.record._id, value: tmpInputValue.value });
        tmpInputValue.value = '';
      }
      isEdit.value = false;
    };

    // 編集の確定
    const onConfirm = (e: KeyboardEvent) => {
      if (!e.isComposing && editRef.value) editRef.value.blur();
    };

    // リストの削除
    const onDelete = () => {
      if (deleteRecordName) deleteRecordName(props.record._id);
    };

    const styleObject = computed(() => {
      return {
        '--x': `${x.value}px`,
        '--duration': `${duration.value}s`
      };
    });

    // 数値の変換
    const indexFormat = computed(() => {
      const digits = props.digits === 1 ? props.digits + 1 : props.digits;
      const numberFormat = new Intl.NumberFormat('ja', {
        minimumIntegerDigits: digits
      });
      return numberFormat.format(props.index + 1);
    });

    onMounted(() => setVariable());

    return {
      nameRef,
      nameInnerRef,
      editRef,
      inputValue,
      indexFormat,
      x,
      duration,
      styleObject,
      isEdit,
      onEdit,
      onBlur,
      onConfirm,
      onDelete
    };
  }
});
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
        animation: txtScroll var(--duration) linear 0.3s both running infinite;
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
    padding-top: 4px;
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
  80%,
  100% {
    transform: translate3d(var(--x), 0, 0);
  }
}
</style>
