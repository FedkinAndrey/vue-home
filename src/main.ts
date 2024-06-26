import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/globals.scss';
import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { useAuth } from './store/auth.ts';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => (store.$router = markRaw(router)));

app.use(pinia);

const authStore = useAuth();
authStore.validateAuth();

app.use(router);
app.use(vuetify);

app.mount('#app');
