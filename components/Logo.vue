<template>
<div class ="row">
  <div class ="col-xs-12 col-sm-12 col-md-6">
    <h5 class="text-success" v-if="checks[day]">
      <strong>{{ currentUser.email.split('@')[0] }} </strong>,
      You have already taken your medicine today
    </h5>
    <h5 class="text-danger" v-else> <strong v-if="currentUser">{{ currentUser.email.split('@')[0] }} </strong>,Did you take your medicine?</h5>
    <img v-if="checks[day]" class="tick" src="../assets/tick2.jpg" />
    <h5><strong>Date: </strong>  {{ date.toString().slice(0,15) }}</h5>
  </div>
  <div class="col-xs-12 col-sm-12 col-md-6">
    <h5>This Week </h5>
    <form action="" method="get">
        <div v-for="(dayName,index) in weekDays"
          class="checklist"
          :key="index"
          :class="{'checklist-today': index == day}">
          <input type="checkbox" name="vehicle"
              :disabled="(index != day)"
              v-model="checks[index]"
            @click ="writeToFirestore(index,!checks[index])">
          <label class="text-primary" :class="{'text-success': checks[index]}" >{{ dayName }}</label> <br>
        </div>

    </form>
  </div>
</div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
import firebase from 'firebase'
export default {
  data(){
    return {
      weekDays:['Sunday','Monday','Tudesday','wednusday','Thursday','Friday','Saturday'],
      checks:[false,false,false,false,false,false,false],
      today: new Date(),
      writeSuccessful: false,
      entries:[],
      currentUser:''
    }
  },
  computed:{
    date(){
      return this.today
    },
    day(){
      return this.today.getDay()
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user
      if(user){
        this.getEntries()
      }
    })
  },
  methods: {
    async writeToFirestore(day,bool){
      let xDate = this.getweekDate(day)
      let docId = xDate.getFullYear() + '-' + xDate.getMonth() + '-'  + xDate.getDay()
      const ref = fireDb.collection("entries").doc(docId)
      const document = {
          day: day,
          medicineTakenOn: xDate,
          tookMedicine: bool,
          userId: this.currentUser.email,
          userName: this.currentUser.email,
          createdAt: this.today
      }
      try {
        await ref.set(document)
      } catch(e){
        console.error(e)
      }
      this.writeSuccessful = true
    },
    async getEntries(){
      let vm = this
      console.log(vm.currentUser.email)
      fireDb.collection('entries').where('userId', '==', vm.currentUser.email)
        .orderBy('createdAt')
        .limit(7)
        .get()
        .then((querySnapshot)=>{
           querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            vm.entries.push(doc.data());
          });
          this.checks = this.checks.map((check,index)=>{
              return this.getValue(index)
          })
          console.log(vm.entries)
        })

    },
    getweekDate(value){
      let subtract = this.day - value
      let xDate = new Date();
      xDate.setDate(xDate.getDate()-subtract);
      return xDate
    },
    getValue(value){
      let x = false
      let xDate = this.getweekDate(value)
      this.entries.map((entry)=> {
        console.log(entry.medicineTakenOn.toDate(),xDate)
        if(this.sameDay(entry.medicineTakenOn.toDate(),xDate)){
          console.log("yes same day")
          x = entry.tookMedicine
          return;
        }
      })
      return x

      return true
    },
    sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    },
  }
}

</script>
<style scoped>

  .checklist{
    font-size: 20px;
    padding: 5px;
    margin-bottom: 3px;
  }


  input[type="checkbox"]{
    border-radius: 2px;
    width: 30px;
    height: 30px;
    float:right;
  }

  .checklist-today {
    display: block;
    font-size: 40px;
    color:red;
  }

  .edit{
   color: blue;
   font-size: 10px;
   display: block;
   float: right;
   cursor: pointer;
  }


  .tick {
    height: 100px;
  }

  .col-xs-12 .col-sm-12 .col-md-6{
    height: 40%;
  }



</style>
