<script setup lang="ts">
import PageLayout from '../../../layouts/PageLayout.vue';
import { onMounted, watch } from 'vue';
import { usePostsStore } from './store/postsStore.ts';
import { useAuth } from '../../../store/auth.ts';
import AppPreloader from '../../../components/base/AppPreloader.vue';

const store = usePostsStore();
const auth = useAuth();

onMounted(() => {
  if (auth.userId) store.fetchUserPosts(auth.userId);
});
</script>

<template>
  <PageLayout :loading="store.loading && auth.isAuthenticating">
    <v-list>
      <v-list-item v-for="post in store.userPosts" :key="post.id">
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
      </v-list-item>
    </v-list>
  </PageLayout>
  <!--  <div v-if="!store.loading && !auth.isAuthenticating">-->
  <!--    <v-list>-->
  <!--      <v-list-item v-for="post in store.userPosts" :key="post.id">-->
  <!--        <p>{{ post.title }}</p>-->
  <!--        <p>{{ post.content }}</p>-->
  <!--      </v-list-item>-->
  <!--    </v-list>-->
  <!--  </div>-->
  <!--  <AppPreloader v-else />-->
</template>

<style scoped lang="scss"></style>
