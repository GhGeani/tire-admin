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
config.url = 'http://localhost:3000';


Vue.prototype.$http = axios;
Vue.prototype.$config = config;


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
