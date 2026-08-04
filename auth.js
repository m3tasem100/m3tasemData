// auth.js


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";


import {

getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


import {

getDatabase,
ref,
get

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";




// ===============================
// Firebase Configuration
// ===============================


const firebaseConfig = {


  apiKey: "AIzaSyBWpahddzrX3iffUThUQoo5edxGbi0J7yc",
  authDomain: "uca-pms-8f7b1.firebaseapp.com",
  projectId: "uca-pms-8f7b1",
  storageBucket: "uca-pms-8f7b1.firebasestorage.app",
  messagingSenderId: "559264692532",
  appId: "1:559264692532:web:14426f15f058db05458d61",
  measurementId: "G-EDMZHQRGHK"


};




// Initialize Firebase


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getDatabase(app);




// ===============================
// LOGIN
// ===============================


export async function login(){


const email =
document
.getElementById("email")
.value
.trim();



const password =
document
.getElementById("password")
.value;




const message =
document.getElementById("message");



if(!email || !password){


if(message){

message.innerHTML =
"أدخل البريد الإلكتروني وكلمة المرور";

}

return;

}




try{


const result =
await signInWithEmailAndPassword(

auth,

email,

password

);




const uid =
result.user.uid;




// قراءة بيانات المستخدم


const userSnapshot =
await get(

ref(
db,
"users/"+uid
)

);





if(!userSnapshot.exists()){


message.innerHTML =
"المستخدم غير موجود في قاعدة البيانات";


await signOut(auth);


return;

}





const user =
userSnapshot.val();





// تخزين بيانات المستخدم


localStorage.setItem(

"user",

JSON.stringify({

uid:uid,

...user

})

);






// تحويل حسب الدور


redirectByRole(user.role);



}

catch(error){


console.error(error);


if(message){


message.innerHTML =
getErrorMessage(error.code);


}


}


}






// جعلها متاحة للزر القديم


window.login = login;









// ===============================
// REDIRECT
// ===============================


function redirectByRole(role){



switch(role){


case "Manager":

window.location.href =
"admin.html";

break;



case "Teacher":

window.location.href =
"teacher.html";

break;



case "Head":

window.location.href =
"head.html";

break;



case "Coordinator":

window.location.href =
"coordinator.html";

break;



case "StageManager":

window.location.href =
"stage.html";

break;



case "Viewer":

window.location.href =
"viewer.html";

break;



default:


alert(
"الدور غير معرف: "+role
);


}



}








// ===============================
// LOGOUT
// ===============================


export async function logout(){



await signOut(auth);


localStorage.removeItem(
"user"
);


window.location.href =
"index.html";


}



window.logout = logout;










// ===============================
// CURRENT USER
// ===============================


export function currentUser(){


const user =
localStorage.getItem("user");


return user
?
JSON.parse(user)
:
null;


}









// ===============================
// PAGE PROTECTION
// ===============================


export function protectPage(allowedRoles=[]){



onAuthStateChanged(
auth,
(firebaseUser)=>{


if(!firebaseUser){


window.location.href =
"index.html";


return;


}





const user =
currentUser();



if(!user){


window.location.href =
"index.html";


return;

}




if(

allowedRoles.length > 0

&&

!allowedRoles.includes(user.role)

){


alert(
"ليس لديك صلاحية دخول هذه الصفحة"
);



window.location.href =
"index.html";


}



}


);



}








// ===============================
// FIREBASE ERRORS
// ===============================


function getErrorMessage(code){



switch(code){


case "auth/invalid-email":

return "البريد الإلكتروني غير صحيح";



case "auth/user-not-found":

return "المستخدم غير موجود";



case "auth/wrong-password":

return "كلمة المرور غير صحيحة";



case "auth/invalid-credential":

return "بيانات الدخول غير صحيحة";



default:

return "حدث خطأ أثناء تسجيل الدخول";


}



}
