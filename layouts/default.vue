<template>
  <div class="container">
    <div>
        <button class="btn btn-sm btn-outline-secondary logout"
          v-if="currentUser[0]"
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
        this.registerCurrentUser(user)
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


