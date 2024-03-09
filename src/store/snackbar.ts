import { defineStore } from 'pinia';

interface SnackbarState {
  visible: boolean;
  message: string;
  color: string;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): SnackbarState => ({
    visible: false,
    message: '',
    color: 'success',
  }),

  actions: {
    showMessage(message: string, color: string = 'success') {
      this.message = message;
      this.color = color;
      this.visible = true;
    },

    hideMessage() {
      this.visible = false;
    },
  },
});
