<template>
  <main class="main">
    <div class="main__heading"></div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue';

@Options({
  components: {}
})
export default class MainView extends Vue {}
</script>

<style scoped lang="scss">
.main {
  &__heading {
    position: sticky;
    top: 0;
  }
}
</style>
