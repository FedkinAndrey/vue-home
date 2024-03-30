<script setup lang="ts">
import AppModal from './AppModal.vue';
import { useField, useForm } from 'vee-validate';
import postApiController, { ICreatePost } from '../../../api/PostApiController.ts';
import { useAuth } from '@/store/auth.ts';
import { usePostsStore } from '@/pages/posts/list/store/postsStore.ts';
import { useSnackbarStore } from '@/store/snackbar.ts';

interface ModalProps {
  open: boolean;
  post: ICreatePost & { id: number };
}

const emit = defineEmits(['update:open']);
const props = defineProps<ModalProps>();
const postStore = usePostsStore();
const auth = useAuth();
const snackbarStore = useSnackbarStore();

const closeModal = () => {
  emit('update:open', false); // Emit event to close the modal
};

interface UpdatePostForm {
  title: string;
  content: string;
}

const { handleSubmit } = useForm<UpdatePostForm>({
  validationSchema: {
    title(value: string) {
      if (value?.length >= 2) return true;
      return 'Must be a valid title';
    },
    content(value: string) {
      if (value?.length >= 2) return true;
      return 'Content needs to be at least 6 characters.';
    },
  },
  initialValues: {
    title: props.post.title,
    content: props.post.content,
  },
});

const title = useField('title');
const content = useField('content');

const submit = handleSubmit(async ({ title, content }) => {
  await postApiController.updatePost({ content, title }, props.post.id);
  snackbarStore.showMessage('Post updated', 'success');
  const myMusic = document.getElementById('audio3');
  myMusic.play();
  await postStore.refetchUserPosts(auth.userId);
  closeModal();
});
</script>

<template>
  <app-modal :open="props.open" @update:open="emit('update:open', $event)">
    <template #title>
      <div class="text-h4 text-center">Update Post</div>
    </template>
    <v-form @submit.prevent="submit" class="auth__form">
      <v-text-field
        variant="outlined"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
        label="Title"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="content.value.value"
        :error-messages="content.errorMessage.value"
        label="content"
      ></v-text-field>

      <div :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
        <v-btn type="submit">Save</v-btn>
        <v-btn @click="closeModal">Cancel</v-btn>
      </div>
    </v-form>
  </app-modal>
</template>

<style scoped lang="scss"></style>
