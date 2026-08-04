// firebase-config.js


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";



import { 

getAuth

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";



import {

getDatabase

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";




// ضع بيانات مشروعك هنا

const firebaseConfig = {


apiKey: "YOUR_API_KEY",


authDomain: "YOUR_PROJECT.firebaseapp.com",


databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",


projectId: "YOUR_PROJECT_ID",


storageBucket: "YOUR_PROJECT.appspot.com",


messagingSenderId: "YOUR_SENDER_ID",


appId: "YOUR_APP_ID"


};




// Initialize Firebase


const app = initializeApp(firebaseConfig);



const auth = getAuth(app);


const db = getDatabase(app);



export {

app,

auth,

db

};
