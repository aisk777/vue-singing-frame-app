<template>
  <main class="default">
    <div class="default__heading">
      <h2 class="c-en default__ttl">NOW SINGING</h2>
      <h1 class="default__now">
        <span>{{ now }}</span>
      </h1>
    </div>
    <div class="default__set">
      <h2 class="c-en default__ttl">SET LIST</h2>
      <Setlist :records="records" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RecordItem } from '@/store';
import Setlist from './Setlist.vue';

export default defineComponent({
  name: 'Default',
  components: {
    Setlist
  },
  props: {
    now: {
      type: String,
      required: true
    },
    records: {
      type: Array as PropType<RecordItem[]>,
      required: true
    }
  },
  setup() {
    console.log(1);
  }
});
</script>

<style scoped lang="scss">
.default {
  background-color: #fff;
  border: 4px solid #31b6a0;
  border-radius: 16px;
  height: 100%;
  &__ttl {
    position: relative;
    color: #ef8bb6;
    font-size: 16px;
    padding-left: 16px;
    letter-spacing: 0.1em;
    margin-bottom: 28px;
    &::before {
      content: '';
      background-color: currentColor;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      height: 12px;
      margin: auto 0;
    }
  }
  &__now {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 0.1em;
    height: 1.2em;
    overflow: hidden;
    > span {
      display: block;
      width: max-content;
    }
  }
  &__heading {
    position: relative;
    padding: 36px 28px 28px;
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 28px;
      right: 28px;
      height: 2px;
      border-bottom: 2px dashed rgba(#000, 0.1);
      z-index: -1;
    }
  }
  &__set {
    padding: 28px 28px 36px;
  }
}
</style>
