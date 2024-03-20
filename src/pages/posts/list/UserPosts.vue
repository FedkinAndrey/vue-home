<script setup lang="ts">
import PageLayout from '../../../layouts/PageLayout.vue';
import { onMounted } from 'vue';
import { usePostsStore } from './store/postsStore.ts';
import { useAuth } from '../../../store/auth.ts';
import PostsList from './components/PostsList.vue';

const store = usePostsStore();
const auth = useAuth();

onMounted(() => {
  if (auth.userId) store.fetchUserPosts(auth.userId);
});
</script>

<template>
  <PageLayout :loading="store.loading && auth.isAuthenticating">
    <PostsList :posts="store.userPosts" />
  </PageLayout>
</template>

<style scoped lang="scss"></style>
