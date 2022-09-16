<template>
  <Sidebar />
  <router-view class="l-main" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';

@Options({
  components: {
    Sidebar
  }
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
.l-main {
  padding-left: 276px;
}
</style>
