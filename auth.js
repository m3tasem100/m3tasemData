// auth.js


import {

auth,

db

}

from "./firebase-config.js";



import {

signInWithEmailAndPassword,

signOut,

onAuthStateChanged,

createUserWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";



import {

ref,

get,

set,

push

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// =================================
// LOGIN
// =================================


export async function login(){


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;



const message =
document.getElementById("message");



try{


const result =
await signInWithEmailAndPassword(
auth,
email,
password
);



const uid =
result.user.uid;



const userRef =
ref(db,"users/"+uid);



const snapshot =
await get(userRef);



if(!snapshot.exists()){


await set(
userRef,
{

name:
result.user.displayName || "New User",

email:
result.user.email,

role:
"Viewer",

active:true

}

);


}



const userSnap =
await get(userRef);



const user =
userSnap.val();



localStorage.setItem(

"user",

JSON.stringify({

uid,

...user

})

);



redirectByRole(user.role);



}

catch(error){

console.error(error);


if(message)

message.innerHTML =
firebaseError(error.code);


}


}



window.login = login;








// =================================
// CREATE USER BY MANAGER
// =================================


export async function createUser(data){



const current =
currentUser();



if(!current || current.role !== "Manager"){

throw new Error(
"ليس لديك صلاحية إنشاء مستخدم"
);

}



const result =
await createUserWithEmailAndPassword(

auth,

data.email,

data.password

);



const uid =
result.user.uid;



await set(

ref(db,"users/"+uid),

{


name:data.name,


email:data.email,


role:data.role,


active:true,


createdAt:
new Date().toISOString()


}

);



return uid;


}







// =================================
// REDIRECT
// =================================


function redirectByRole(role){


switch(role){


case "Manager":

location.href="admin.html";

break;


case "Teacher":

location.href="teacher.html";

break;


case "Head":

location.href="head.html";

break;


case "Coordinator":

location.href="coordinator.html";

break;


case "StageManager":

location.href="stage.html";

break;


default:

location.href="viewer.html";


}


}







// =================================
// LOGOUT
// =================================


export async function logout(){


await signOut(auth);


localStorage.removeItem("user");


location.href="index.html";


}


window.logout=logout;







// =================================
// CURRENT USER
// =================================


export function currentUser(){


const data =
localStorage.getItem("user");


return data
?
JSON.parse(data)
:
null;


}








// =================================
// PROTECT PAGE
// =================================


export function protectPage(roles=[]){


onAuthStateChanged(

auth,

async(user)=>{


if(!user){

location.href="index.html";

return;

}



const data =
currentUser();



if(!data){

location.href="index.html";

return;

}



if(

roles.length > 0 &&

!roles.includes(data.role)

){


alert(
"ليس لديك صلاحية"
);


location.href="index.html";


}



}


);


}








// =================================
// ERRORS
// =================================


function firebaseError(code){


switch(code){


case "auth/email-already-in-use":

return "البريد مستخدم مسبقاً";


case "auth/invalid-email":

return "البريد غير صحيح";


case "auth/weak-password":

return "كلمة المرور ضعيفة";


case "auth/invalid-credential":

return "بيانات الدخول غير صحيحة";


default:

return "حدث خطأ";


}


}
