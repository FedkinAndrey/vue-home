<script setup lang="ts">
import Preloader from '../components/base/AppPreloader.vue';
import { useSnackbarStore } from '../store/snackbar.ts';
import AppHeader from '../components/header/AppHeader.vue';
import ConfirmModal from '../components/base/Modal/ConfirmModal.vue';
import AppAudio from '../components/base/AppAudio.vue';

interface Props {
  isActive?: boolean;
  loading: boolean;
}

const { loading, isActive } = defineProps<Props>();
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

    <app-header />
    <ConfirmModal />
    <v-main class="d-flex align-center justify-center">
      <slot></slot>
    </v-main>
  </v-layout>

  <app-audio />
</template>

<style lang="scss"></style>
