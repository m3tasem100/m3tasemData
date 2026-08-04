////////////////////////////////////////////////////
// FIREBASE CONFIGURATION
// UCA SCHOOL MANAGEMENT SYSTEM
////////////////////////////////////////////////////

authDomain:
"m3tasem100.github.io"

import {

initializeApp

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";





import {

getAuth

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";





import {

getDatabase

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";









// ضع بيانات مشروعك من Firebase Console

const firebaseConfig = {

 apiKey: "AIzaSyBWpahddzrX3iffUThUQoo5edxGbi0J7yc",
  authDomain: "uca-pms-8f7b1.firebaseapp.com",
  databaseURL: "https://uca-pms-8f7b1-default-rtdb.firebaseio.com",
  projectId: "uca-pms-8f7b1",
  storageBucket: "uca-pms-8f7b1.firebasestorage.app",
  messagingSenderId: "559264692532",
  appId: "1:559264692532:web:14426f15f058db05458d61",
  measurementId: "G-EDMZHQRGHK"

};









// تشغيل Firebase


const app =

initializeApp(

firebaseConfig

);







// Authentication


export const auth =

getAuth(

app

);







// Realtime Database


export const db =

getDatabase(

app

);
