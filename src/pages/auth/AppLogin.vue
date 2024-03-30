<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useAuth } from '@/store/auth.ts';
import AuthView from './components/AuthView.vue';
import { ref } from 'vue';

interface LoginForm {
  email: string;
  password: string;
}

const { handleSubmit, handleReset } = useForm<LoginForm>({
  validationSchema: {
    email(value: string) {
      if (/^(?:\d{10}|\w+@\w+\.\w{2,3})$/i.test(value)) return true;

      return 'Must be a valid e-mail.';
    },
    password(value: string) {
      if (value?.length >= 2) return true;

      return 'Password needs to be at least 6 characters.';
    },
  },
});
const email = useField('email');
const password = useField('password');
const visible = ref(false);

const auth = useAuth();

const submit = handleSubmit(async ({ email, password }) => {
  await auth.login({
    email,
    password,
  });
  handleReset();
});
</script>

<template>
  <auth-view class="auth">
    <v-sheet class="mx-auto" width="400">
      <v-form @submit.prevent="submit" class="auth__form">
        <div class="text-h4 text-center">Login</div>
        <v-text-field
          variant="outlined"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
          prepend-inner-icon="mdi-email-outline"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Password"
          prepend-inner-icon="mdi-lock-question"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="auth__actions">
          <v-btn type="submit" variant="elevated" block>Login</v-btn>
        </div>

        <v-card-text class="text-center">
          <v-btn to="/signup" variant="text">Sign up now</v-btn>
        </v-card-text>
      </v-form>
    </v-sheet>
  </auth-view>
</template>

<style scoped lang="scss">
.auth {
  border-radius: 15px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border-radius: 20px;
    background: rgb(219, 250, 252);
    background: linear-gradient(
      94deg,
      rgba(219, 250, 252, 1) 0%,
      rgba(91, 223, 240, 1) 65%,
      rgba(88, 243, 245, 1) 100%
    );
    -webkit-box-shadow: 0px 4px 5px 4px rgba(209, 209, 209, 1);
    -moz-box-shadow: 0px 4px 5px 4px rgba(209, 209, 209, 1);
    box-shadow: 0px 4px 5px 4px rgba(209, 209, 209, 1);
  }

  &__actions {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
}
</style>
