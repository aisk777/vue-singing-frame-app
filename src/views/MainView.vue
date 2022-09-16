<template>
  <main class="main">
    <div class="main__head"></div>
    <ul class="main__list">
      <li class="main__list__item"></li>
    </ul>
    <BackImage class="main__bg" />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BackImage from '@/assets/img/common/set_list.svg';

@Options({
  components: {
    BackImage
  }
})
export default class MainView extends Vue {}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  padding: 24px 32px;
  z-index: 0;
  &__bg {
    color: var(--subColor);
    opacity: 0.1;
    position: fixed;
    bottom: 0;
    left: 276px;
    z-index: -1;
  }
  &__list {
    background-color: var(--backColor);
    border: 1px solid var(--borderColor);
    border-radius: 4px;
    overflow: hidden;
    &__item {
      padding: 12px 16px;
    }
  }
}
</style>
