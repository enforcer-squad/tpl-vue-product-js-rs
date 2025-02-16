import { createApp } from 'vue';
// import './index.global.less';
import App from './app.vue';
// import router from './routes';
// import { createPinia } from 'pinia';

const app = createApp(App);
// const pinia = createPinia();

// app.use(pinia);
// app.use(router);
app.mount('#root');
