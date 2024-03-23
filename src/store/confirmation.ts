import { defineStore } from 'pinia';

interface ConfirmState {
  isActive: boolean;
  options: object;
}

const useConfirmation = defineStore('confirmation', {
  state: (): ConfirmState => ({
    isActive: false,
    options: {},
  }),
  actions: {
    showConfirmation({ title = '', text = '', hint = '', onSubmit = () => {}, onReject = () => {} } = {}) {
      this.options = {
        title,
        text,
        hint,
        onSubmit,
        onReject,
      };

      this.isActive = true;
    },
    closeConfirmation() {
      this.isActive = false;
      this.options = {};
    },
  },
});

export default useConfirmation;
