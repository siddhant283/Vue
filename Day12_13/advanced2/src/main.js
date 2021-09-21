import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//Filters
Vue.filter("toUppercase", function (value) {
  return value.toUpperCase().slice(0, 10) + "...";
});

//Custom Directive

Vue.directive("rainbow", {
  bind(el) {
    el.style.color = "#" + Math.random().toString().slice(2, 8);
  },
});

Vue.directive("dynamicColor", {
  update(el, binding) {
    el.style.color = binding.value;
  },
});

// eslint-disable-next-line prettier/prettier
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value;
});

Vue.directive("theme", {
  bind(el, binding) {
    if (binding.value === "wide") {
      el.style.maxWidth = "1200px";
    } else if (binding.value === "narrow") {
      el.style.maxWidth = "100px";
    }
    if (binding.arg === "column") {
      el.style.background = "#ddd";
      el.style.padding = "20px";
    }
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
