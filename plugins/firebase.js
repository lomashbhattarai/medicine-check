import firebase from 'firebase/app'
import 'firebase/firestore'

if(!firebase.apps.length){
  const config = {
    apiKey: "AIzaSyAnpv1gGJUE4ptj6M1lOMfsFX6-CQZwUe0",
    authDomain: "checklist-45554.firebaseapp.com",
    databaseURL: "https://checklist-45554.firebaseio.com",
    projectId: "checklist-45554",
    storageBucket: "checklist-45554.appspot.com",
    messagingSenderId: "1047773734728",
    appId: "1:1047773734728:web:32cd41f59a5b25adc8357d",
    measurementId: "G-JWKKWHZLJ2"
  }
  firebase.initializeApp(config)
  const settings = {timestampsInSnapshots:true}
  firebase.firestore().settings(settings)
}

const fireDb = firebase.firestore()
export {fireDb}

