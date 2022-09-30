<template>
  <FormList>
    <li>
      <FormInputRadioBox v-model="valueSync" short value="number" label="数字">
        <div class="form__icon form__icon--pr">
          <styleNum role="img" />
        </div>
      </FormInputRadioBox>
    </li>
    <li>
      <FormInputRadioBox v-model="valueSync" short value="dot" label="点">
        <div class="form__icon">
          <styleDot role="img" />
        </div>
      </FormInputRadioBox>
    </li>
    <li>
      <FormInputRadioBox v-model="valueSync" short value="off">
        <p class="form__icon">
          <StyleOff role="img" aria-label="OFF" />
        </p>
      </FormInputRadioBox>
    </li>
  </FormList>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormInputRadioBox from '@/components/form/FormInputRadioBox.vue';
import FormList from '@/components/form/FormList.vue';
import StyleDot from '@/assets/img/customize/style_dot.svg';
import StyleNum from '@/assets/img/customize/style_num.svg';
import StyleOff from '@/assets/img/customize/style_off.svg';

export default defineComponent({
  name: 'FormListStyle',
  components: {
    FormInputRadioBox,
    FormList,
    StyleDot,
    StyleNum,
    StyleOff
  },
  props: {
    modelValue: String
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
.form__icon {
  margin: auto 0;
  &--pr {
    padding-right: 2px;
  }
}
</style>
