<script setup lang="ts">
import './styles/globals.scss';

// import { useTheme } from 'vuetify';
import AppLayout from './layouts/AppLayout.vue';
import { useAuth } from './store/auth.ts';
// import { onMounted } from 'vue';

// const theme = useTheme();
const auth = useAuth();

// function toggleTheme() {
//   theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
// }

// onMounted(() => {
//   // const authStore = useAuth();
//   auth.validateAuth();
// });
</script>

<template>
  <AppLayout :loading="auth.isAuthenticating || auth.isRegistering">
    <router-view />
  </AppLayout>
</template>

<style scoped></style>
