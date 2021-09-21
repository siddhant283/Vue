<template>
  <div class="container">
    <h2>Parent Componenet</h2>
    <h3>{{ projectDetail }}</h3>
    <h3>List Add and Delete</h3>
    <b><label for="list-item">List Items</label></b
    ><br />
    <input
      type="text"
      name="list-items"
      id=""
      v-model="newItemParent"
      placeholder="Enter New Item"
      @keyup="addItem"
    />
    <button type="button" class="btn btn-success" @click="addItem">Add</button>
    <button type="button" class="btn btn-danger" @click="removeItem">
      Remove
    </button>
    <list :childItems="items" @add-to-items="childMessageReceived" />
    <p>Response from child: {{ response }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import list from "./components/list.vue";
import ProjectMixin from "./mixin/ProjectMixin";

@Component({
  components: {
    list,
  },
})
export default class App extends Mixins(ProjectMixin) {
  newItemParent = "";
  items: Array<string> = [];
  response = "";

  
  //Using Mixin
  get projectDetail(): string {
    this.setProjectName("Vue using Typescript");
    return  this.projName + " " + "App";
  }

  //event type any as handling both keyboard and mouse events.
  // eslint-disable-next-line
  addItem(event:any): void {
    if (event.keyCode === 13 || event.type == "click") {
      this.items.push(this.newItemParent);
    }
  }

  removeItem(): void {
    if (this.items.length > 0) {
      var index = this.items.length - 1;
      this.items.splice(index, 1);
    }
  }
  childMessageReceived(length: number): void {
    if (length < 1) {
      this.response = "List is Empty";
    } else {
      this.response = "List contains " + length + " items";
    }
  }
}
</script>

<style scoped>
.container {
  border: 5px solid palevioletred;
  width: 50%;
  margin: 200px auto;
  padding: 20px;
}
h2,
h3 {
  text-align: center;
}

.btn-success {
  margin: 10px;
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
