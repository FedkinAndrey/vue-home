import { defineStore } from 'pinia';
import postApiController from '../../../../api/PostApiController.ts';
import userApiController from '../../../../api/UserApiController.ts';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    userPosts: [],
    loading: false,
  }),
  actions: {
    async fetchAllPosts() {
      this.loading = true;
      try {
        const response = await postApiController.getAllPosts();
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchUserPosts(id) {
      this.loading = true;
      try {
        const { data } = await userApiController.getAllPostsByUser(id);
        this.userPosts = data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
    },

    async refetchAllPosts() {
      this.posts = [];
      this.fetchAllPosts();
    },

    async refetchUserPosts(id) {
      this.posts = [];
      this.fetchUserPosts(id);
    },
  },
});
