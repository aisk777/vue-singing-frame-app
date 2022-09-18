<template>
  <div></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Preview extends Vue {
  $store?: any;

  created() {
    this.$store.commit('isSidebar', false);
  }
}
</script>

<style lang="scss">
html {
  background-color: transparent;
  overflow: hidden;
}
body {
  -webkit-app-region: drag;
}
</style>
