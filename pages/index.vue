<template>
  <div>
    <div>
      <CheckList />
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

