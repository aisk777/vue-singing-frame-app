<template>
  <Default :text="nowSinging" :records="records" />
</template>

<script lang="ts">
import { State as StoreState } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Default from './Default.vue';

export default defineComponent({
  name: 'App',
  components: {
    Default
  },
  setup() {
    const store = useStore<StoreState>();
    const records = computed(() => store.state.main_record);
    const nowSinging = computed(() => store.state.now_singing);

    return {
      nowSinging,
      records
    };
  }
});
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
#app {
  height: 100%;
}
</style>
