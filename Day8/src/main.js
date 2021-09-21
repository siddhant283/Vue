
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import login from './components/login'


import welcome from './components/welcome'


Vue.use(Vuelidate)


function guardMyroute(to, from, next) {

  var isAuthenticated = false;

  if (localStorage.getItem("isAdmin") == "true") {


    isAuthenticated = true;

  }

  else {

    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next();
  }
  else {
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
        component: login
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "registration" */ "./components/registration.vue")
      }
    ]
  },

  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ "./components/user.vue"),
    children: [
      {
        path: 'details/:username',
        component: () => import(/* webpackChunkName: "details" */ "./components/details.vue")
      },
      {
        path: 'home/:username',
        component: () => import(/* webpackChunkName: "home" */ "./components/home.vue")
      },
      {
        path: 'admin',
        beforeEnter: guardMyroute,
        component: () => import(/* webpackChunkName: "admin" */ "./components/admin.vue"),
        meta: { title: 'Admin' }
      },
    ]
  },

  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ "./components/notfound.vue")
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
