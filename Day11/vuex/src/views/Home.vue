<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Counter/> 
    <CounterSquare/>
    <div class="buttons">
      <button @click="$store.dispatch('decreaseCounter')">-</button>
      <button @click="$store.dispatch('increaseCounter')">+</button>
    </div>
    <div>
      <input placeholder="Enter Color Code" type="text" v-model="colorCode" />
    </div>
  </div>
</template>

<script>
import Counter from '../components/Counter'
import CounterSquare from '../components/CounterSquare'

export default {
  name: "Home",
  components: {
    Counter,
    CounterSquare
  },
  computed: {
    colorCode: {
      get() {
        return this.$store.state.colorCode;
      },
      set(newValue) {
        this.$store.dispatch("setColorCode", newValue);
      },
    },
  },
};
</script>

<style>
div {
  margin-bottom: 10px;
  text-align: center;
}
.counter {
  font-size: 80px;
}
.buttons button {
  font-size: 40px;
  width: 100px;
  margin: 0 10px;
}
</style>
