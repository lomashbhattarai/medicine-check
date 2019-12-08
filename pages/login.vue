<template>
  <div class="row">
    <div class="col-md-6"> Now you or your loved ones will never forget to take your medicine</div>
    <form class="col-md-6" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Your email address" />
      <input type="password" v-model="password" placeholder="Your password" />
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
      password:''
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
