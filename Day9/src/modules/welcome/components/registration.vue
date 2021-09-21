<template>
  <div class="container">
    <div>
      <div class="signup-form">
        <form @submit="registerUser">
          <h2>Sign Up</h2>
          <br>
          <p v-if="!registrationSuccessful">
            Please fill in this form to create an account!
          </p>
          <p v-if="registrationSuccessful">
            Registration Successful!
          </p>

          <div class="form-group">
            <div class="input-group">
              <input
                v-model="$v.model.username.$model"
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
              >
            </div>
            <div v-if="$v.model.username.$dirty || submitted">
              <p
                v-if="!$v.model.username.required"
                class="text-danger"
              >
                this field is required
              </p>
              <p
                v-if="!$v.model.username.minLength"
                class="text-danger"
              >
                Username must have at least
                {{ $v.model.username.$params.minLength.min }} characters.
              </p>
              <p
                v-if="!$v.model.username.alpha"
                class="text-danger"
              >
                UserName can only contain AlphaNumeric Characters and Special
                Characters (*,_,@,.)
              </p>
              <p
                v-if="alreadyRegisteredUsername"
                class="text-danger"
              >
                Already Registered Username.
              </p>
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <input
                v-model="$v.model.email.$model"
                type="email"
                class="form-control"
                name="email"
                placeholder="Email Address"
              >
            </div>
            <div v-if="$v.model.email.$dirty || submitted">
              <p
                v-if="!$v.model.email.required"
                class="text-danger"
              >
                Email is required
              </p>
              <p
                v-if="!$v.model.email.email"
                class="text-danger"
              >
                Please enter valid email.
              </p>
              <p
                v-if="alreadyRegisteredEmail"
                class="text-danger"
              >
                Already Registered Email
              </p>
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <input
                v-model.trim="$v.model.password.$model"
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
              >
            </div>

            <div v-if="$v.model.password.$dirty || submitted">
              <p
                v-if="!$v.model.password.required"
                class="text-danger"
              >
                Password is required
              </p>
              <p
                v-if="!$v.model.password.minLength"
                class="text-danger"
              >
                Password must have at least
                {{ $v.model.password.$params.minLength.min }} characters.
              </p>
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <input
                v-model="$v.model.cnfpassword.$model"
                type="password"
                class="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
              >
            </div>
            <div v-if="$v.model.cnfpassword.$dirty || submitted">
              <p
                v-if="!$v.model.cnfpassword.required"
                class="text-danger"
              >
                Confirm Password is required
              </p>
              <p
                v-if="!$v.model.cnfpassword.sameAsPassword"
                class="text-danger"
              >
                Password must match.
              </p>
            </div>
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
            >
              Sign Up
            </button>
          </div>

          <p>
            Already Registered !
            <router-link to="/">
              Login
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {
  helpers, required, minLength, email, sameAs,
} from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^[ A-Za-z0-9_@./#&+-]*$/);

export default {
  name: 'Registration',
  data() {
    return {
      model: {
        username: '',
        email: '',
        password: '',
        cnfpassword: '',
      },
      registrationSuccessful: false,
      submitted: false,
      alreadyRegisteredEmail: false,
      alreadyRegisteredUsername: false,
    };
  },
  validations: {
    model: {
      username: {
        required,
        minLength: minLength(8),
        alpha,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      cnfpassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    registerUser(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.addUser();
    },
    addUser() {
      this.registrationSuccessful = false;
      this.alreadyRegisteredEmail = false;
      this.alreadyRegisteredUsername = false;

      if (localStorage.getItem('users') === null) {
        var allUsers = [];

        allUsers.push(this.model);
        localStorage.setItem('users', JSON.stringify(allUsers));
        this.registrationSuccessful = true;
      } else {
        allUsers = JSON.parse(localStorage.getItem('users'));

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].username == this.model.username) {
            this.alreadyRegisteredUsername = true;
          }

          if (allUsers[i].email == this.model.email) {
            this.alreadyRegisteredEmail = true;
          }
        }

        if (this.alreadyRegisteredUsername || this.alreadyRegisteredEmail) {
           this.registrationSuccessful = false;
        } else {
          allUsers.push(this.model);
          localStorage.setItem('users', JSON.stringify(allUsers));
          this.registrationSuccessful = true;
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
