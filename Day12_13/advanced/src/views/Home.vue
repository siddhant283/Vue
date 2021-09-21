<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" /><br />
    <p v-highlight="color">Testing higlighit directive</p>
    <input type="text" v-model="value" />
    <p>{{ accountInUSD }}</p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p v-for="name in filteredNames" :key="name">
      {{ name }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      color: "",
      value: "",
      names: [
        "siddhant",
        "kuntal",
        "sivam",
        "hardik",
        "hardy",
        "ontra",
        "ontru",
      ],
    };
  },
  computed: {
    accountInUSD() {
      return "$" + this.value;
    },
    filteredNames() {
      var foundNames = [];
      for (var name in this.names) {
        if (name.match(this.value)) {
          foundNames.push(name);
        }
      }
      return foundNames;
    },
  },
};
</script>
