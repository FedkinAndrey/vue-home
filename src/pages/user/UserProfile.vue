<script setup lang="ts">
import { useAuth } from '../../store/auth.ts';
import { useUserStore } from './store/userStore.ts';
import { onMounted } from 'vue';
import PageLayout from '../../layouts/PageLayout.vue';

const auth = useAuth();
const store = useUserStore();

onMounted(() => {
  if (!auth.isAuthenticating && auth.email) {
    store.fetchUserData(auth.email);
  }
});
</script>

<template>
  <PageLayout :loading="store.loading && auth.isAuthenticating">
    <div>{{ store.fullName }}</div>
    <div>{{ store.email }}</div>
    <div>{{ store.fullName }}</div>
    <div>{{ store.address }}</div>
  </PageLayout>
</template>

<style scoped lang="scss"></style>
