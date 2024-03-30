import { defineStore } from 'pinia';

interface ConfirmationOptions {
  title?: string;
  text?: string;
  onSubmit: () => void;
  onReject: () => void;
}

interface ConfirmState {
  isActive: boolean;
  options: ConfirmationOptions;
}

const useConfirmation = defineStore('confirmation', {
  state: (): ConfirmState => ({
    isActive: false,
    options: {
      title: '',
      text: '',
      onSubmit: () => {},
      onReject: () => {},
    },
  }),
  actions: {
    showConfirmation(options: Partial<ConfirmationOptions> = {}) {
      this.options = {
        ...this.options,
        ...options,
      };

      this.isActive = true;
    },
    closeConfirmation() {
      this.isActive = false;
      this.options = {
        title: '',
        text: '',
        onSubmit: () => {},
        onReject: () => {},
      };
    },
  },
});

export default useConfirmation;
