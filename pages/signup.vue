<template>
  <div class="row">
    <div class="col-md-6"> Now you or your loved ones will never forget to take your medicine
      If you already have
      an account click <nuxt-link to="/login">LogIn</nuxt-link>
    </div>
    <form class="col-md-6" @submit.prevent="register">
      <input class="form-control" type="email" v-model="email" placeholder="Your email address" />
      <input class="form-control" type="password" v-model="password" placeholder="Your password" />
      <input class="form-control" type="password" v-model="registrationPassword" placeholder="Re-enter password" />
      <button class="btn btn-success">Register</button>
    </form>
  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import firebase from 'firebase'
export default {
  asyncData(){
    return {
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: ''
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      this.currentUser(user)
      this.authenticatedUser = user})
  },
  watch:{
    authenticatedUser(){
      if(this.authenticatedUser){
        this.$router.push({
        path: '/'
      })
      }

    }
  },
  methods:{
    ...mapMutations['currentUser'],
    register(){
      if(this.password === this.registrationPassword){
        firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
      } else {
        //
      }
    }
  }

}
</script>

<style scoped>

input {
  display: block;
  margin-bottom: 5px;
}


</style>
(
