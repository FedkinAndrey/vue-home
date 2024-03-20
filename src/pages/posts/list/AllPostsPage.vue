<script setup lang="ts">
import PageLayout from '../../../layouts/PageLayout.vue';
import { onMounted } from 'vue';
import { usePostsStore } from './store/postsStore.ts';
import PostsList from './components/PostsList.vue';

const store = usePostsStore();

onMounted(() => {
  store.fetchAllPosts();
});
</script>

<template>
  <PageLayout :loading="store.loading">
    <PostsList :posts="store.posts" />
  </PageLayout>
</template>

<style scoped lang="scss"></style>
