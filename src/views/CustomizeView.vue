<template>
  <main class="customize">
    <HeadingTitle title="カスタマイズ" />
    <ul class="form">
      <FormBlock title="フォント">
        <div class="form__block">
          <div class="form__col">
            <div>
              <FormSubTitle sub="ファミリー" />
              <FormInputSelect
                v-model:value="formData.font_style.family"
                :options="fontFamilyArray"
              />
            </div>
            <div>
              <FormSubTitle sub="ウェイト" />
              <FormInputSelect
                v-model:value="formData.font_style.style"
                :options="fontWeightArray"
                width="160px"
              />
            </div>
          </div>
        </div>
        <div class="form__block">
          <FormSubTitle sub="サイズ" />
          <div class="form__col">
            <div class="form__item">
              <div class="form__icon"><iconMain /></div>
              <FormInputNumber v-model:value.number="formData.font_size_main" />
            </div>
            <div class="form__item">
              <div class="form__icon"><iconList /></div>
              <FormInputNumber v-model:value.number="formData.font_size_sub" />
            </div>
          </div>
        </div>
      </FormBlock>
      <FormBlock title="リスト">
        <div class="form__block">
          <FormSubTitle sub="スタイル" />
          <ul class="form__list">
            <li><FormInputRadioBox /></li>
            <li><FormInputRadioBox /></li>
            <li><FormInputRadioBox /></li>
          </ul>
        </div>
        <div class="form__block">
          <FormSubTitle sub="1ページあたりの表示件数" />
          <div class="form__item">
            <FormInputNumber v-model:value.number="formData.font_size_sub" />
            <span class="form__item__txt">件</span>
          </div>
          <ul class="form__note">
            <li>
              ※フォントサイズを上げて収まらなくなった場合などに調整してください。
            </li>
            <li>※2カラムレイアウトは上記を元に自動で計算されます。</li>
          </ul>
        </div>
      </FormBlock>
      <FormBlock title="テーマ"> aaa </FormBlock>
    </ul>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import HeadingTitle from '@/components/heading/HeadingTitle.vue';
import FormBlock from '@/components/form/FormBlock.vue';
import FormSubTitle from '@/components/form/FormSubTitle.vue';
import FormInputSelect from '@/components/form/FormInputSelect.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormInputRadioBox from '@/components/form/FormInputRadioBox.vue';
import { useStore } from 'vuex';
import { State as StoreState } from '@/store';
import iconMain from '@/assets/img/icon/icon_main.svg';
import iconList from '@/assets/img/icon/icon_list.svg';

export default defineComponent({
  name: 'CustomizeView',
  components: {
    HeadingTitle,
    FormSubTitle,
    FormBlock,
    FormInputSelect,
    FormInputNumber,
    FormInputRadioBox,
    iconMain,
    iconList
  },
  setup() {
    const store = useStore<StoreState>();
    const fontArray = ref([]);
    const formData = store.state.customize;

    const fontFamilyArray = computed(() => {
      return Array.from(
        new Set(fontArray.value.map((x: any) => x.family).sort())
      );
    });

    const fontWeightArray = computed(() => {
      return fontArray.value
        .filter((x: any) => x.family === formData.font_style.family)
        .map((y: any) => y.style);
    });

    // ローカルフォントの読み込み
    (async () => {
      try {
        fontArray.value = await window.queryLocalFonts();
        console.log(fontArray.value);
      } catch (e: any) {
        console.error(e);
      }
    })();

    watch(
      () => formData.font_style.family,
      () => {
        formData.font_style.style = fontWeightArray.value[0] || '';
      }
    );

    return {
      formData,
      fontArray,
      fontFamilyArray,
      fontWeightArray
    };
  }
});
</script>

<style scoped lang="scss">
.customize {
  padding: 48px 32px;
}
.form {
  &__block {
    & + & {
      margin-top: 24px;
    }
  }
  &__col {
    display: flex;
    gap: 24px;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    &__txt {
      font-size: 16px;
      font-weight: 700;
      margin-left: -4px;
      padding-bottom: 2px;
    }
  }
  &__icon {
    color: var(--subColor);
  }
  &__list {
    display: flex;
    gap: 16px;
  }
  &__note {
    color: var(--primaryColor);
    font-size: 12px;
    letter-spacing: 0.05em;
    line-height: 1.5;
    text-align: justify;
    > li + li {
      margin-top: 4px;
    }
  }
}
</style>
