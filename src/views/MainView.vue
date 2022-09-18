<template>
  <Header />
  <main class="main">
    <div class="main__head"></div>
    <RecordList />
    <div class="main__clear">
      <button type="button" class="main__clear__btn" @click="onClear">
        内容を破棄してリセット
      </button>
    </div>
    <BackImage class="main__bg" />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Header from '@/components/Header.vue';
import RecordList from '@/components/RecordList.vue';
import BackImage from '@/assets/img/common/set_list.svg';

@Options({
  components: {
    Header,
    RecordList,
    BackImage
  }
})
export default class MainView extends Vue {
  // 内容を全て破棄
  onClear() {
    console.log(1);
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  padding: 24px 32px;
  z-index: 0;
  &__clear {
    margin-top: 16px;
    text-align: right;
    &__btn {
      color: var(--primaryColor);
      border-bottom: 1px solid currentColor;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 0;
      letter-spacing: 0.05em;
    }
  }
  &__bg {
    color: var(--subColor);
    opacity: 0.1;
    position: fixed;
    bottom: 0;
    left: 276px;
    z-index: -1;
  }
}
</style>
