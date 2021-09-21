<template>
  <div>
    <h1>FirstName: {{ FirstName }}</h1>
    <h1>LastName: {{ LastName }}</h1>
    <input type="text" v-on:input="changeTitle" />
    <p v-once>{{ title }}</p>
    <button v-on:click="popMessage()">Activate Function</button>
    <span v-html="html"></span>
    <h3 v-if="show">
      Use of directives for conditional rendering in Vue - If Block
    </h3>
    <h3 v-else>Else Block - Conditional Rendering</h3>
    <button v-on:click="ifToggler()">If Toggler</button><br><br>
    <button v-bind:disabled="disable">Able/Disable</button>
    <table border="1px">
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
        </tr>
        <tr v-for="user in users" :key="user.id">
           <td> {{user.id}} </td>
           <td> {{user.name}} </td>
           <td> {{user.email}} </td>
        </tr>
    </table>
    <h1 class="homestyle">Class and Style Binding</h1>
    <h1 v-bind:style="{color: 'blue'}">Style Binding</h1>
    <h1 v-bind:class="{display:showClass}">Class binding with object</h1>
    <h1 v-bind:class="['arrayClass']">Class binding with Array</h1>
    <input type="text" v-model="bindingMsg">
    <p> {{ bindingMsg }} </p>
    <button v-on:click="updateTitle">Update Parent Title</button><br><br><br>

    <div>
        <h2>SignUp Form</h2>
    
    <input type="text" placeholder="Enter Your Name" v-model="signup.username"><br><br>
    <input type="password" placeholder="enter your password" v-model="signup.password"><br><br>

    <p>Choose Hobbies</p>
    <input type="checkbox" value="cricket" id="cricket" v-model="signup.hobbies">
    <label for="cricket">Cricket</label>
    <input type="checkbox" value="football" id="football" v-model="signup.hobbies">
    <label for="football">Football</label>

     
    <p>Choose Gender</p>
    <input type="radio" value="male" id="male" v-model="signup.gender">
    <label for="male">Male</label>
    <input type="radio" value="female" id="female" v-model="signup.gender">
    <label for="female">Female</label><br><br>

    <button v-on:click="signupUser">SignUp</button>
    </div>

   
    <button v-on:clcik="test">Test</button>



  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    FirstName: String,
    LastName: String,
    title: String,
    html: String,
  },
  data() {
    return {
      show: true,
      users: [
        { id: 1, name: "siddhant", email: "siddhant.kuntal@crestdatasys.com" },
        { id: 2, name: "tuneer", email: "tuneer.upadhaya@crestdatasys.com" },
        { id: 3, name: "akhil", email: "akhil.khatode@crestdatasys.com" },
        { id: 4, name: "akash", email: "akash.gupta@crestdatasys.com" },
        { id: 5, name: "parth", email: "parth.vyas@crestdatasys.com" }
      ],
     disable: false,
     showClass: true,
     bindingMsg: "Hi",

     signup:{
         username:null,
         password:null,
         hobbies:[],
         gender:null
     },

     login:{
        username:null,
        password:null
     }

    };
  },
  methods: {
    changeTitle(event) {
      this.title = event.target.value;
    },
    popMessage() {
      alert("Button Activated");
    },
    ifToggler() {
      this.show = !this.show;
    },
    updateTitle(){
      this.$emit('changeTitle',"Parent Updated")
    },
    signupUser(){
        console.log(this.signup)
    },
    loginData(){
        console.log("kuntal")
    },
    test(){
        alert("testing successful")
    }
  },
};
</script>

<style scoped>
.homestyle{
    color: orange;
}
.display{
    background-color: palegoldenrod;
}
.arrayClass{
    background-color: palevioletred;
}
</style>