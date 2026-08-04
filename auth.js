// auth.js


import {

auth,

db

}

from "./firebase-config.js";



import {

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";



import {

ref,

get,

set

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// =================================
// LOGIN
// =================================


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





const userRef =
ref(
db,
"users/"+uid
);



const snapshot =
await get(userRef);



let user;





// المستخدم غير موجود في database

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




await set(

userRef,

user

);



}

else{


user =
snapshot.val();


}





// حفظ بيانات المستخدم


localStorage.setItem(

"user",

JSON.stringify({

uid:uid,

...user

})

);





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



throw error;


}



}






// دعم الزر القديم

window.login = login;









// =================================
// REDIRECT BY ROLE
// =================================


function redirectByRole(role){



switch(role){



case "Manager":

location.href =
"admin.html";

break;



case "Teacher":

location.href =
"teacher.html";

break;



case "Head":

location.href =
"head.html";

break;



case "Coordinator":

location.href =
"coordinator.html";

break;



case "StageManager":

location.href =
"stage.html";

break;



case "Viewer":

location.href =
"viewer.html";

break;



default:


alert(
"الدور غير معرف: "+role
);



}



}









// =================================
// LOGOUT
// =================================


export async function logout(){


await signOut(auth);



localStorage.removeItem(
"user"
);



location.href =
"index.html";


}



window.logout = logout;









// =================================
// CURRENT USER
// =================================


export function currentUser(){



const data =
localStorage.getItem(
"user"
);



return data
?
JSON.parse(data)
:
null;


}









// =================================
// PAGE PROTECTION
// =================================


export function protectPage(
allowedRoles=[]
){



onAuthStateChanged(

auth,

(firebaseUser)=>{



if(!firebaseUser){


location.href =
"index.html";


return;


}





const user =
currentUser();



if(!user){


location.href =
"index.html";


return;


}





if(

allowedRoles.length > 0

&&

!allowedRoles.includes(user.role)

){


alert(
"ليس لديك صلاحية"
);



location.href =
"index.html";


}



}


);



}









// =================================
// FIREBASE ERRORS
// =================================


function firebaseError(code){



switch(code){


case "auth/invalid-email":

return "البريد الإلكتروني غير صحيح";



case "auth/user-not-found":

return "المستخدم غير موجود في Authentication";



case "auth/wrong-password":

return "كلمة المرور غير صحيحة";



case "auth/invalid-credential":

return "بيانات الدخول غير صحيحة";



case "auth/too-many-requests":

return "تم إيقاف المحاولة مؤقتاً";



default:

return "حدث خطأ أثناء تسجيل الدخول";



}



}
