<template>
  <li
    class="c-list__item"
    tabindex="-1"
    @focus="isFocus = true"
    @blur="isFocus = false"
  >
    <div class="c-list__icon c-list__icon--handle"><iconHandle /></div>
    <p class="c-en c-list__index">{{ indexFormat }}</p>
    <RecordListItemName
      v-if="!isEdit"
      :text="record.value"
      :isFocus="isFocus"
    />
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
import iconDelete from '@/assets/img/icon/icon_delete.svg';
import iconHandle from '@/assets/img/icon/icon_handle.svg';
import iconPen from '@/assets/img/icon/icon_pen.svg';
import { key } from '@/background/_ipcDatastore';
import RecordListItemName from '@/components/record/RecordListItemName.vue';
import { RecordItem } from '@/store';
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  PropType,
  ref
} from 'vue';

type UpdateRecordName = (T: { _id: string; value: string }) => Promise<void>;
type DeleteRecordName = (T: string) => Promise<void>;

export default defineComponent({
  name: 'RecordListItem',
  components: {
    RecordListItemName,
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

    const editRef = ref<HTMLInputElement>();
    const isEdit = ref(false);
    const isFocus = ref(false);

    const tmpInputValue = ref('');
    const onUpdate = inject<UpdateRecordName>('update-record-name');
    const deleteRecordName = inject<DeleteRecordName>('delete-record-name');

    // 編集時のタイトルを一時的に保持
    const inputValue = computed({
      get: () => props.record.value,
      set: (value: string) => (tmpInputValue.value = value)
    });

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

    // 数値の変換
    const indexFormat = computed(() => {
      const digits = props.digits === 1 ? props.digits + 1 : props.digits;
      const numberFormat = new Intl.NumberFormat('ja', {
        minimumIntegerDigits: digits
      });
      return numberFormat.format(props.index + 1);
    });

    return {
      isFocus,
      editRef,
      inputValue,
      indexFormat,
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
    }
    &.is-chosen :deep(.c-list__name > span) {
      animation: none !important;
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
</style>
