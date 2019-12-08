<template>
  <div class="background-image" >
    <div>
      <CheckList />
      <div class="links">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CheckList from '~/components/CheckList.vue'
export default {
  name:'Index',
  components: {
    CheckList
  },
  data(){
    return {
      x:''
    }

  },
  computed:{
    ...mapState({
        currentUser:state => state.currentUser
      })
  },
  watch:{
    currentUser(){
      if(!this.currentUser){
        this.$router.push({
          path:'/login'
        })
      }
    }
  }

}
</script>

<style>


.background-image {
    /* background-image: url('../assets/medicine.jpg') */
  }
</style>
