<script setup lang="ts">
import { useAuth } from '../store/auth.ts';
import Preloader from '../components/base/AppPreloader.vue';
import { useSnackbarStore } from '../store/snackbar.ts';

interface Props {
  isActive?: boolean;
  loading: boolean;
}

const { loading, isActive } = defineProps<Props>();
const auth = useAuth();
const snackbarStore = useSnackbarStore();
</script>

<template>
  <v-snackbar v-model="snackbarStore.visible" :color="snackbarStore.color" :timeout="3000" location="top right">
    {{ snackbarStore.message }}
    <template #actions>
      <v-btn variant="text" @click="snackbarStore.hideMessage">Close</v-btn>
    </template>
  </v-snackbar>
  <v-layout class="rounded rounded-md h-screen align-center">
    <Preloader v-if="loading" />

    <v-app-bar title="Application bar" v-if="auth.isAuthenticated">
      <header>header</header>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<style lang="scss"></style>
