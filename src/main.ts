import { createApp } from 'vue';
import { LoginClient } from '@authress/login';
import { createRouter, createWebHashHistory } from 'vue-router';
import { authressLoginClient, starterKitIsConfiguredCorrectly } from './authressClient';

import './style.css';

import Home from './routes/home.vue';
import ProtectedPage from './routes/protected.vue';
import Unauthorized from './routes/unauthorized.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/unauthorized', component: Unauthorized,
      beforeEnter: async (to, from, next) => {
        const userIsLoggedIn = await authressLoginClient.userSessionExists();
        if (userIsLoggedIn) {
          console.log('User is already logged in, redirect them to home.');
          next('/');
          return;
        }
        next();
      }
    },
    {
      path: '/protected',
      component: ProtectedPage,
      beforeEnter: async (to, from, next) => {
        const userIsLoggedIn = await authressLoginClient.userSessionExists();
        if (!userIsLoggedIn) {
          console.log('User is not logged on the protected route, redirecting to unauthorized');
          next('Unauthorized');
          return;
        }
        next();
      }
    }
  ]
});

const app = createApp({});
app.use(router);
app.mount('#app');