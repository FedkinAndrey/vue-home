<script setup lang="ts">
import PageLayout from '../../../layouts/PageLayout.vue';
import { onMounted } from 'vue';
import { usePostsStore } from './store/postsStore.ts';
import { useAuth } from '../../../store/auth.ts';

const store = usePostsStore();
const auth = useAuth();

onMounted(() => {
  store.fetchAllPosts();
  if (auth.userId) store.fetchUserPosts(auth.userId);
});
</script>

<template>
  <PageLayout :loading="store.loading">
    <div>{{ store.posts }}</div>
    <v-list>
      <v-list-item v-for="post in store.posts" :key="post.id">
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
      </v-list-item>
    </v-list>

    <div>{{ store.userPosts }}</div>
    <v-list>
      <v-list-item v-for="post in store.userPosts" :key="post.id">
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
      </v-list-item>
    </v-list>
  </PageLayout>
</template>

<style scoped lang="scss"></style>
