<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['update:open', 'close']);

const closeModal = () => {
  emits('update:open', false); // This is important
  emits('close'); // This is important
};

interface ModalProps {
  open: boolean;
  hasCloseButton: boolean;
}

const { open, hasCloseButton } = withDefaults(defineProps<ModalProps>(), {
  open: false,
  hasCloseButton: true,
});

const openModal = ref(open);
</script>

<template>
  <v-dialog v-model="openModal" activator="parent" max-width="500" min-width="300" persistent>
    <v-btn icon size="small" v-if="hasCloseButton" @click.stop="closeModal">
      <v-icon>mdi-close-circle-outline</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <div>
      <h2 v-if="$slots.title" class="modal__title">
        <slot name="title"></slot>
      </h2>
      <slot></slot>
    </div>

    <v-btn @click="closeModal">Disagree</v-btn>
    <v-btn @click="closeModal">Agree</v-btn>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
