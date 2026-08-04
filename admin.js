////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// ADMIN DASHBOARD CONTROLLER
////////////////////////////////////////////////////



import {

protectPage,
currentUser,
logout

}

from "./auth.js";



import {

db

}

from "./firebase-config.js";



import {

ref,
get

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";







// ================================================
// حماية الصفحة
// ================================================


protectPage([

"Manager"

]);









// ================================================
// بيانات المدير
// ================================================


const user = currentUser();



if(user){


document.getElementById("userInfo").innerHTML =

`
${user.name || ""}
<br>
${user.email}
`;



}






// التاريخ

document.getElementById("date").innerHTML =

new Date().toLocaleDateString("ar-JO");








// ================================================
// تسجيل الخروج
// ================================================


document
.getElementById("logoutBtn")
.onclick=function(){


logout();


};










// ================================================
// تحميل الوحدات
// ================================================


window.loadModule=function(module){



const content =

document.getElementById("content");





switch(module){



case "dashboard":


loadDashboard();


break;





case "users":


loadScriptModule(
"users.js"
);


break;





case "departments":


loadScriptModule(
"departments.js"
);


break;





case "subjects":


loadScriptModule(
"subjects.js"
);


break;





case "grades":


loadScriptModule(
"grades.js"
);


break;





case "plans":


loadScriptModule(
"plans.js"
);


break;





case "distribution":


loadScriptModule(
"distribution.js"
);


break;





case "reports":


loadScriptModule(
"reports.js"
);


break;





case "settings":


loadScriptModule(
"settings.js"
);


break;



}



};











// ================================================
// Dashboard
// ================================================


async function loadDashboard(){



const content =

document.getElementById("content");



content.innerHTML =

`

<h2>

لوحة التحكم

</h2>



<div class="cards">


<div class="card">

<h3>
👥 المستخدمون
</h3>

<h1 id="usersCount">
0
</h1>

</div>




<div class="card">

<h3>
👨‍🏫 المعلمون
</h3>

<h1 id="teachersCount">
0
</h1>

</div>





<div class="card">

<h3>
🏢 الأقسام
</h3>

<h1 id="departmentsCount">
0
</h1>

</div>





<div class="card">

<h3>
📂 الخطط
</h3>

<h1 id="plansCount">
0
</h1>

</div>



</div>

`;





await loadStatistics();



}











// ================================================
// الإحصائيات
// ================================================


async function loadStatistics(){



// المستخدمين


const usersSnap =

await get(

ref(db,"users")

);



let users=0;

let teachers=0;



if(usersSnap.exists()){


const data =
usersSnap.val();



users =

Object.keys(data).length;



Object.values(data)
.forEach(u=>{


if(u.role==="Teacher")

teachers++;



});


}






document
.getElementById("usersCount")
.innerHTML =
users;



document
.getElementById("teachersCount")
.innerHTML =
teachers;







// الأقسام


const depSnap =

await get(

ref(db,"departments")

);



document
.getElementById("departmentsCount")
.innerHTML =

depSnap.exists()

?
Object.keys(depSnap.val()).length

:

0;








// الخطط


const plansSnap =

await get(

ref(db,"plans")

);



document
.getElementById("plansCount")
.innerHTML =

plansSnap.exists()

?
Object.keys(plansSnap.val()).length

:

0;



}









// ================================================
// تحميل ملف الوحدة
// ================================================


function loadScriptModule(file){



const content =

document.getElementById("content");



content.innerHTML =

`

<div class="loader">

جاري تحميل الوحدة...

</div>

`;




const oldScript =

document.getElementById(
"moduleScript"
);



if(oldScript)

oldScript.remove();







const script =

document.createElement(
"script"
);



script.type="module";


script.id="moduleScript";


script.src=file+"?"+Date.now();



document.body.appendChild(script);



}










// فتح الصفحة الرئيسية تلقائياً

loadModule("dashboard");
