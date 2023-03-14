import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import './assets/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
