<template>
  <header class="l-header">
    <HeadingNav />
    <HeadingSinging />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeadingNav from '@/components/HeadingNav.vue';
import HeadingSinging from '@/components/HeadingSinging.vue';

export default defineComponent({
  name: 'Heading',
  components: {
    HeadingNav,
    HeadingSinging
  }
});
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
