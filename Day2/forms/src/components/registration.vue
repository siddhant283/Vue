<template>
  <div class="container">
    <div>
      <div class="signup-form">
        <form @submit="registerUser">
          <h2>Sign Up</h2>
          <br />
          <p v-if="!(registrationSuccessful)">Please fill in this form to create an account!</p>
          <p v-if="registrationSuccessful">Registration Successful!</p>

          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
                v-model="model.username"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"
                ><i class="fa fa-paper-plane"></i
              ></span>
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email Address"
                v-model="model.email"
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
                v-model="model.password"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-lock"></i>
                <i class="fa fa-check"></i>
              </span>
              <input
                type="password"
                class="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                v-model="model.cnfpassword"
              />
            </div><br>
            <p v-if="passwordNotMatch">Passwords don't match.</p>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>

          <p>
            Already Registered !
            <router-link to="/">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "registration",
  data() {
    return {
      model: {},
      registrationSuccessful: false,
      passwordNotMatch: false,
    };
  },
  methods: {
    registerUser(e) {
      e.preventDefault();
      this.addUser();
    },
    addUser() {
      if (localStorage.getItem("users") === null) {
        var allUsers = [];
        if (this.model.password == this.model.cnfpassword) {
          allUsers.push(this.model);
          localStorage.setItem("users", JSON.stringify(allUsers));
          this.registrationSuccessful = true;
        } else {
          this.passwordNotMatch = true;
        }
      } else {
        allUsers = JSON.parse(localStorage.getItem("users"));

        if (this.model.password == this.model.cnfpassword) {
          allUsers.push(this.model);
          localStorage.setItem("users", JSON.stringify(allUsers));
          this.registrationSuccessful = true;
        }else{
            this.passwordNotMatch=true;
        }
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
</style>