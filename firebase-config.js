////////////////////////////////////////////////////
// FIREBASE CONFIGURATION
// UCA SCHOOL MANAGEMENT SYSTEM
////////////////////////////////////////////////////



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


apiKey:

"ضع_apiKey_هنا",



authDomain:

"ضع_authDomain_هنا",



databaseURL:

"https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",



projectId:

"YOUR_PROJECT_ID",



storageBucket:

"YOUR_PROJECT_ID.appspot.com",



messagingSenderId:

"ضع_sender_id_هنا",



appId:

"ضع_app_id_هنا"



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
