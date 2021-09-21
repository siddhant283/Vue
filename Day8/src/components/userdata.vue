<template>
  <div class="container">
    <h3>User Table</h3>

    <div class="table-container">
      <table class="col-sm-12">
        <tr v-if="users.length > 0">
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>

        <tr v-for="(user, index) in users" :key="user.username">
          <td>
            {{ user.username }}
          </td>
          <td>
            {{ user.firstname }}
          </td>
          <td>
            {{ user.lastname }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>
            {{ user.phone }}
          </td>
          <td>
            <button
              class="delete btn btn-danger"
              type="button"
              v-on:click="deleteUser(index)"
              v-bind:disabled="deleteDisabled(index)"
            >
              Delete
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="updateUser(i)"
            >
              Update
            </button>
          </td>
        </tr>
      </table>
    </div>

    <div>
      <div class="form-container">
        <form>
          <div v-if="updateFlag">
            <form>
              <div>
                <label class="col-sm-6"><b>Update User</b></label>
                <div class="form-row">
                  <div class="col-sm-1">
                    <input
                      type="text"
                      name="username"
                      class="form-control"
                      placeholder="User Name"
                    />
                  </div>

                  <div class="col-sm-2">
                    <input
                      type="text"
                      name="firstname"
                      class="form-control"
                      placeholder="First Name"
                    />
                  </div>

                  <div class="col-sm-2">
                    <input
                      type="text"
                      name="lastname"
                      class="form-control"
                      placeholder=" Last Name"
                    />
                  </div>

                  <div class="col-sm-2">
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div class="col-sm-2">
                    <input
                      type="text"
                      name="Phone"
                      class="form-control"
                      placeholder="Phone"
                    />
                  </div>

                  <div class="col-sm-2">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      v-on:click="updateChanges()"
                      v-bind:disabled="this.$v.modelUpdate.$invalid"
                    >
                      Update User
                    </button>
                  </div>
                </div>

                <div
                  class="col-sm-4"
                  v-if="submitted && this.$v.modelUpdate.$invalid"
                >
                  <span class="text-danger">
                    Please Enter Complete and Valid Details.
                  </span>
                </div>
              </div>
            </form>
          </div>

          <label class="col-sm-6"><b>Add User</b></label>
          <div>
            <div>
              <form>
                <div>
                  <div class="form-row">
                    <div class="col-sm-1">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                      />
                    </div>

                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                      />
                    </div>

                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                      />
                    </div>

                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone"
                      />
                    </div>

                    <div class="col">
                      <button
                        class="btn btn-danger"
                        type="button"
                        v-on:click="removeUser(index)"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div
                    class="col-sm-4"
                    
                  >
                    <span class="text-danger">
                      Please Enter Complete Details.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="">
            <button
              class="btn btn-success"
              v-on:click="addUser()"
              v-bind:disabled="len > 0 && userForm.get('users').invalid"
            >
              <i class="fas fa-plus"></i>
              Add
            </button>

            <button
              type="button"
              class="btn btn-primary"
              v-on:click="onSave()"
              
            >
              Add User
            </button>
          </div>
        </form>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary saveChanges"
          v-on:click="postData()"
        >
          Save Changes
        </button>
        <div class="col-sm-8" v-if="serverFlag">
          <h4>Server Message</h4>
          <p>
            {{ serversMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[ A-Za-z0-9_@./#&+-]*$/);
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "userdata",
  data() {
    return {
      users: JSON.parse(localStorage.getItem("users")),
      len:null,
      userUpdateFlag:false,
      updateFlag:false,
      updateIndex:null,
      serverFlag:false,
      serversMessage:null,
      changingValue:null,
      modeUpdate:{
          username:"",
          fistname:"",
          lastname:"",
          email:"",
          phone:""
      }
    };
  },
  validations: {
    modelUpdate: {
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
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    deleteUser(index) {
      this.serverFlag = false;
      this.users.splice(index, 1);
    },
    deleteDisabled(index) {
      if (index == this.updateIndex) {
        return true;
      } else {
        return false;
      }
    },
    updateUser(index) {
      this.serverFlag = false;
      this.updateUserData.username = this.users[index].username;
      this.updateUserData.firstname = this.users[index].firstname;
      this.updateUserData.lastname = this.users[index].lastname;
      this.updateUserData.email = this.users[index].email;
      this.updateUserData.phone = this.users[index].phone;
      this.updateIndex = index;
      this.updateFlag = true;
    },

    updateChanges() {
      let index = this.updateIndex;

      this.users[index].username = this.updateUserData.username;
      this.users[index].firstname = this.updateUserData.firstname;
      this.users[index].lastname = this.updateUserData.lastname;
      this.users[index].email = this.updateUserData.email;
      this.users[index].phone = this.updateUserData.phone;

      this.updateFlag = false;
      this.updateIndex = null;
    },
  },
};
</script>