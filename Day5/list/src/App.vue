<template>
  <div class="container">
    <h2>Parent Componenet</h2>
    <h3>List Add and Delete</h3>
    <b><label for="list-item">List Items</label></b
    ><br />
    <input
      type="text"
      name="list-items"
      id=""
      v-model="newItemParent"
      placeholder="Enter New Item"
    />
    <button type="button" class="btn btn-success" @click="addItem">Add</button>
    <button type="button" class="btn btn-danger" @click="removeItem">
      Remove
    </button>
    <list :childItems="items" @messageFromChild="childMessageReceived" />
    <p>Response from child: {{ response }}</p>
  </div>
</template>

<script>
import list from "./components/list";

export default {
  name: "App",
  components: {
    list,
  },
  data() {
    return {
      newItemParent: null,
      items: [],
      response: null,
    };
  },
  methods: {
    addItem() {
      this.items.push(this.newItemParent);

      return;
    },
    removeItem() {
      if (this.items.length > 0) {
        var index = this.items.length - 1;
        this.items.splice(index, 1);
      }

      return;
    },
    childMessageReceived(length){
      if(length<1){
        this.response = 'List is Empty';
      }
      else{
        this.response = 'List contains ' + length + ' items';
      }
    }
  },
};
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

