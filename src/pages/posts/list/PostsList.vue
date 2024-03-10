<script setup lang="ts">
import PageLayout from '../../../layouts/PageLayout.vue';
import { onMounted } from 'vue';
import { usePostsStore } from './store/postsStore.ts';

const store = usePostsStore();

onMounted(() => {
  store.fetchAllPosts();
});

if (!store.loading) {
  // console.log(store.posts[0]);
}
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
  </PageLayout>
</template>

<style scoped lang="scss"></style>
