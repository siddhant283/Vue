<template>
  <div class="container">
    <slot name="title"></slot>
    <slot name="table"></slot>
  </div>
</template>

<script>
export default {
  name: "api",
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    console.log("fetch component mounted");
  },
  method: {
    fetchData() {},
  },
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 80%;
  border: solid 5px salmon;
}

h1,
h2,
h3 {
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
}

.form-row {
  margin: 2px;
  width: 100%;
}

.form-group {
  width: 40%;
}

.btn-success {
  margin: 15px;
}

.delete {
  margin: 5px;
}

.saveChanges {
  margin: 10px;
}

.marks {
  margin-left: 310px;
}

.table-container {
  margin: 10px auto;
  width: 80%;
}

table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
  font-size: 20px;
}

th,
td {
  text-align: left;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>