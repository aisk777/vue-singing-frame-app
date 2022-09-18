<template>
  <header class="l-header">
    <HeadingNav />
    <HeadingSinging />
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import HeadingNav from '@/components/HeadingNav.vue';
import HeadingSinging from '@/components/HeadingSinging.vue';

@Options({
  components: {
    HeadingNav,
    HeadingSinging
  }
})
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
.l-header {
  position: sticky;
  top: 0;
  background-color: var(--backColor);
  padding: 24px 32px;
  box-shadow: 0 4px 8px 0 rgba(#000, 0.06);
  z-index: 1;
}
</style>
