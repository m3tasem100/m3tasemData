import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";


import { 
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


import {

getDatabase,
ref,
get

} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";




// Firebase Config

const firebaseConfig = {

  apiKey: "ضع_apiKey",

  authDomain: "ضع_authDomain",

  databaseURL: "ضع_databaseURL",

  projectId: "ضع_projectId",

  storageBucket: "ضع_storageBucket",

  messagingSenderId: "ضع_senderId",

  appId: "ضع_appId"

};



const app =
initializeApp(firebaseConfig);



const auth =
getAuth(app);



const db =
getDatabase(app);






// تسجيل الدخول

window.login =
async function(){


const email =
document
.getElementById("email")
.value;



const password =
document
.getElementById("password")
.value;




try{


const result =
await signInWithEmailAndPassword(
auth,
email,
password
);



const uid =
result.user.uid;



const snapshot =
await get(
ref(db,"users/"+uid)
);



if(!snapshot.exists()){

alert(
"لا يوجد ملف مستخدم"
);

return;

}



const user =
snapshot.val();




// حفظ بيانات المستخدم

localStorage.setItem(
"user",
JSON.stringify({
uid:uid,
...user
})
);





// التوجيه حسب الدور


switch(user.role){


case "Manager":

window.location.href=
"admin.html";

break;



case "Teacher":

window.location.href=
"teacher.html";

break;



case "Head":

window.location.href=
"head.html";

break;



case "Coordinator":

window.location.href=
"coordinator.html";

break;



case "StageManager":

window.location.href=
"stage.html";

break;



default:

alert(
"الدور غير معرف"
);


}




}

catch(error){


alert(
"خطأ في تسجيل الدخول: "
+
error.message
);


}


}









// تسجيل الخروج

window.logout =
async function(){


await signOut(auth);


localStorage.removeItem(
"user"
);



window.location.href=
"index.html";


}









// المستخدم الحالي

export function currentUser(){

return JSON.parse(
localStorage.getItem("user")
);

}









// حماية الصفحات

export function protectPage(roles=[]){



onAuthStateChanged(
auth,
async(user)=>{


if(!user){

window.location.href="index.html";

return;

}



const data =
JSON.parse(
localStorage.getItem("user")
);



if(
roles.length &&
!roles.includes(data.role)
){


alert(
"ليس لديك صلاحية"
);


window.location.href="index.html";


}



}



);



}
