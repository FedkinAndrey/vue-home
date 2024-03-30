<script setup lang="ts">
import { useAuth } from '../../store/auth.ts';
import { useUserStore } from './store/userStore.ts';
import { onMounted } from 'vue';
import PageLayout from '../../layouts/PageLayout.vue';

const auth = useAuth();
const store = useUserStore();

onMounted(() => {
  if (!auth.isAuthenticating && auth.email) {
    store.fetchUserData(auth.email);
  }
});
</script>

<template>
  <PageLayout :loading="store.loading && auth.isAuthenticating">
    <div class="profile">
      <h3>
        Name: <span>{{ store.fullName }}</span>
      </h3>
      <h3>
        Email: <span>{{ store.email }}</span>
      </h3>
      <h3>
        Address:
        <span :style="{ color: store.address ? '#2196f3' : '#C72D5BFF' }">{{
          store.address ?? 'Address not specified'
        }}</span>
      </h3>
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 30px;
  border: 1px solid #3575a8;
  border-radius: 15px;
  margin: 40px 20px;
  -webkit-box-shadow: 0px 0px 14px 5px rgba(193, 190, 237, 1);
  -moz-box-shadow: 0px 0px 14px 5px rgba(193, 190, 237, 1);
  box-shadow: 0px 0px 14px 5px rgba(193, 190, 237, 1);

  h3 > span {
    font-weight: 400;
    color: #2196f3;
  }
}
</style>
