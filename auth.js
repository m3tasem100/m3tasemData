// ======================================
// auth.js
// نظام المصادقة والصلاحيات
// ======================================


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
child

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// ======================================
// Firebase Config
// ======================================


const firebaseConfig = {


apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

databaseURL:
"https://YOUR_PROJECT-default-rtdb.firebaseio.com",

projectId:
"YOUR_PROJECT",

storageBucket:
"YOUR_PROJECT.appspot.com",

messagingSenderId:
"YOUR_SENDER_ID",

appId:
"YOUR_APP_ID"


};




// تشغيل Firebase

const app =
initializeApp(firebaseConfig);



const auth =
getAuth(app);



const db =
getDatabase(app);




// ======================================
// الصفحات حسب الدور
// ======================================


const rolePages = {


Manager:
"admin.html",


Admin:
"admin.html",


Head:
"head.html",


Coordinator:
"coordinator.html",


StageManager:
"stage.html",


Teacher:
"teacher.html",


Viewer:
"viewer.html"


};




// ======================================
// تسجيل الدخول
// ======================================


export async function login(email,password){


try{


const result =
await signInWithEmailAndPassword(
auth,
email,
password
);



const user =
result.user;



const userData =
await getUserData(user.uid);



if(!userData){


throw new Error(
"لا يوجد ملف مستخدم"
);


}



localStorage.setItem(

"currentUser",

JSON.stringify({

uid:user.uid,

...userData

})

);



redirectByRole(
userData.role
);



}

catch(error){


console.error(error);



throw error;


}


}









// ======================================
// قراءة بيانات المستخدم
// ======================================


export async function getUserData(uid){


const snapshot =
await get(

child(
ref(db),
"users/"+uid
)

);



if(snapshot.exists()){


return snapshot.val();


}


return null;


}










// ======================================
// إعادة التوجيه حسب الدور
// ======================================


export function redirectByRole(role){


if(rolePages[role]){


window.location.href =
rolePages[role];


}

else{


alert(
"لا يوجد صلاحية مرتبطة بهذا الدور"
);


signOut(auth);


}


}









// ======================================
// تسجيل الخروج
// ======================================


export async function logout(){


await signOut(auth);


localStorage.removeItem(
"currentUser"
);



window.location.href =
"login.html";


}









// ======================================
// حماية الصفحات
// ======================================


export function protectPage(allowedRoles=[]){



onAuthStateChanged(
auth,
async(user)=>{


// غير مسجل

if(!user){


window.location.href =
"login.html";


return;


}




const userData =
await getUserData(
user.uid
);



if(!userData){


await logout();


return;


}




localStorage.setItem(

"currentUser",

JSON.stringify({

uid:user.uid,

...userData

})

);





// إذا لم تحدد أدوار
// يسمح للجميع المسجلين


if(
allowedRoles.length===0
)
return;






// التحقق من الدور


if(
!allowedRoles.includes(
userData.role
)

){


alert(
"ليس لديك صلاحية دخول هذه الصفحة"
);



window.location.href =
rolePages[userData.role]
||
"home.html";



return;


}



});


}









// ======================================
// الحصول على المستخدم الحالي
// ======================================


export function currentUser(){


let user =
localStorage.getItem(
"currentUser"
);



return user
?
JSON.parse(user)
:
null;


}






// ======================================
// مراقبة حالة الدخول
// ======================================


export function watchAuth(callback){


onAuthStateChanged(
auth,
callback
);


}