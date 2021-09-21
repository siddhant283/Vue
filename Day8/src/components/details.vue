<template>
  <div class="container">
    <div>
      <div class="signup-form">
        <form @submit="submitDetails">
          <h2>Enter Your Details !</h2>
          <br />

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>First Name</b></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="firstName"
                placeholder="First Name"
                v-model="$v.model.firstname.$model"
              />
            </div>
            <div v-if="$v.model.firstname.$dirty || submitted">
              <p class="text-danger" v-if="!$v.model.firstname.required">
                First Name is required
              </p>
              <p class="text-danger" v-if="!$v.model.firstname.minLength">
                First Name must have at least
                {{ $v.model.firstname.$params.minLength.min }} characters.
              </p>
              <p class="text-danger" v-if="!$v.model.firstname.alpha">
                First Name can only cntain alphabets.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>Last Name</b></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="LastName"
                placeholder="Last Name"
                v-model="$v.model.lastname.$model"
              />
            </div>
            <div v-if="$v.model.lastname.$dirty || submitted">
              <p class="text-danger" v-if="!$v.model.lastname.required">
                Lastname is required
              </p>
              <p class="text-danger" v-if="!$v.model.lastname.minLength">
                Lastname must have at least
                {{ $v.model.lastname.$params.minLength.min }} characters.
              </p>
              <p class="text-danger" v-if="!$v.model.lastname.alpha">
                Last Name can only cntain alphabets.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>User Name</b></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
                v-model="$v.model.username.$model"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>Email</b></label
            >
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email Address"
                v-model="$v.model.email.$model"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>Phone</b></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="phone"
                placeholder="Phone Number"
                v-model="$v.model.phone.$model"
              />
            </div>
            <div v-if="$v.model.phone.$dirty || submitted">
              <p class="text-danger" v-if="!$v.model.phone.required">
                Phone Number is required.
              </p>
              <p class="text-danger" v-if="!$v.model.phone.minLength">
                Phone Number must have at least
                {{ $v.model.phone.$params.minLength.min }} digits.
              </p>
              <p class="text-danger" v-if="!$v.model.phone.maxLength">
                Phone Number must have at most
                {{ $v.model.phone.$params.maxLength.min }} digits.
              </p>
              <p class="text-danger" v-if="!$v.model.phone.digits">
                Phone can only contain digits.
              </p>
              <p class="text-danger" v-if="alreadyRegisteredPhone">
                This Phone is already Registered.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="password" style="color: black; font-size: 15px"
              ><b>Project</b></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="project"
                placeholder="Project Name"
                v-model="$v.model.project.$model"
              />
            </div>
            <div v-if="$v.model.project.$dirty || submitted">
              <p class="text-danger" v-if="!$v.model.project.required">
                Project Name is Required.
              </p>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[ A-Za-z]*$/);
const digits = helpers.regex("alpha", /^[0-9]*$/);
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "details",
  data() {
    return {
      model: {
        firstname:
          JSON.parse(localStorage.getItem("userLoggedIn")).firstname ?? "",
        lastname:
          JSON.parse(localStorage.getItem("userLoggedIn")).lastname ?? "",
        username: JSON.parse(localStorage.getItem("userLoggedIn")).username,
        email: JSON.parse(localStorage.getItem("userLoggedIn")).email,
        phone: JSON.parse(localStorage.getItem("userLoggedIn")).phone ?? "",
        project: JSON.parse(localStorage.getItem("userLoggedIn")).project ?? "",
        password: JSON.parse(localStorage.getItem("userLoggedIn")).password,
      },
      submitted: false,
      alreadyRegisteredPhone: false,
    };
  },
  validations: {
    model: {
      username: {
        required,
      },
      firstname: {
        required,
        minLength: minLength(4),
        alpha,
      },
      lastname: {
        required,
        minLength: minLength(4),
        alpha,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        digits,
      },
      project: {
        required,
      },
    },
  },
  methods: {
    submitDetails(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.alreadyRegisteredPhone = false;

      var allUsers = JSON.parse(localStorage.getItem("users"));

      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].phone && allUsers[i].phone == this.model.phone) {
          this.alreadyRegisteredPhone = true;
          return;
        }
      }

      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username == this.model.username) {
          allUsers[i] = this.model;
          localStorage.setItem("users", JSON.stringify(allUsers));
        }
      }

      console.log("outside phone loop");

      localStorage.setItem("userLoggedIn", JSON.stringify(this.model));

      setTimeout(() => {
        var user = this.model.firstname
        this.$router.push("/user/home/" + user);
      }, 1000);
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