<template>
  <nav class="l-sidebar">
    <router-link to="/">Home</router-link> |
    <router-link to="/history">About</router-link>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Sidebar extends Vue {
  msg!: string;
}
</script>

<style scoped lang="scss">
.l-sidebar {
  background-color: var(--subColor);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 276px;
  z-index: 99;
}
</style>
