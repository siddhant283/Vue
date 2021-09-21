<template>
  <div>
    <div class="container" v-if="$store.state.calActive">
      <div class="calc-body">
        <div class="calc-screen">
          <div class="calc-operation">{{ $store.state.current || "0" }}</div>
          <div class="calc-typed">{{ $store.state.result }}</div>
        </div>
        <div class="calc-button-row">
          <div class="button c" @click="$store.commit('clear')">C</div>
          <div class="button l" @click="$store.commit('append', '.')">.</div>
          <div class="button l" @click="$store.commit('percent')">%</div>
          <div class="button l" @click="$store.commit('append', '/')">/</div>
        </div>
        <div class="calc-button-row">
          <div class="button" @click="$store.commit('append', '7')">7</div>
          <div class="button" @click="$store.commit('append', '8')">8</div>
          <div class="button" @click="$store.commit('append', '9')">9</div>
          <div class="button l" @click="$store.commit('append', '*')">x</div>
        </div>
        <div class="calc-button-row">
          <div class="button" @click="$store.commit('append', '4')">4</div>
          <div class="button" @click="$store.commit('append', '5')">5</div>
          <div class="button" @click="$store.commit('append', '6')">6</div>
          <div class="button l" @click="$store.commit('append', '-')">−</div>
        </div>
        <div class="calc-button-row">
          <div class="button" @click="$store.commit('append', '1')">1</div>
          <div class="button" @click="$store.commit('append', '2')">2</div>
          <div class="button" @click="$store.commit('append', '3')">3</div>
          <div class="button l" @click="$store.commit('append', '+')">+</div>
        </div>
        <div class="calc-button-row">
          <div class="button" @click="$store.commit('append', '(')">(</div>
          <div class="button" @click="$store.commit('append', '0')">0</div>
          <div class="button" @click="$store.commit('append', ')')">)</div>
          <div class="button l" @click="$store.commit('calculate')">=</div>
        </div>
        <div class="calc-button-row">
          <div class="history" @click="$store.commit('updateScreen')">
            History
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="!($store.state.calActive)">
      <div class="calc-body">
        <div class="calc-screen">
          <div v-for="operation in $store.state.history" :key="operation" class="calc-operation">{{ operation }}</div>
        </div>
        <div class="calc-button-row">
          <div class="history" style="width:60%;" @click="$store.commit('updateScreen')">
            Calculator
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body {
  background: #eaebec;
}

.container {
  width: 400px;
  margin: auto;
}

.calc-body {
  width: 275px;
  margin: auto;
  /* min-height: 400px; */
  border: solid 1px #3a4655;
  box-shadow: 0 8px 50px -7px black;
}

.calc-screen {
  background: #3a4655;
  width: 100%;
  min-height: 150px;
  padding: 20px;
}

.calc-operation {
  text-align: right;
  color: #727b86;
  font-size: 21px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: dotted 1px;
}

.calc-typed {
  margin-top: 20px;
  font-size: 45px;
  text-align: right;
  color: #fff;
}

.calc-button-row {
  width: 100%;
  background: #3c4857;
}

.button {
  width: 25%;
  background: #425062;
  color: #fff;
  padding: 20px;
  display: inline-block;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
  margin-right: -4px;
  border-right: solid 2px #3c4857;
  border-bottom: solid 2px #3c4857;
  transition: all 0.2s ease-in-out;
}

.history {
  width: 50%;
  background: #425062;
  color: #fff;
  padding: 20px;
  display: inline-block;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
  margin-right: -4px;
  border-right: solid 2px #3c4857;
  border-bottom: solid 2px #3c4857;
  transition: all 0.2s ease-in-out;
}

.button.l {
  color: #aeb3ba;
  background: #404d5e;
}

.button.c {
  color: #d95d4e;
  background: #404d5e;
}

.button:hover {
  background: #e0b612;
  /* transform: rotate(5deg); */
}

.history:hover {
  background: #e0b612;
  /* transform: rotate(5deg); */
}

.button.c:hover,
.button.l:hover {
  background: #e0b612;
  color: #fff;
}
</style>
