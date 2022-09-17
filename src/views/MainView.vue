<template>
  <main class="main">
    <div class="main__head"></div>
    <RecordList />
    <BackImage class="main__bg" />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RecordList from '@/components/RecordList.vue';
import BackImage from '@/assets/img/common/set_list.svg';

@Options({
  components: {
    RecordList,
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
}
</style>
