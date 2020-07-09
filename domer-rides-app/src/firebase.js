import firebase from "firebase/app"; 
import "firebase/auth";
import "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyCcY16SbaHiUw7lQWavmDilZTVKyEVOLUQ",
    authDomain: "project1-26789.firebaseapp.com",
    databaseURL: "https://project1-26789.firebaseio.com",
    projectId: "project1-26789",
    storageBucket: "project1-26789.appspot.com",
    messagingSenderId: "672362570199",
    appId: "1:672362570199:web:adfd767379188cda25ab92"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore(); 

export default firebase; 