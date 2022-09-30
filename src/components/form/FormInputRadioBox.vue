<template>
  <div
    :class="{ 'c-radio-box--short': short }"
    class="c-radio-box"
    tabindex="0"
    @click="onClick"
  >
    <input
      type="file"
      v-if="isFile"
      ref="fileRef"
      @input="onFile"
      accept=".jpg, .jpeg, .png, .svg"
    />
    <input
      v-model="valueSync"
      :value="value"
      class="c-radio-box__input"
      type="radio"
    />
    <div class="c-radio-box__main">
      <div class="c-radio-box__main__inner">
        <slot />
        <p class="c-radio-box__main__txt" v-if="label">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from 'vue';
import useFileReader from '@/composables/useFileReader';
import { CustomData } from '@/store';

type UpdateCustomData = (T: CustomData) => void;

export default defineComponent({
  name: 'FormInputRadioBox',
  props: {
    modelValue: String,
    value: {
      type: String,
      required: true
    },
    custom: {
      type: Object as PropType<CustomData>
    },
    short: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    isFile: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, { emit }) {
    const fileRef = ref<HTMLInputElement>();
    const updateCustomData = inject<UpdateCustomData>('update-custom-data');

    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    // ボタンのクリック処理
    const onClick = () => {
      // ファイルを開く
      if (prop.isFile && fileRef.value) {
        switch (true) {
          // srcが存在しない場合、または2回クリックした場合
          case !prop.custom?.src:
          case !!prop.custom?.src && valueSync.value === prop.value:
            fileRef.value.click();
            break;
          default:
            valueSync.value = prop.value;
            break;
        }
      } else {
        valueSync.value = prop.value;
      }
    };

    // ファイルの選択処理
    const onCallback = (result: boolean) => {
      if (result) {
        valueSync.value = prop.value;
        // カスタムデータを更新
        if (!updateCustomData || !selectedFile.value) return;
        updateCustomData({
          file: selectedFile.value,
          src: base64Data.value,
          palette: colorPalette.value
        });
      }
    };
    const { onFile, selectedFile, base64Data, colorPalette } =
      useFileReader(onCallback);

    return {
      valueSync,
      fileRef,
      onClick,
      onFile,
      selectedFile,
      base64Data,
      colorPalette
    };
  }
});
</script>

<style scoped lang="scss">
.c-radio-box {
  display: inline-block;
  cursor: pointer;
  &--short {
    .c-radio-box__main {
      min-width: 60px;
      height: 70px;
    }
  }
  &__input {
    &:checked + .c-radio-box__main {
      color: var(--subColor);
      border-color: transparent;
      outline-color: var(--subColor);
      outline-offset: -1px;
    }
  }
  &__main {
    display: block;
    background-color: var(--backColor);
    border: 1px dashed var(--iconColor);
    border-radius: 4px;
    outline: 1px solid transparent;
    outline-offset: -4px;
    min-width: 80px;
    height: 90px;
    padding: 8px 0;
    transition: 0.4s $easeOutQuart;
    transition-property: color, border, outline, outline-offset;
    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    &__txt {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-top: auto;
    }
  }
}
</style>
