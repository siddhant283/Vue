<template>
  <div>
    <form @submit="loginData">
      <input
        type="username"
        name="username"
        placeholder="enter username"
        v-model="login.username"
      /><br /><br />
      <input
        type="password"
        name="password"
        placeholder="enter password"
        v-model="login.password"
      /><br /><br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    loginData(e) {
      console.log(this.login);
      e.preventDefault();
    },
  },
};
</script>