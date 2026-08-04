// auth.js


import {

auth,
db,
app

}

from "./firebase-config.js";



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
