
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import login from './components/login'
import registration from './components/registration'
import details from './components/details'
import home from './components/home'
import admin from './components/admin'
import welcome from './components/welcome'
import notfound from './components/notfound'
import user from './components/user'

Vue.use(Vuelidate)

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
        component: registration
      }
    ]
  },

  {
    path: '/user',
    component: user,
    children: [
      {
        path: 'details/:username',
        component: details
      },
      {
        path: 'home/:username',
        component: home
      },
      {
        path: 'admin',
        component: admin
      },
    ]
  },

  {
    path: '*',
    component: notfound
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
