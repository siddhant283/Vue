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

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private childItems!: Array<string>;
  totalItems!: number;

  @Watch("childItems", {
    immediate: true,
  })
  childItemsChanged(newVal: string): void {
    console.log(newVal + "list watcher");
    this.addToItems(this.childItems.length);
  }

  @Emit()
  addToItems(total: number): void {
    this.totalItems = total;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
