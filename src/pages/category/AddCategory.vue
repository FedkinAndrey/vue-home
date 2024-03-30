<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue';
import { useField, useForm } from 'vee-validate';
import categoryApiController from '@/api/CategoryApiController.ts';
import { useSnackbarStore } from '@/store/snackbar.ts';

interface CategoryForm {
  name: string;
}

const snackbarStore = useSnackbarStore();

const { handleSubmit, handleReset } = useForm<CategoryForm>({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 3) return true;
      return 'Category name needs to be at least 3 characters.';
    },
  },
});

const name = useField('name');

const submit = handleSubmit(async ({ name }) => {
  await categoryApiController.createCategory({ name });
  snackbarStore.showMessage('Category  added', 'success');
  const myMusic = document.getElementById('audio3');
  myMusic.play();
  handleReset();
});
</script>

<template>
  <PageLayout :loading="false">
    <v-form @submit.prevent="submit" class="category-form">
      <div class="text-h4 text-center">Add new Category</div>
      <v-text-field
        variant="outlined"
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="Category name"
      ></v-text-field>

      <div class="category-form__actions">
        <v-btn type="submit" variant="elevated" block>Add</v-btn>
      </div>
    </v-form>
  </PageLayout>
</template>

<style scoped lang="scss">
.category-form {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 100%;
  gap: 20px;
  padding: 30px;

  &__actions {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
}
</style>
