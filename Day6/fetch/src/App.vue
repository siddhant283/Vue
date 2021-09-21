<template>
  <div>
    <api>
      <h3 slot="title">Http Component</h3>

      <div slot="table" class="table-container">
        <table class="col-sm-12">
          <tr v-if="users.length > 0">
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
          </tr>

          <tr v-for="user of users" :key="user.id">
            <td>
              {{ user.id }}
            </td>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ user.username }}
            </td>
            <td>
              {{ user.email }}
            </td>
            <td>
              {{ user.company.name }}
            </td>
          </tr>
        </table>
      </div>
    </api>
  </div>
</template>

<script>
import api from "./components/api";

export default {
  name: "App",
  components: {
    api: api,
  },
  data() {
    return {
      users: [],
    };
  },
  beforeMount() {
    this.getData();
    console.log("parent component before mount");
  },
  methods: {
    async getData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      this.users = data;
    },
  },
};
</script>
