import { defineStore } from 'pinia';
import authApi, { ILogin, IRegister } from '../api/AuthApiController.ts';
import router from '../router';
import { ROUTE_NAMES } from '../constants/route-names.ts';
import { useSnackbarStore } from './snackbar.ts';

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
    },
    async register(data: IRegister) {
      this.isRegistering = true;
      const response = await authApi.register(data);
      const isErrorExist = 'message' in response;
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
      const snackbarStore = useSnackbarStore();
      this.isAuthenticating = true;

      const response = await authApi.login(data);
      console.log(response);
      const isErrorExist = 'message' in response;

      if (isErrorExist) {
        snackbarStore.showMessage(`${response.message}`, 'error');
        this.token = null;
        this.clearStorage();
        this.isAuthenticating = false;
        return;
      }

      this.token = response.headers.authorization;
      const userData = response.data;

      if (this.token && userData && !isErrorExist) {
        // Set the token and user details in localStorage
        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', userData.id.toString()); // Ensure it's a string for localStorage
        localStorage.setItem('email', userData.email);
        localStorage.setItem('fullName', userData.fullName);

        // Update state
        this.userId = userData.id;
        this.email = userData.email;
        this.fullName = userData.fullName;
        this.isAuthenticated = true;

        // Navigate to the '/posts' page
        await router.push({ name: ROUTE_NAMES.POSTS });
      }

      this.isAuthenticating = false;
    },

    async logout() {
      setTimeout(async () => {
        await authApi.logout();
        this.clearStorage();
        this.resetAuthState();
      }, 1000);
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
