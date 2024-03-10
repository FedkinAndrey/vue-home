<script lang="ts">
import { useAuth } from '../../store/auth.ts';

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
      // You need to replace this with your actual authentication logic
      // For example, check Vuex store, Pinia store, or localStorage
      return auth.isAuthenticated; // Placeholder: Assume true for now
    },
    isRouteActive() {
      // Use this.$route if you are inside Options API
      const route = this.$route;
      // Example logic, replace '/my-posts' with your actual route
      return route.path === '/my-posts';
    },
  },
  methods: {
    logout() {
      const auth = useAuth();
      auth.logout();
    },
    // Your methods for interacting with the component can go here
  },
};
</script>

<template>
  <v-app-bar v-if="isAuthenticated">
    <v-toolbar dark prominent>
      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <nav class="d-flex ga-3 align-center">
        <v-btn variant="tonal" color="blue">my posts</v-btn>
        <v-btn color="orange">all posts</v-btn>
        <v-btn color="orange">create posts</v-btn>
        <v-btn icon>
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
