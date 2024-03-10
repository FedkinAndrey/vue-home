import { defineStore } from 'pinia';
import postApiController from '../../../../api/PostApiController.ts';
import userApiController from '../../../../api/UserApiController.ts';

interface ICategory {
  id: number;
  name: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  categories: ICategory[];
}

interface IPostStore {
  posts: IPost[] | null;
  userPosts: IPost[] | null;
  loading: boolean;
}

export const usePostsStore = defineStore('posts', {
  state: (): IPostStore => ({
    posts: [],
    userPosts: [],
    loading: false,
  }),
  actions: {
    async fetchAllPosts() {
      this.loading = true;
      try {
        const response = await postApiController.getAllPosts();
        this.posts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchUserPosts(id: number | string) {
      this.loading = true;
      try {
        const response = await userApiController.getAllPostsByUser(id);
        this.userPosts = response.data.data;
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

    async refetchUserPosts(id: number | string) {
      this.posts = [];
      this.fetchUserPosts(id);
    },
  },
});
