import { defineStore } from 'pinia';
import { IAddress } from '../../../api/AuthApiController.ts';
import userApiController from '../../../api/UserApiController.ts';
import { useSnackbarStore } from '../../../store/snackbar.ts';

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
      const snackbarStore = useSnackbarStore();
      this.loading = true;
      // const ema = 'sdsd@sdf.com';
      try {
        const response = await userApiController.getUserInfo(email);
        const data = response.data;
        const isErrorExist = 'message' in data;

        if (isErrorExist) {
          snackbarStore.showMessage(`${data.message}`, 'error');
        }

        if (data) {
          this.email = data.email;
          this.fullName = data.fullName;
          this.address = data.address;
        }
      } catch (error) {
        // console.log(error);
        // snackbarStore.showMessage(`${error.s}`, 'error');
        snackbarStore.showMessage('Something went wrong', 'error');
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
