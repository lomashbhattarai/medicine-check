<template>
  <div class="row">
    <div class="col-md-6">
      Now you or your loved ones will never forget to take their medicine. If you don't have
      an account yet, click <nuxt-link to="/signup">SignUp</nuxt-link>

    </div>
    <form class="col-md-6" @submit.prevent="login">
      <input class="form-control" autocomplete="on" type="email" v-model="email" placeholder="Your email address" />
      <div class="form-group">
        <input class="form-control" :type="passwordType" v-model="password" placeholder="Your password" />
        <span class="field-icon"
          v-if="passwordType=='password' && password"
          @click="passwordType='text'">show
        </span>

        <span class="field-icon"
          v-if="passwordType=='text' && password" @click="passwordType='password'">hide
        </span>
      </div>
      <button class="btn btn-success">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  asyncData(){
    return {
      email:'',
      password:'',
      passwordType:'password'
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$router.push({
          path:'/'
        })
      }
    })
  },
  methods:{
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
    }
  }
}
</script>
<style scoped>
input {
  display: block;
  margin-bottom:5px;
}
.field-icon{
  float: right;
  margin-right: 10px;
  margin-top: -35px;
  position: relative;
  z-index: 2;
  cursor: pointer;
  font-size: 1rem;
  color:blue;
}
</style>
