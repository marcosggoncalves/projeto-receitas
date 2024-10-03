
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; ;

import Notifications from '@kyvg/vue3-notification';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives'; 
import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();

if (localStorage.getItem("state")) {
    pinia.state.value = JSON.parse(localStorage.getItem("state"));
}

watch(
  pinia.state,
  (state) => {
      localStorage.setItem("state", JSON.stringify(state));
  },
  { deep: true }
);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',  
  },
});

app.use(pinia); 
app.use(Notifications);
app.use(router);
app.use(vuetify);

app.mount('#app');
