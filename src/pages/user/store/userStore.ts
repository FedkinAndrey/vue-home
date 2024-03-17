import { defineStore } from 'pinia';
import { IAddress } from '../../../api/AuthApiController.ts';
import userApiController from '../../../api/UserApiController.ts';

interface IUserStore {
  email: string | null;
  fullName: string | null;
  address: IAddress | null;
  loading: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): IUserStore => ({
    email: null,
    fullName: null,
    address: null,
    loading: false,
  }),
  actions: {
    async fetchUserData(email: string) {
      this.loading = true;
      try {
        const response = await userApiController.getUserInfo(email);
        const data = response.data.data;
        this.email = data.email;
        this.fullName = data.fullName;
        this.address = data.address;
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        this.loading = false;
      }
    },

    clearUserStorage() {
      this.email = null;
      this.fullName = null;
      this.address = null;
    },
  },
});
