import { defineStore } from 'pinia';
import postApiController from '../../../../api/PostApiController.ts';
import userApiController from '../../../../api/UserApiController.ts';

interface ICategory {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  categories: ICategory[];
}

export type IPostWithAuthor = IPost & {
  author: {
    fullName: string;
  };
};

interface IPostStore {
  posts: IPostWithAuthor[] | null;
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
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
      this.loading = false;
    },

    async fetchUserPosts(id: number | string) {
      this.loading = true;
      try {
        const response = await userApiController.getAllPostsByUser(id);
        this.userPosts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
      this.loading = false;
    },

    async refetchAllPosts() {
      this.posts = [];
      await this.fetchAllPosts();
    },

    async refetchUserPosts(id: number | string) {
      this.posts = [];
      await this.fetchUserPosts(id);
    },

    clearPostsStore() {
      this.posts = null;
      this.userPosts = null;
    },
  },
});
