<script setup lang="ts">
import { IPost, IPostWithAuthor } from '../store/postsStore.ts';
import { ref } from 'vue';
import useConfirmation from '../../../../store/confirmation.ts';
import postApiController from '../../../../api/PostApiController.ts';
import UpdatePostModal from '../../../../components/base/Modal/UpdatePostModal.vue';
import { useSnackbarStore } from '@/store/snackbar.ts';

interface IProps<T> {
  posts: T[];
}
const snackbarStore = useSnackbarStore();

const open = ref(false);
const emit = defineEmits(['postDeleted']);

const openModal = () => {
  open.value = true;
};

const confirmation = useConfirmation();

const handleDelete = async (id: number) => {
  confirmation.showConfirmation({
    title: `Do you want to delete this post with ${id}`,
    onSubmit: async () => {
      const response = await postApiController.deletePost(id);
      if (response.status === 404) {
        snackbarStore.showMessage('Post deleted', 'success');
        emit('postDeleted');
        const myMusic = document.getElementById('audio1');
        myMusic.play();
      }
    },
    onReject: () => {},
  });
};

const { posts } = defineProps<IProps<IPostWithAuthor | IPost>>();
</script>

<template>
  <div class="posts-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post__content">
        <div class="post__content-title">
          <h3>{{ post.title }}</h3>
          <p v-if="'author' in post">
            <span>Author:</span>
            <span class="name">{{ post.author.fullName }}</span>
          </p>
        </div>
        <div class="text-caption">
          <p>{{ post.content }}</p>
        </div>
        <div class="post__category">
          <ul class="post__category-list">
            <li v-for="category in post.categories" :key="category.id" class="post__category-item">
              <p>#{{ category.name }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="!('author' in post)" class="post__actions">
        <v-btn variant="tonal" @click="openModal">Edit</v-btn>
        <v-btn variant="outlined" @click="handleDelete(post.id)">Delete</v-btn>
      </div>

      <update-post-modal :open="open" :post="post" @update:open="open = $event" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.posts-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
}

.post {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 20px 25px;
  border: 1px solid #74acff;
  align-items: center;
  justify-content: space-between;
  width: 300px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-title {
      font-size: 20px;

      p {
        font-size: 14px;
        color: #a39e9a;
      }

      .name {
        margin-left: 5px;
      }
    }

    p {
      display: flex;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  &__category {
    display: flex;

    &-list {
      display: flex;
    }

    &-item {
      margin-right: 5px;
      font-size: 12px;
      color: #74acff;
    }
  }
}
</style>
