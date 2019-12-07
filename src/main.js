import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import './assets/css/global.css';
import './registerServiceWorker';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';
import '../node_modules/@fortawesome/fontawesome-free/css/brands.css';
import '../node_modules/@fortawesome/fontawesome-free/css/solid.css';

const config = {};
let url = 'http://localhost:3000';
config.folder = 'tireshopdev';

if (process.env.NODE_ENV === 'production') {
  url = 'https://tire-backend.herokuapp.com';
  config.folder = 'tireshop';
}
config.url = url;


Vue.prototype.$http = axios;
Vue.prototype.$config = config;


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
