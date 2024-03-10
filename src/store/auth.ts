import { defineStore } from 'pinia';
import authApi, { ILogin, IRegister } from '../api/AuthApiController.ts';
import router from '../router';
import { ROUTE_NAMES } from '../constants/route-names.ts';
import { useSnackbarStore } from './snackbar.ts';

// const snackbarStore = useSnackbarStore();

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isAuthenticating: false,
    isRegistering: false,
    resetToken: '',
    rememberMe: false,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    email: localStorage.getItem('email') || null,
    fullName: localStorage.getItem('fullName') || null,
  }),

  actions: {
    validateAuth() {
      this.isAuthenticated = !!this.token;
      console.log(this.isAuthenticated);
    },
    async register(data: IRegister) {
      this.isRegistering = true;
      const response = await authApi.register(data);
      const isErrorExist = 'message' in response;
      console.log('register', response);
      if (isErrorExist) {
        const snackbarStore = useSnackbarStore();
        snackbarStore.showMessage(`${response?.message}`, 'error');
        this.isRegistering = false;
      }
      if (response && !isErrorExist) {
        this.isRegistering = false;
        await this.login(data);
      } else {
        this.isRegistering = false;
      }
    },

    async login(data: ILogin) {
      this.isAuthenticating = true;
      const response = await authApi.login(data);
      const isErrorExist = 'message' in response;
      if (response && !isErrorExist) {
        this.token = response.headers.authorization;
        const data = response.data.data;
        if (this.token) {
          localStorage.setItem('token', this.token);
          localStorage.setItem('email', data.email);
          localStorage.setItem('fullName', data.fullName);
          localStorage.setItem('userId', data.id);
          this.isAuthenticated = true;
        }
        await router.push({ name: ROUTE_NAMES.POSTS });
      } else {
        const snackbarStore = useSnackbarStore();
        snackbarStore.showMessage(`${response.message}`, 'error');
        this.token = null;
        this.clearStorage();
      }
      this.isAuthenticating = false;
    },

    async logout() {
      await authApi.logout();
      this.clearStorage();
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
