import Vue from 'vue';
import Router from 'vue-router';
import { auth } from './utils/auth';

import Login from './views/Login.vue';
import Servicii from './views/Servicii.vue';
import Anunturi from './views/Anunturi.vue';
import Vanzari from './views/Vanzari.vue';
import getSale from './components/sales/getSale.vue';
import Prezentare from './views/Prezentare.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/servicii',
      name: 'servicii',
      component: Servicii,
    },
    {
      path: '/vanzari',
      name: 'vanzari',
      component: Vanzari,
    },
    {
      path: '/vanzari/:id',
      name: 'GetSale',
      component: getSale,
    },
    {
      path: '/anunturi',
      name: 'anunturi',
      component: Anunturi,
    },
    {
      path: '/prezentare',
      name: 'prezentare',
      component: Prezentare,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login' && auth.isAuthenticated()) {
    next(from.fullPath);
  } else if (
    (to.fullPath === '/'
    || to.fullPath === '/servicii'
    || to.fullPath === '/anunturi'
    || to.fullPath === '/vanzari'
    ) && !auth.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
