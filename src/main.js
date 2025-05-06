// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './app/router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Импорт JavaScript Bootstrap (опционально)
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './app/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true
};

app.use(router);
app.use(pinia);
app.use(Toast, toastOptions);

app.mount('#app');
