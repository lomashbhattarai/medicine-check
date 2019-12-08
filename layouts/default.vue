<template>
  <div class="container">
    <div>
        <template v-if="!currentUser[0]">
          <nuxt-link to="/signup"><button class="btn btn-success">SignUp</button></nuxt-link>
          <nuxt-link to="/login"><button class="btn btn-primary">Login</button></nuxt-link>
        </template>
        <button class="btn btn-sm btn-outline-secondary logout"
          v-else
          @click.prevent="logout"> logout
        </button>
    </div>
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapMutations } from 'vuex'

export default {
  created(){
    let vm = this
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        vm.$router.push({
          path:'/login'
        })
      } else {
        this.registerCurrentUser(user)
      }
    })
  },
  methods:{
    ...mapMutations(['registerCurrentUser']),
    logout(){
      firebase.auth().signOut()
    }
  },
  computed:{
    ...mapState({
        currentUser:state => state.currentUser
      })
  },
}
</script>

<style scoped>
.container{
  margin-top: 10px;
}
 .wrapper{
    margin-top:40px;
  }

  .logout{
    margin-right:0px;
  }


</style>>


