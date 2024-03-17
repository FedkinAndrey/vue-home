<script lang="ts">
import { useAuth } from '../../store/auth.ts';
import { useUserStore } from '../../pages/user/store/userStore.ts';
import { usePostsStore } from '../../pages/posts/list/store/postsStore.ts';

export default {
  name: 'AppHeader',
  data() {
    return {
      // Other data properties can go here
    };
  },
  computed: {
    isAuthenticated() {
      const auth = useAuth();
      return auth.isAuthenticated;
    },
  },
  methods: {
    logout() {
      const auth = useAuth();
      const userStore = useUserStore();
      const postStore = usePostsStore();
      auth.logout();
      userStore.clearUserStorage();
      postStore.clearPostsStore();
    },
    isRouteActive(targetPath: string) {
      return this.$route.path === targetPath;
    },
  },
};
</script>

<template>
  <v-app-bar v-if="isAuthenticated">
    <v-toolbar dark prominent>
      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <nav class="d-flex ga-3 align-center">
        <v-btn
          :color="isRouteActive('/posts') ? 'blue' : 'orange'"
          :variant="isRouteActive('/posts') ? 'tonal' : ''"
          to="/posts"
          >my posts</v-btn
        >
        <v-btn
          :color="isRouteActive('/all-posts') ? 'blue' : 'orange'"
          :variant="isRouteActive('/all-posts') ? 'tonal' : ''"
          to="/all-posts"
          >all posts</v-btn
        >
        <v-btn
          :color="isRouteActive('/create') ? 'blue' : 'orange'"
          :variant="isRouteActive('/create') ? 'tonal' : ''"
          to="/create"
          >create posts</v-btn
        >
        <v-btn icon to="/profile">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </nav>
    </v-toolbar>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
