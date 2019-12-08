<template>
  <div class="row">
    <div class="col-md-6"> Now you or your loved ones will never forget to take your medicine</div>
    <form class="col-md-6" @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Your email address" />
      <input type="password" v-model="password" placeholder="Your password" />
      <input type="password" v-model="registrationPassword" placeholder="Re-enter password" />
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
}


</style>
(
