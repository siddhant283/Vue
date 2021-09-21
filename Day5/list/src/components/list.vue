<template>
  <div>
    <div class="list-container">
      <h3>Child Component</h3>
      <ol>
        <li v-for="item in childItems" :key="item">
          <p>{{ item }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    childMsg: String,
    childItems: Array,
  },
  data() {
    return {};
  },
  methods: {
    sendMessageToParent() {
      this.$emit("messageFromChild", this.childItems.length);
    },
  },
  watch: {
    childItems: {
      immediate: true,
      handler() {
        console.log(this.childItems + "list watcher");
        this.sendMessageToParent();
      },
    },
  },
};
</script>

<style scoped>
.list-container {
  border: 5px solid palevioletred;
  width: 80%;
  margin: 30px 0px;
  padding: 20px;
}
h3 {
  text-align: center;
}

ol {
  padding: 0px 20px;
  font-weight: bold;
}

ol li {
  font-weight: bold;
}
li > p {
  font-weight: normal;
}
</style>