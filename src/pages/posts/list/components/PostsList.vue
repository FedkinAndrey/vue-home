<script setup lang="ts">
import { IPost, IPostWithAuthor } from '../store/postsStore.ts';
import { ref } from 'vue';

interface IProps<T> {
  posts: T[];
}

const dialog = ref(false);

const { posts } = defineProps<IProps<IPostWithAuthor | IPost>>();
</script>

<template>
  <div class="posts-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post__content">
        <div class="post__content-title">
          <h3>{{ post.title }}</h3>
          <p>
            <span>Author:</span>
            <span v-if="'author' in post" class="name">{{ post.author.fullName }}</span>
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

      <div class="btn-icon" v-if="!('author' in post)">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon size="small" @click="dialog = true">
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-btn>
          </template>
          Edit Post
        </v-tooltip>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-spacer></v-spacer>

      <v-btn @click="dialog = false"> Disagree </v-btn>

      <v-btn @click="dialog = false"> Agree </v-btn>
    </v-dialog>
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

  .btn-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
