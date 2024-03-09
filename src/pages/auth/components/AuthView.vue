<script setup lang="ts">
import { useAuth } from '../../../store/auth.ts';

const auth = useAuth();
</script>

<template>
  <div class="auth-page" v-if="!auth.isAuthenticated">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 445px;
  width: 100%;
}
</style>
