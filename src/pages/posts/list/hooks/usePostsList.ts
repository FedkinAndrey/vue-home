import { reactive, toRefs } from 'vue';
import postApiController from '../../../../api/PostApiController.ts';
import userApiController from '../../../../api/UserApiController.ts';
import { useAuth } from '../../../../store/auth.ts';
import { useSnackbarStore } from '../../../../store/snackbar.ts';

const usePostsList = () => {
  const auth = useAuth();
  const snackbarStore = useSnackbarStore();

  const state = reactive({
    loading: false,
    allPosts: null,
    userPosts: null,
  });

  const fetchAllPosts = async () => {
    state.loading = true;

    const response = await postApiController.getAllPosts();
    if (response) {
      state.allPosts = response.data;
    }
    state.loading = false;
  };

  const fetchUserPosts = async () => {
    state.loading = true;

    if (auth.userId) {
      const response = await userApiController.getAllPostsByUser(auth.userId);
      if (response) {
        state.userPosts = response.data;
      }
    } else {
      snackbarStore.showMessage(`User is absent`, 'error');
    }

    state.loading = false;
  };

  const refetchAllPosts = async () => {
    state.allPosts = null;
    fetchAllPosts();
  };

  const refetchUserPosts = async () => {
    state.allPosts = null;
    fetchUserPosts();
  };

  return {
    ...toRefs(state),
    fetchAllPosts,
    fetchUserPosts,
    refetchAllPosts,
    refetchUserPosts,
  };
};

export default usePostsList;
