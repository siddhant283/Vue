import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import login from './components/login'
import registration from './components/registration'
import details from './components/details'
import home from './components/home'

Vue.use(VueRouter);
const routes=[
  {
    path:'/',
    component:login
  },
  {
    path:'/register',
    component:registration
  },
  {
    path:'/details',
    component:details
  },
  {
    path:'/home/:username',
    component:home
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
