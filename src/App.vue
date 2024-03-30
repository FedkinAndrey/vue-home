<script setup lang="ts">
import './styles/globals.scss';

import AppLayout from './layouts/AppLayout.vue';
import { useAuth } from './store/auth.ts';

const auth = useAuth();
</script>

<template>
  <AppLayout :loading="auth.isAuthenticating || auth.isRegistering">
    <router-view />
  </AppLayout>
</template>

<style scoped></style>
