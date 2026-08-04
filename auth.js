////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// AUTH SYSTEM
////////////////////////////////////////////////////


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







// =====================================
// LOGIN
// =====================================


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

document.getElementById(
"message"
);





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









// قراءة المستخدم من Database


const userSnap =

await get(

ref(

db,

"users/"+uid

)

);







if(!userSnap.exists()){



await signOut(auth);



throw new Error(

"USER_NOT_FOUND_DATABASE"

);



}







const user =

userSnap.val();







// فحص الحالة


if(user.active === false){



await signOut(auth);



throw new Error(

"USER_DISABLED"

);



}







// حفظ الجلسة


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



message.innerHTML=

firebaseError(error);



}




}





}









window.login=login;









// =====================================
// REDIRECT
// =====================================


function redirectByRole(role){



switch(role){



case "Manager":



location.href=

"admin.html";


break;





case "Teacher":



location.href=

"teacher.html";


break;





case "Head":



location.href=

"head.html";


break;





case "Coordinator":



location.href=

"coordinator.html";


break;





case "StageManager":



location.href=

"stage.html";


break;





case "Viewer":



location.href=

"viewer.html";


break;





default:



alert(

"الدور غير معرف"

);



}



}









// =====================================
// LOGOUT
// =====================================


export async function logout(){



await signOut(auth);



localStorage.removeItem(

"user"

);



location.href=

"index.html";



}



window.logout=logout;









// =====================================
// CURRENT USER
// =====================================


export function currentUser(){



const data=

localStorage.getItem(

"user"

);





return data

?

JSON.parse(data)

:

null;



}









// =====================================
// PAGE PROTECTION
// =====================================


export function protectPage(

allowedRoles=[]

){





onAuthStateChanged(

auth,

async(firebaseUser)=>{





if(!firebaseUser){



location.href=

"index.html";


return;


}







const storedUser=

currentUser();







if(!storedUser){



location.href=

"index.html";


return;


}








if(

allowedRoles.length

&&

!

allowedRoles.includes(

storedUser.role

)

){



alert(

"ليس لديك صلاحية الدخول"

);



location.href=

"index.html";


return;


}







}



);



}









// =====================================
// ERROR MESSAGES
// =====================================


function firebaseError(error){



switch(error.message){





case "USER_NOT_FOUND_DATABASE":



return "المستخدم موجود في Authentication لكنه غير موجود في قاعدة البيانات";







case "USER_DISABLED":



return "تم تعطيل هذا المستخدم";







case "auth/invalid-email":



return "البريد الإلكتروني غير صحيح";







case "auth/invalid-credential":



return "البريد أو كلمة المرور غير صحيحة";







case "auth/too-many-requests":



return "تم إيقاف المحاولة مؤقتاً";







default:



return "حدث خطأ أثناء تسجيل الدخول";



}



}
