<template>
  <FormList>
    <li>
      <FormInputRadioBox v-model="valueSync" value="default" label="デフォルト">
        <div class="form__grid"><span v-for="n in 4" :key="n"></span></div>
      </FormInputRadioBox>
    </li>
    <li>
      <FormInputRadioBox v-model="valueSync" value="transparent" label="透過">
        <div class="form__img"><ThemeTransparent /></div>
      </FormInputRadioBox>
    </li>
    <li>
      <FormInputRadioBox
        v-model="valueSync"
        :custom="custom"
        isFile
        label="カスタム"
        value="custom"
      >
        <transition mode="out-in" name="scale">
          <div class="form__img" v-if="custom.src === ''" key="on">
            <ThemeCustom />
          </div>
          <div class="form__grid" v-else key="off">
            <span
              v-for="n in custom.palette"
              :key="n"
              :style="{ backgroundColor: n }"
            ></span>
          </div>
        </transition>
      </FormInputRadioBox>
    </li>
  </FormList>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { CustomData } from '@/store';
import FormInputRadioBox from '@/components/form/FormInputRadioBox.vue';
import FormList from '@/components/form/FormList.vue';
import ThemeTransparent from '@/assets/img/customize/theme_transparent.svg?inline';
import ThemeCustom from '@/assets/img/customize/theme_custom.svg?inline';

export default defineComponent({
  name: 'FormListTheme',
  components: {
    FormInputRadioBox,
    FormList,
    ThemeTransparent,
    ThemeCustom
  },
  props: {
    modelValue: String,
    custom: {
      type: Object as PropType<CustomData>,
      required: true
    }
  },
  setup(prop, { emit }) {
    const valueSync = computed({
      get: () => prop.modelValue,
      set: (value) => emit('update:modelValue', value)
    });
    return { valueSync };
  }
});
</script>

<style scoped lang="scss">
.form__grid {
  border: 1px solid var(--textColor);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 34px;
  height: 34px;
  margin: auto 0;
  > span {
    outline: 1px solid var(--textColor);
    &:nth-child(1) {
      grid-row: 2 / 4;
      grid-column: 1 / 3;
      background-color: var(--backColor);
    }
    &:nth-child(2) {
      grid-row: 1;
      grid-column: 1 / 3;
      background-color: var(--textColor);
    }
    &:nth-child(3) {
      grid-row: 1 / 3;
      grid-column: 3;
      background-color: var(--subColor);
    }
    &:nth-child(4) {
      grid-row: 3;
      grid-column: 3;
      background-color: var(--primaryColor);
    }
  }
}
.form__img {
  margin: auto 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: 0.2s $easeOutQuart;
  transition-property: opacity, transform;
}
.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
