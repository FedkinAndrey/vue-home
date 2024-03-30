<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface ModalProps {
  open: boolean;
  hasCloseButton?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  hasCloseButton: true,
});

const emit = defineEmits(['update:open']);

const closeModalDefault = () => {
  // props.close();
  emit('update:open', false);
};
</script>

<template>
  <v-dialog v-model="props.open" max-width="500" persistent class="modal">
    <div class="modal__content">
      <v-btn
        variant="flat"
        icon
        size="medium"
        v-if="props.hasCloseButton"
        @click.stop="closeModalDefault"
        class="modal__close"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
      <div class="modal__inner">
        <h2 v-if="$slots.title" class="modal__title">
          <slot name="title"></slot>
        </h2>
        <slot></slot>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped lang="scss" src="@/assets/scss/components/modal/appModal.scss"></style>
