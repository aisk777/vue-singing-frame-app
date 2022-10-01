<template>
  <main class="customize">
    <HeadingTitle title="カスタマイズ" />
    <ul class="form">
      <FormRow title="フォント">
        <FormWrap>
          <FormItem gap="24px">
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
          </FormItem>
        </FormWrap>
        <FormWrap>
          <FormSubTitle sub="サイズ" />
          <FormItem gap="24px">
            <FormItem>
              <template #icon="o">
                <div :class="o.class"><iconMain /></div>
              </template>
              <FormInputNumber v-model.number="formData.font_size_main" />
            </FormItem>
            <FormItem>
              <template #icon="o">
                <div :class="o.class"><iconList /></div>
              </template>
              <FormInputNumber v-model.number="formData.font_size_sub" />
            </FormItem>
          </FormItem>
        </FormWrap>
      </FormRow>
      <FormRow title="リスト">
        <FormWrap>
          <FormSubTitle sub="スタイル" />
          <FormListStyle v-model="formData.list_style" />
        </FormWrap>
        <FormWrap>
          <FormSubTitle sub="1ページあたりの表示件数" />
          <FormItem>
            <FormInputNumber v-model.number="formData.list_per_page" />
            <template #txt="o">
              <span :class="o.class">件</span>
            </template>
          </FormItem>
          <FormNote :list="formNoteList" />
        </FormWrap>
      </FormRow>
      <FormRow title="テーマ">
        <FormWrap>
          <FormListTheme v-model="formData.theme" :custom="formData.custom" />
        </FormWrap>
        <FormWrap>
          <FormBox>
            <FormList gap="40px" class="form-list--input">
              <li v-for="item in formRadioListDefault" :key="item.value">
                <FormInputCheck :item="item" v-model="formData.theme_color" />
              </li>
            </FormList>
            <FormList class="form-list--color">
              <li v-for="(_, key) in formData.color" :key="key">
                <FormInputColor v-model="formData.color[key]" />
              </li>
            </FormList>
            <FormList gap="40px" class="form-list--input">
              <li v-for="item in formCheckListDefault" :key="item">
                <FormInputCheck
                  :item="item"
                  type="checkbox"
                  v-model="formData[item.value]"
                />
              </li>
            </FormList>
          </FormBox>
        </FormWrap>
      </FormRow>
    </ul>
  </main>
</template>

<script lang="ts">
import iconList from '@/assets/img/icon/icon_list.svg';
import iconMain from '@/assets/img/icon/icon_main.svg';
import FormBox from '@/components/form/FormBox.vue';
import FormInputCheck from '@/components/form/FormInputCheck.vue';
import FormInputColor from '@/components/form/FormInputColor.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormInputSelect from '@/components/form/FormInputSelect.vue';
import FormItem from '@/components/form/FormItem.vue';
import FormList from '@/components/form/FormList.vue';
import FormListStyle from '@/components/form/FormListStyle.vue';
import FormListTheme from '@/components/form/FormListTheme.vue';
import FormNote from '@/components/form/FormNote.vue';
import FormRow from '@/components/form/FormRow.vue';
import FormSubTitle from '@/components/form/FormSubTitle.vue';
import FormWrap from '@/components/form/FormWrap.vue';
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
    FormInputColor,
    FormInputCheck,
    FormBox,
    FormWrap,
    HeadingTitle,
    FormNote,
    FormListStyle,
    FormSubTitle,
    FormRow,
    FormInputSelect,
    FormInputNumber,
    FormListTheme,
    FormList,
    FormItem,
    iconMain,
    iconList
  },
  setup() {
    const store = useStore<StoreState>();
    const fontArray = ref<FontData[]>([]);
    const formData = store.state.customize;

    const formNoteList = [
      '※ フォントサイズを上げて収まらなくなった場合などに調整してください。',
      '※ 2カラムレイアウトは上記を元に自動で計算されます。'
    ];
    const formRadioListDefault = [
      { value: 'light', label: 'ライト' },
      { value: 'dark', label: 'ダーク' },
      { value: 'user', label: 'ユーザー' }
    ];
    const formCheckListDefault = [
      { value: 'check_round', label: '角を丸める' },
      { value: 'check_border', label: '枠線を表示' }
    ];
    const formCheckListOther = [
      { value: 'check_guide', label: 'ガイドを表示' },
      { value: 'check_title_hide', label: 'check_title_hide' }
    ];

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
      fontWeightArray,
      formNoteList,
      formRadioListDefault,
      formCheckListDefault,
      formCheckListOther
    };
  }
});
</script>

<style lang="scss" scoped>
.customize {
  padding: 48px 32px 64px;
}
.form-list--input {
  padding: 24px 0;
}
.form-list--color {
  padding: 12px 8px 16px;
  > * {
    flex: 1;
  }
}
</style>
