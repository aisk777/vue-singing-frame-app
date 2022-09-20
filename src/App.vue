<template>
  <Sidebar class="l-sidebar" />
  <div class="l-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  }
});
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
</style>
