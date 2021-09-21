<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1> {{ title }} </h1>
    <Home FirstName="Siddhant" 
    LastName="Kuntal" 
    title="Deja Vu" 
    html="<h1> v-html directive learnings </h1>"
    visibility=true
    v-on:changeTitle="updateTitle($event)" />
    <Login />
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'
import Login from './components/login.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Home,
    Login
  },
  data(){
    return{
      title:"Vuejs Title"
    }
  },
  methods: {
    updateTitle(title){
      this.title = title
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
