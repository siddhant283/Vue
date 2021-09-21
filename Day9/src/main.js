import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from './modules/core/component/App.vue';
import login from './modules/welcome/components/login.vue';
import welcome from './modules/welcome/components/welcome.vue';

Vue.use(Vuelidate);

function guardMyroute(to, from, next) {
  let isAuthenticated = false;

  if (localStorage.getItem('isAdmin') === 'true') {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next();
  } else {
    alert('This Page is only Accessible to Admin');
  }
}

Vue.use(VueRouter);
const routes = [

  {
    path: '/',
    redirect: '/login',
    component: welcome,
    children: [
      {
        path: 'login',
        component: login,
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "registration" */ './modules/welcome/components/registration.vue'),
      },
    ],
  },

  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './modules/userInfo/component/user.vue'),
    children: [
      {
        path: 'details/:username',
        component: () => import(/* webpackChunkName: "details" */ './modules/userInfo/component/details.vue'),
      },
      {
        path: 'home/:username',
        component: () => import(/* webpackChunkName: "home" */ './modules/userInfo/component/home.vue'),
      },
      {
        path: 'admin',
        beforeEnter: guardMyroute,
        component: () => import(/* webpackChunkName: "admin" */ './modules/admin/component/admin.vue'),
        meta: { title: 'Admin' },
      },
    ],
  },

  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ './modules/exception/component/notfound.vue'),
  },
];

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
