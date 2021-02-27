import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
 const firebaseConfig = {
    apiKey: "AIzaSyACR3XaRwul5b8w4MdWAhTPGcJeEEaVUI8",
    authDomain: "tutor-75012.firebaseapp.com",
    projectId: "tutor-75012",
    storageBucket: "tutor-75012.appspot.com",
    messagingSenderId: "1035514338082",
    appId: "1:1035514338082:web:2ed74f73a01c84e757a37b",
    measurementId: "G-Q6N6Y1LHFE"
  }
 firebase.initializeApp(firebaseConfig)
  export const auth = firebase.auth()
  export const store = firebase.firestore()
  export const fieldValue = firebase.firestore.FieldValue
  export const storage = firebase.storage()
  export const timeStamp = firebase.firestore.Timestamp