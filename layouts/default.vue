<template>
  <div class="container">
    <div>
        <nuxt-link to="/signup">SignUp</nuxt-link>
        <nuxt-link to="/login">Login</nuxt-link>
        <button @click.prevent="logout"> logout </button>
    </div>
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods:{
    logout(){
      firebase.auth().signOut()
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>

<style scoped>
 .wrapper{
    margin-top:40px;
  }


</style>>


