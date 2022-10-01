<template>
  <div class="c-heading">
    <div class="c-heading__layout">
      <p class="c-heading__layout__txt">下段レイアウト:</p>
      <ul class="c-heading__layout__list">
        <li class="c-heading__layout__item">
          <label>
            <input type="radio" class="c-heading__layout__radio" checked />
            <span class="c-heading__layout__btn" title="1段"
              ><iconLineSingle
            /></span>
          </label>
        </li>
        <li class="c-heading__layout__item">
          <label>
            <input type="radio" class="c-heading__layout__radio" />
            <span class="c-heading__layout__btn" title="2段"
              ><iconLineDouble
            /></span>
          </label>
        </li>
      </ul>
    </div>
    <button type="button" class="c-heading__preview" @click="onPreview">
      <iconStart />
    </button>
  </div>
</template>

<script lang="ts">
import iconLineDouble from '@/assets/img/icon/icon_line-double.svg';
import iconLineSingle from '@/assets/img/icon/icon_line-single.svg';
import iconStart from '@/assets/img/icon/icon_start.svg';
import { key } from '@/background/_ipcBrowser';
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  name: 'HeadingNav',
  components: {
    iconLineSingle,
    iconLineDouble,
    iconStart
  },
  setup() {
    const $browser = inject(key);
    if (!$browser) throw new Error('NO BROWSER');

    const isPreview = ref(false);

    const onPreview = () => {
      isPreview.value = !isPreview.value;
      $browser.onPreview(isPreview.value);
    };

    return {
      onPreview
    };
  }
});
</script>

<style scoped lang="scss">
.c-heading {
  display: flex;
  align-items: center;
  gap: 0 32px;
  width: max-content;
  margin-left: auto;
  &__layout {
    background-color: var(--baseColorThin);
    border: 1px solid var(--borderColor);
    border-radius: 4px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 0 8px;
    &__txt {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding-bottom: 2px;
    }
    &__list {
      display: flex;
      align-items: center;
      gap: 0 8px;
    }
    &__radio:checked + .c-heading__layout__btn {
      background-color: var(--subColor);
      border-color: var(--subColor);
      color: var(--backColor);
    }
    &__btn {
      background-color: var(--backColor);
      border: 1px solid var(--borderColor);
      border-radius: 4px;
      color: var(--subColor);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      transition: 0.1s $easeInOutCubic;
      transition-property: background-color, border-color, color;
    }
  }
  &__preview {
    background-color: var(--primaryColor);
    border-radius: 50%;
    color: var(--backColor);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    padding-left: 2px;
  }
}
</style>
