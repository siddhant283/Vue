<template>
  <div class="container">
    <div>
      <div class="signup-form">
        <form @submit="loginCheck">
          <h2>Login</h2>
          <br />

          <p v-if="loginSuccessful">LogIn Successful !</p>
          <p v-if="invalidCredentials">Invalid Credentials</p>

          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
                v-model="login.username"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                v-model="login.password"
              />
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">Login</button>
          </div>

          <p>
            Not a User?
            <router-link to="/register">Register</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
      model: {},
      invalidCredentials: false,
      loginSuccessful: false,
    };
  },
  methods: {
    loginCheck(e) {
      e.preventDefault();
      this.verifyUser();
    },
    verifyUser() {
      if (localStorage.getItem("users") === null) {
        this.invalidCredentials = true;
        this.loginSuccessful = false;
      } else {
        var allUsers = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < allUsers.length; i++) {
          if (
            allUsers[i].username == this.login.username &&
            allUsers[i].password == this.login.password
          ) {
            this.loginSuccessful = true;
            this.invalidCredentials = false;

            this.model = allUsers[i];
            localStorage.setItem("userLoggedIn", JSON.stringify(this.model));

            setTimeout(() => {
             this.$router.push('/details')
            }, 1000);

            return;
          }
        }
        this.invalidCredentials = true;
        this.loginSuccessful = false;
      }
    },
  },
};
</script>

<style>
body {
  color: #fff;
  background: #fff;
  font-family: "Roboto", sans-serif;
}
.form-control,
.form-control:focus,
.input-group-addon {
  border-color: #e1e1e1;
}
.form-control,
.btn {
  border-radius: 3px;
}
.signup-form {
  width: 390px;
  margin: 0 auto;
  padding: 30px 0;
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.signup-form h2 {
  color: #333;
  font-weight: bold;
  margin-top: 0;
}
.signup-form hr {
  margin: 0 -30px 20px;
}
.signup-form .form-group {
  margin-bottom: 20px;
}
.signup-form label {
  font-weight: normal;
  font-size: 13px;
}
.signup-form .form-control {
  min-height: 38px;
  box-shadow: none !important;
}
.signup-form .input-group-addon {
  max-width: 42px;
  text-align: center;
}
.signup-form input[type="checkbox"] {
  margin-top: 2px;
}
.signup-form .btn {
  font-size: 16px;
  font-weight: bold;
  background: #19aa8d;
  border: none;
  min-width: 140px;
}
.signup-form .btn:hover,
.signup-form .btn:focus {
  background: #179b81;
  outline: none;
}
.signup-form a {
  color: #fff;
  text-decoration: underline;
}
.signup-form a:hover {
  text-decoration: none;
}
.signup-form form a {
  color: #19aa8d;
  text-decoration: none;
}
.signup-form form a:hover {
  text-decoration: underline;
}
.signup-form .fa {
  font-size: 21px;
}
.signup-form .fa-paper-plane {
  font-size: 18px;
}
.signup-form .fa-check {
  color: #fff;
  left: 17px;
  top: 18px;
  font-size: 7px;
  position: absolute;
}

.container {
  margin: 100px auto;
}
</style>

