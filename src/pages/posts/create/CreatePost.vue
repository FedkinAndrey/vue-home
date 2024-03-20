<script setup lang="ts">
import { onMounted, ref } from 'vue';
import categoryApiController from '../../../api/CategoryApiController.ts';
import { useField, useForm } from 'vee-validate';
import postApiController, { ICreatePost } from '../../../api/PostApiController.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const fetchedCategories = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const response = await categoryApiController.getAllCategories();
  fetchedCategories.value = response.data.data;
  isLoading.value = false;
});

interface CreatePostForm {
  content: string;
  title: string;
  categories: number[];
}

const { handleSubmit, handleReset } = useForm<CreatePostForm>({
  validationSchema: {
    title(value: string) {
      if (value?.length >= 2) return true;
      return 'title needs to be at least 6 characters.';
    },
    content(value: string) {
      if (value?.length >= 2) return true;
      return 'content needs to be at least 6 characters.';
    },
    categories(value: number[]) {
      if (value && value.length > 0) return true;
      return 'Post must has one category';
    },
  },
});
const title = useField('title');
const content = useField('content');
const categories = useField<number[]>('categories');

const submit = handleSubmit(async ({ content, title, categories }) => {
  const selectedCategories = categories.map((item) => {
    return { id: item };
  });

  const data: ICreatePost = {
    title,
    content,
    categories: selectedCategories,
  };

  const response = await postApiController.createPost(data);
  if (response.status === 200) {
    handleReset();
    await router.push('/posts');
  }
});
</script>

<template>
  <div class="post">
    <v-form @submit.prevent="submit" class="post__form">
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
        label="Content"
      ></v-text-field>

      <v-select
        v-if="!isLoading"
        v-model="categories.value.value"
        :items="fetchedCategories"
        item-title="name"
        item-value="id"
        label="Categories"
        :error-messages="categories.errorMessage.value"
        multiple
      ></v-select>

      <div class="auth__actions">
        <v-btn type="submit" variant="elevated" block>Create</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.post {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    width: 100%;
  }
}
</style>
