<template>
  <div>aaa</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class App extends Vue {}
</script>

<style lang="scss">
html {
  background-color: transparent !important;
  overflow: hidden !important;
  height: 100%;
  user-select: none;
}
body {
  -webkit-app-region: drag !important;
  height: 100%;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
</style>
