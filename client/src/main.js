import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './scss/reset.scss';
import './scss/global.scss';
import './scss/utility.scss';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
