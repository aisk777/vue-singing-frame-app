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
                v-model="formData.font_style.family"
                :options="fontFamilyArray"
              />
            </div>
            <div>
              <FormSubTitle sub="ウェイト" />
              <FormInputSelect
                v-model="formData.font_style.style"
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
              <FormInputNumber v-model.number="formData.font_size_main" />
            </div>
            <div class="form__item">
              <div class="form__icon"><iconList /></div>
              <FormInputNumber v-model.number="formData.font_size_sub" />
            </div>
          </div>
        </div>
      </FormBlock>
      <FormBlock title="リスト">
        <div class="form__block">
          <FormSubTitle sub="スタイル" />
          <FormListStyle v-model="formData.list_style" />
        </div>
        <div class="form__block">
          <FormSubTitle sub="1ページあたりの表示件数" />
          <div class="form__item">
            <FormInputNumber v-model.number="formData.list_per_page" />
            <span class="form__item__txt">件</span>
          </div>
          <FormNote
            :list="[
              '※ フォントサイズを上げて収まらなくなった場合などに調整してください。',
              '※ 2カラムレイアウトは上記を元に自動で計算されます。'
            ]"
          />
        </div>
      </FormBlock>
      <FormBlock title="テーマ">
        <div class="form__block">
          <FormListTheme v-model="formData.theme" :custom="formData.custom" />
        </div>
        <div class="form__block">
          <FormBox />
        </div>
      </FormBlock>
    </ul>
  </main>
</template>

<script lang="ts">
import iconList from '@/assets/img/icon/icon_list.svg';
import iconMain from '@/assets/img/icon/icon_main.svg';
import FormBlock from '@/components/form/FormBlock.vue';
import FormBox from '@/components/form/FormBox.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormInputSelect from '@/components/form/FormInputSelect.vue';
import FormListStyle from '@/components/form/FormListStyle.vue';
import FormListTheme from '@/components/form/FormListTheme.vue';
import FormNote from '@/components/form/FormNote.vue';
import FormSubTitle from '@/components/form/FormSubTitle.vue';
import HeadingTitle from '@/components/heading/HeadingTitle.vue';
import { CustomData, State as StoreState } from '@/store';
import { computed, defineComponent, provide, ref, watch } from 'vue';
import { useStore } from 'vuex';

interface FontData {
  family: string;
  postscriptName: string;
  style: string;
  size: number;
}

export default defineComponent({
  name: 'CustomizeView',
  components: {
    FormBox,
    HeadingTitle,
    FormNote,
    FormListStyle,
    FormSubTitle,
    FormBlock,
    FormInputSelect,
    FormInputNumber,
    FormListTheme,
    iconMain,
    iconList
  },
  setup() {
    const store = useStore<StoreState>();
    const fontArray = ref<FontData[]>([]);
    const formData = store.state.customize;

    const fontFamilyArray = computed(() => {
      return Array.from(
        new Set(fontArray.value.map((x: any) => x.family).sort())
      );
    });

    const fontWeightArray = computed<string[]>(() => {
      return fontArray.value
        .filter((x: FontData) => x.family === formData.font_style.family)
        .sort((a: FontData, b: FontData) => {
          if (a.size > b.size) return 1;
          if (a.size < b.size) return -1;
          return 0;
        })
        .map((y: FontData) => y.style);
    });

    // ローカルフォントの読み込み
    (async () => {
      // 読み取り関数
      const fileReader = (blob: Blob) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return new Promise((resolve) => {
          reader.addEventListener('loadend', () => {
            resolve(reader.result);
          });
        });
      };

      try {
        const fontData = await window.queryLocalFonts();
        fontArray.value = await Promise.all(
          // blobからサイズを取得
          fontData.map(async (data: any) => {
            const blob = await data.blob();
            const result: any = await fileReader(blob);
            return {
              family: data.family,
              postscriptName: data.postscriptName,
              style: data.style,
              size: result.byteLength
            };
          })
        );
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

    // カスタムデータの更新
    const updateCustomData = (data: CustomData) => (formData.custom = data);
    provide('update-custom-data', updateCustomData);

    return {
      formData,
      fontArray,
      fontFamilyArray,
      fontWeightArray
    };
  }
});
</script>

<style lang="scss" scoped>
.customize {
  padding: 48px 32px 64px;
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
    align-items: center;
    display: flex;
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
}
</style>
