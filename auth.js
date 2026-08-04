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
get,
set

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";




// ==========================
// Firebase Config
// ضع بيانات مشروعك هنا
// ==========================


const firebaseConfig = {

apiKey: "ضع_apiKey",

authDomain: "ضع_authDomain",

databaseURL: "ضع_databaseURL",

projectId: "ضع_projectId",

storageBucket: "ضع_storageBucket",

messagingSenderId: "ضع_senderId",

appId: "ضع_appId"

};




// Initialize

const app =
initializeApp(firebaseConfig);


const auth =
getAuth(app);


const db =
getDatabase(app);





// ==========================
// Login
// ==========================


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



try{


const result =
await signInWithEmailAndPassword(

auth,

email,

password

);



const firebaseUser =
result.user;



const uid =
firebaseUser.uid;



console.log(
"LOGIN UID:",
uid
);





// قراءة بيانات المستخدم

const userRef =
ref(
db,
"users/"+uid
);



const snapshot =
await get(userRef);



let user;





// إذا لم يكن موجودًا

if(!snapshot.exists()){



user={

name:
firebaseUser.displayName || "New User",

email:
firebaseUser.email,

role:
"Viewer",

active:true

};




// إنشاء سجل تلقائي

await set(

userRef,

user

);



}

else{


user =
snapshot.val();


}





// تخزين المستخدم


localStorage.setItem(

"user",

JSON.stringify({

uid:uid,

...user

})

);





// تحويل حسب الدور


redirectByRole(
user.role
);



}

catch(error){


console.error(error);


if(message){

message.innerHTML =
firebaseError(error.code);

}


}



}





// جعلها متاحة للزر القديم

window.login = login;








// ==========================
// Redirect By Role
// ==========================


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










// ==========================
// Logout
// ==========================


export async function logout(){


await signOut(auth);


localStorage.removeItem(
"user"
);



window.location.href =
"index.html";


}


window.logout = logout;









// ==========================
// Current User
// ==========================


export function currentUser(){


const user =
localStorage.getItem(
"user"
);



if(!user)

return null;



return JSON.parse(user);


}









// ==========================
// Protect Pages
// ==========================


export function protectPage(
allowedRoles=[]
){



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









// ==========================
// Firebase Error Messages
// ==========================


function firebaseError(code){



switch(code){


case "auth/invalid-email":

return "البريد الإلكتروني غير صحيح";



case "auth/user-not-found":

return "المستخدم غير موجود";



case "auth/wrong-password":

return "كلمة المرور غير صحيحة";



case "auth/invalid-credential":

return "البريد أو كلمة المرور غير صحيحة";



case "auth/too-many-requests":

return "تم إيقاف المحاولة مؤقتًا بسبب كثرة المحاولات";


default:

return "حدث خطأ أثناء تسجيل الدخول";


}



}
