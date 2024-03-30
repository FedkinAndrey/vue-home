<script lang="ts">
import { useAuth } from '@/store/auth.ts';
import { useUserStore } from '@/pages/user/store/userStore.ts';
import { usePostsStore } from '@/pages/posts/list/store/postsStore.ts';

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
      <v-toolbar-title onclick="">
        <v-btn variant="plain" to="/">Vue Home</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <nav class="d-flex ga-3 align-center mr-2">
        <v-btn
          :color="isRouteActive('/posts') ? 'blue' : 'orange'"
          :variant="isRouteActive('/posts') ? 'tonal' : 'elevated'"
          to="/posts"
          >my posts</v-btn
        >
        <v-btn
          :color="isRouteActive('/all-posts') ? 'blue' : 'orange'"
          :variant="isRouteActive('/all-posts') ? 'tonal' : 'elevated'"
          to="/all-posts"
          >all posts</v-btn
        >
        <v-btn
          :color="isRouteActive('/create') ? 'blue' : 'orange'"
          :variant="isRouteActive('/create') ? 'tonal' : 'elevated'"
          to="/create"
          >create posts</v-btn
        >
        <v-btn
          :color="isRouteActive('/category') ? 'blue' : 'orange'"
          :variant="isRouteActive('/category') ? 'tonal' : 'elevated'"
          to="/category"
          >add category</v-btn
        >
        <!--        <v-btn variant="flat" icon to="/profile">-->
        <!--          <v-icon>mdi-account</v-icon>-->
        <!--        </v-btn>-->
        <v-btn variant="flat" icon to="/profile">
          <v-icon>mdi-account</v-icon>
          <v-tooltip activator="parent" location="bottom">Profile</v-tooltip>
        </v-btn>
        <v-btn variant="flat" icon @click="logout">
          <v-icon>mdi-export</v-icon>
          <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
        </v-btn>
      </nav>
    </v-toolbar>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
