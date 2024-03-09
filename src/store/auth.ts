import { defineStore } from 'pinia';
import authApi, { ILogin, IRegister } from '../api/authApiController';
import router from '../router';
import { ROUTE_NAMES } from '../constants/route-names.ts';
import { useSnackbarStore } from './snackbar.ts';
// import { useSnackbarStore } from '@/stores/snackbarStore';

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isAuthenticating: false,
    isRegistering: false,
    resetToken: '',
    rememberMe: false,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async register(data: IRegister) {
      this.isRegistering = true;
      const response = await authApi.register(data);
      console.log('register', response);
      if (response.message) {
        const snackbarStore = useSnackbarStore();
        snackbarStore.showMessage(`${response.message}`, 'info');
        this.redirectToHome();
        return;
      }
      if (response) {
        this.isRegistering = false;
        await this.login(data);
      } else {
        this.isRegistering = false;
      }
    },

    async login(data: ILogin) {
      this.isAuthenticating = true;
      const response = await authApi.login(data);
      if (response) {
        this.token = response.headers.authorization;
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.isAuthenticated = true;
        }
        await router.push({ name: ROUTE_NAMES.POSTS });
      } else {
        this.token = null;
        this.redirectToHome();
        this.clearStorage();
      }
      this.isAuthenticating = false;
    },

    async logout() {
      await authApi.logout();
      this.resetAuthState();
    },

    resetAuthState() {
      this.isAuthenticated = false;
      this.token = null;

      this.redirectToHome();
    },

    clearStorage() {
      localStorage.clear();
    },

    redirectToHome() {
      router.push({ name: 'Home' });
    },
  },
});
