<script setup lang="ts">
import AppPreloader from '../components/base/AppPreloader.vue';

interface IProps {
  loading: boolean;
}

const { loading } = defineProps<IProps>();
</script>

<template>
  <div class="page-layout">
    <div class="page-layout__content">
      <AppPreloader v-if="loading" />
      <slot v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__content {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    flex: 1;
  }
}
</style>
