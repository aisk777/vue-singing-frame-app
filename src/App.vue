<template>
  <Sidebar class="l-sidebar" />
  <div class="l-container">
    <Header class="l-header" />
    <router-view class="l-main" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';

@Options({
  components: {
    Sidebar,
    Header
  }
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
.l-sidebar {
  background-color: var(--subColor);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0 40px;
  width: 276px;
  z-index: 99;
}
.l-container {
  display: grid;
  grid-template-rows: auto 1fr;
  padding-left: 276px;
  min-height: 100vh;
}
.l-header {
  position: sticky;
  top: 0;
  background-color: var(--backColor);
  padding: 24px 32px;
  box-shadow: 0 4px 8px 0 rgba(#000, 0.04);
  z-index: 1;
}
</style>
