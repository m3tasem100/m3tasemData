// auth.js


import {

auth,
db,
app

}

from "./firebase-// auth.js


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
get

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





// قراءة بيانات المستخدم

const userSnapshot =
await get(

ref(
db,
"users/"+uid
)

);





if(!userSnapshot.exists()){


throw new Error(
"المستخدم موجود في Authentication لكنه غير موجود في قاعدة البيانات"
);


}





const user =
userSnapshot.val();





if(user.active === false){


throw new Error(
"هذا المستخدم غير مفعل"
);


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
translateError(error.message);

}



}



}



// دعم الزر في index.html

window.login = login;









// =================================
// REDIRECT حسب الدور
// =================================


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









// =================================
// LOGOUT
// =================================


export async function logout(){


try{


await signOut(auth);


localStorage.removeItem(
"user"
);



window.location.href =
"index.html";


}

catch(error){


console.error(error);


}


}



window.logout =
logout;









// =================================
// CURRENT USER
// =================================


export function currentUser(){



const data =
localStorage.getItem(
"user"
);



if(!data)

return null;



return JSON.parse(data);


}









// =================================
// حماية الصفحات
// =================================


export function protectPage(
allowedRoles=[]
){



onAuthStateChanged(

auth,

async(user)=>{



if(!user){


window.location.href =
"index.html";


return;


}






const current =
currentUser();





if(!current){


window.location.href =
"index.html";


return;


}







if(

allowedRoles.length > 0 &&

!allowedRoles.includes(
current.role
)

){



alert(
"ليس لديك صلاحية للدخول"
);



window.location.href =
"index.html";



}




}

);



}









// =================================
// رسائل الخطأ
// =================================


function translateError(error){



if(
error.includes(
"auth/invalid-credential"
)
)

return "البريد أو كلمة المرور غير صحيحة";




if(
error.includes(
"auth/user-not-found"
)
)

return "المستخدم غير موجود";




if(
error.includes(
"auth/wrong-password"
)
)

return "كلمة المرور غير صحيحة";




if(
error.includes(
"Authentication"
)
)

return error;




if(
error.includes(
"غير مفعل"
)
)

return error;




return "حدث خطأ أثناء تسجيل الدخول";



}config.js";



import {

initializeApp,
deleteApp

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";



import {

getAuth,
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
update

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// =============================
// LOGIN
// =============================


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



const snap =
await get(
ref(db,"users/"+uid)
);



if(!snap.exists()){

throw new Error(
"المستخدم غير موجود في قاعدة البيانات"
);

}



const user=snap.val();



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


console.log(error);


message.innerHTML=
error.message;


}


}



window.login=login;








// =============================
// CREATE USER WITHOUT LOGOUT
// =============================


export async function createUser(data){



const current =
currentUser();



if(!current ||
current.role!=="Manager"){


throw new Error(
"ليس لديك صلاحية"
);


}



// إنشاء تطبيق Firebase مؤقت


const secondaryApp =
initializeApp(

app.options,

"Secondary"

);



const secondaryAuth =
getAuth(secondaryApp);





try{


// إنشاء المستخدم


const result =
await createUserWithEmailAndPassword(

secondaryAuth,

data.email,

data.password

);



const uid =
result.user.uid;





// حفظ البيانات


await set(

ref(db,"users/"+uid),

{

name:data.name,

email:data.email,

role:data.role,

active:true,

createdAt:
Date.now()

}

);





await deleteApp(
secondaryApp
);



return uid;


}

catch(error){


await deleteApp(
secondaryApp
);


throw error;


}



}









// =============================
// LOGOUT
// =============================


export async function logout(){


await signOut(auth);


localStorage.removeItem("user");


location.href="index.html";


}


window.logout=logout;









// =============================
// ROLE REDIRECT
// =============================


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









// =============================
// CURRENT USER
// =============================


export function currentUser(){


const data =
localStorage.getItem("user");


return data
?
JSON.parse(data)
:
null;


}









// =============================
// PROTECTION
// =============================


export function protectPage(roles=[]){


onAuthStateChanged(

auth,

async(user)=>{


if(!user){

location.href="index.html";

return;

}



const data=currentUser();



if(!data){

location.href="index.html";

return;

}



if(

roles.length>0 &&

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
