<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useAuth } from '../../store/auth.ts';
import { IAddress, IRegister } from '../../api/AuthApiController.ts';
import { ref } from 'vue';
import AuthView from './components/AuthView.vue';

interface RegistrationForm {
  email: string;
  password: string;
  fullName: string;
  address?: IAddress;
}

const visible = ref(false);

const { handleSubmit, handleReset } = useForm<RegistrationForm>({
  validationSchema: {
    email(value: string) {
      if (/^(?:\d{10}|\w+@\w+\.\w{2,3})$/i.test(value)) return true;

      return 'Must be a valid e-mail.';
    },
    password(value: string) {
      if (value?.length >= 2) return true;

      return 'Password needs to be at least 6 characters.';
    },
    fullName(value: string) {
      if (value?.length >= 2) return true;

      return 'Full name needs to be at least 6 characters.';
    },
  },
});

const email = useField('email');
const password = useField('password');
const fullName = useField('fullName');
const country = useField('country');
const city = useField('city');
const street = useField('street');

const auth = useAuth();

const submit = handleSubmit(async ({ email, password, fullName, address }) => {
  const data: IRegister = {
    email,
    password,
    fullName,
    address: {
      country: address?.country ?? '',
      city: address?.city ?? '',
      street: address?.street ?? '',
    },
  };

  await auth.register(data);
  handleReset();
});
</script>

<template>
  <auth-view class="auth">
    <v-sheet class="mx-auto" width="400">
      <v-form @submit.prevent="submit" class="auth__form">
        <div class="text-h4 text-center">Sign Up</div>
        <v-text-field
          variant="outlined"
          v-model="fullName.value.value"
          :error-messages="fullName.errorMessage.value"
          label="Full name"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>Address (optional)</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div>
                <v-text-field
                  variant="outlined"
                  v-model="country.value.value"
                  :error-messages="country.errorMessage.value"
                  label="Country"
                ></v-text-field>
                <v-text-field
                  variant="outlined"
                  v-model="city.value.value"
                  :error-messages="city.errorMessage.value"
                  label="City"
                ></v-text-field>
                <v-text-field
                  variant="outlined"
                  v-model="street.value.value"
                  :error-messages="street.errorMessage.value"
                  label="Street"
                ></v-text-field>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="auth__actions">
          <v-btn type="submit" variant="elevated" block>Sign up</v-btn>
        </div>

        <v-card-text class="text-center">
          <v-btn to="/login" variant="text">Login</v-btn>
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
