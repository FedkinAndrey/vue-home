<script setup lang="ts">
import { computed } from 'vue';
import useConfirmation from '../../../store/confirmation.ts';
import AppModal from './AppModal.vue';

const confirmation = useConfirmation();

const closeHandler = () => {
  confirmation.options.onReject();
  confirmation.closeConfirmation();
};

const submitHandler = () => {
  confirmation.options.onSubmit();
  confirmation.closeConfirmation();
};

const hasLineBreak = computed(() => {
  const { title } = confirmation.options;
  return title ? /\n/g.test(title) : false;
});

const hasMessageLineBreak = computed(() => {
  const { text } = confirmation.options;
  return text ? /\n/g.test(text) : false;
});

const formattedTitle = computed(() => {
  const { title } = confirmation.options;
  return title?.replace(/\n/g, '<br/>');
});

const formattedMessage = computed(() => {
  const { text } = confirmation.options;
  return text?.replace(/\n/g, '<br/>');
});

const updateDialogVisibility = (newValue: boolean) => {
  confirmation.isActive = newValue;
};
</script>

<template>
  <app-modal :open="confirmation.isActive" @update:open="updateDialogVisibility" is-confirmation>
    <template v-if="confirmation.options.title" #title>
      <span v-if="hasLineBreak" v-html="formattedTitle"></span>
      <template v-else>{{ confirmation.options.title }}</template>
    </template>

    <template #default>
      <template v-if="confirmation.options.text">
        <div class="confirm-text">
          <span v-if="hasMessageLineBreak" v-html="formattedMessage"></span>
          <template v-else> {{ confirmation.options.text }}</template>
        </div>
      </template>

      <div class="confirm">
        <v-btn size="small" variant="elevated" light @click="submitHandler"> Confirm </v-btn>
        <v-btn size="small" variant="elevated" light @click="closeHandler"> Cancel </v-btn>
      </div>
    </template>
  </app-modal>
</template>

<style lang="scss" src="@/assets/scss/components/modal/confirmModal.scss"></style>
