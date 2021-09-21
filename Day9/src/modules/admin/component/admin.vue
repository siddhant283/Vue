<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand">Admin Page</a>

        <!-- Toggle button -->
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button> -->

        <!-- Collapsible wrapper -->
        <div
          id="navbarSupportedContent"
          class=""
        >
          <ul class="navbar-nav ml-auto">
            <li>
              <button
                class="btn btn-outline-primary"
                type="button"
                data-mdb-ripple-color="dark"
                @click="toHomePage()"
              >
                Home Page
              </button>
            </li>
          </ul>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->

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

          <tr
            v-for="(user, index) in users"
            :key="user.username"
          >
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
                :disabled="deleteDisabled(index)"
                @click="deleteUser(index)"
              >
                Delete
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateUser(index)"
              >
                Update
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div class="form-container">
        <div v-if="updateFlag">
          <form>
            <div>
              <label class="col-sm-6"><b>Update User</b></label>
              <div class="form-row">
                <div class="col-sm-1">
                  <input
                    v-model="$v.updateUserData.username.$model"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.updateUserData.firstname.$model"
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.updateUserData.lastname.$model"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.updateUserData.email.$model"
                    type="text"
                    class="form-control"
                    placeholder="Email"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.updateUserData.phone.$model"
                    type="text"
                    name="company"
                    class="form-control"
                    placeholder="Phone"
                  >
                </div>

                <div class="col-sm-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateChanges()"
                  >
                    Update User
                  </button>
                </div>
              </div>

              <div
                v-if="updateSubmitted && $v.updateUserData.$invalid"
                class="col-sm-4"
              >
                <span class="text-danger">
                  Please Enter Complete and Valid Details.
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="form-container">
        <div v-if="addFlag">
          <form>
            <div>
              <label class="col-sm-6"><b>Add User</b></label>
              <div class="form-row">
                <div class="col-sm-2">
                  <input
                    v-model="$v.addUserData.username.$model"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.addUserData.firstname.$model"
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.addUserData.lastname.$model"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.addUserData.email.$model"
                    type="text"
                    class="form-control"
                    placeholder="Email"
                  >
                </div>

                <div class="col-sm-2">
                  <input
                    v-model="$v.addUserData.phone.$model"
                    type="text"
                    name="company"
                    class="form-control"
                    placeholder="Phone"
                  >
                </div>

                <div class="">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addUser()"
                  >
                    Add
                  </button>
                </div>

                <div class="col">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="
                      (addFlag = false),
                      (addActive = true),
                      (serverFlag = false)
                    "
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div
                v-if="addSubmitted && $v.addUserData.$invalid"
                class="col-sm-4"
              >
                <span class="text-danger">
                  Please Enter Complete and Valid Details.
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="">
        <button
          class="btn btn-success"
          :disabled="!addActive"
          @click="
            (addFlag = true), (addActive = false), (serverFlag = false)
          "
        >
          <i class="fas fa-plus" />
          Add New User
        </button>
      </div>

      <div>
        <button
          type="button"
          class="btn btn-primary saveChanges"
          @click="postData()"
        >
          Save Changes
        </button>
        <div
          v-if="serverFlag"
          class="col-sm-8"
        >
          <h4>Server Message</h4>
          <p>
            {{ serverMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  helpers, required, minLength, email,
} from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^[ A-Za-z0-9_@./#&+-]*$/);

export default {
  name: 'Admin',
  data() {
    return {
      users: JSON.parse(localStorage.getItem('users')),
      serverFlag: false,
      updateIndex: null,
      updateFlag: false,
      updateUserData: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      },
      updateSubmitted: false,
      addFlag: false,
      addUserData: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      },
      addActive: true,
      addSubmitted: false,
      serverMessage: '',
    };
  },

  validations: {
    updateUserData: {
      username: {
        required,
        minLength: minLength(8),
        alpha,
      },
      firstname: {
        required,
        minLength: minLength(4),
      },
      lastname: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
    },
    addUserData: {
      username: {
        required,
        minLength: minLength(8),
        alpha,
      },
      firstname: {
        required,
        minLength: minLength(4),
      },
      lastname: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
    },
  },

  methods: {
    deleteUser(index) {
      this.serverFlag = false;
      this.users.splice(index, 1);
    },
    deleteDisabled(index) {
      if (index === this.updateIndex) {
        return true;
      }
      return false;
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
      const index = this.updateIndex;
      this.updateSubmitted = true;

      if (this.$v.updateUserData.$invalid) {
        return;
      }

      this.users[index].username = this.updateUserData.username;
      this.users[index].firstname = this.updateUserData.firstname;
      this.users[index].lastname = this.updateUserData.lastname;
      this.users[index].email = this.updateUserData.email;
      this.users[index].phone = this.updateUserData.phone;

      this.updateFlag = false;
      this.updateIndex = null;
    },
    addUser() {
      this.serverFlag = false;

      this.addSubmitted = true;

      if (this.$v.addUserData.$invalid) {
        return;
      }
      this.users.push(this.addUserData);
      this.addFlag = false;
      this.addActive = true;
    },
    postData() {
      localStorage.setItem('users', JSON.stringify(this.users));
      this.serverFlag = true;
      this.serverMessage = 'Changes Made Successfully';
    },
    toHomePage() {
      const user = JSON.parse(localStorage.getItem('userLoggedIn')).firstname;
      this.$router.push(`/user/home/${user}`);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 80%;
  border: solid 5px salmon;
  color: black;
}

h1,
h2,
h3 {
  text-align: center;
  padding: 10px;
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
  margin: 10px;
}

table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
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
