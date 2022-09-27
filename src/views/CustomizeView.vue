<template>
  <main class="customize">
    <HeadingTitle title="カスタマイズ" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeadingTitle from '@/components/heading/HeadingTitle.vue';

export default defineComponent({
  name: 'CustomizeView',
  components: {
    HeadingTitle
  }
});
</script>

<style scoped lang="scss">
.customize {
  padding: 48px 32px;
}
</style>
