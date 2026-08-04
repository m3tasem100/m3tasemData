////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// HEAD OF DEPARTMENT DASHBOARD
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
get,
set

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// =======================================
// حماية الصفحة
// =======================================


protectPage([

"Head"

]);







const user = currentUser();





if(user){


document

.getElementById("headInfo")

.innerHTML =

`

${user.name || ""}

<br>

${user.email || ""}

`;



}








// =======================================
// تسجيل الخروج
// =======================================


document

.getElementById("logoutBtn")

.onclick=function(){


logout();


};









// =======================================
// تحميل الوحدات
// =======================================


window.loadHeadModule=function(module){



switch(module){



case "home":

loadHome();

break;



case "teachers":

loadTeachers();

break;



case "plans":

loadPlans();

break;



case "weeks":

loadWeeks();

break;



case "evaluation":

loadEvaluation();

break;



case "reports":

loadReports();

break;



}



};











// =======================================
// الصفحة الرئيسية
// =======================================


function loadHome(){



content.innerHTML=


`

<h2>

مرحبا بك رئيس القسم

</h2>



<div class="cards">


<div class="card">


<h3>
👨‍🏫 المعلمون
</h3>


<p>
متابعة معلمي القسم
</p>


</div>





<div class="card">


<h3>
📂 الخطط
</h3>


<p>
مراجعة الخطط الدراسية
</p>


</div>





<div class="card">


<h3>
⭐ التقييم
</h3>


<p>
تقييم أداء المعلمين
</p>


</div>


</div>


`;



}









// =======================================
// معلمو القسم
// =======================================


async function loadTeachers(){



content.innerHTML=

`

<h2>
👨‍🏫 معلمو القسم
</h2>


<div id="teachersList">

جاري التحميل...

</div>

`;






const headSnap =

await get(

ref(

db,

`users/${user.uid}`

)

);






if(!headSnap.exists())

return;






const headData =

headSnap.val();







const departmentId =

headData.departmentId;







const usersSnap =

await get(

ref(db,"users")

);








const container =

document

.getElementById(
"teachersList"
);







let html="";







if(usersSnap.exists()){


const users =

usersSnap.val();






Object.entries(users)

.forEach(([uid,u])=>{





if(

u.role==="Teacher"

&&

u.departmentId===departmentId

){



html +=


`

<div class="card">


<h3>

${u.name}

</h3>


<p>

${u.email}

</p>



<button

class="btn btn-primary"

onclick="viewTeacher('${uid}')">

عرض التفاصيل

</button>



</div>



`;



}



});



}







if(html==="")

html="لا يوجد معلمون";






container.innerHTML=html;



}











// =======================================
// عرض معلم
// =======================================


window.viewTeacher=function(uid){



alert(

"سيتم فتح ملف المعلم: "

+uid

);



}












// =======================================
// الخطط
// =======================================


async function loadPlans(){



content.innerHTML=

`

<h2>

📂 خطط القسم

</h2>



<div class="card">


سيتم عرض خطط معلمي القسم هنا


</div>

`;



}











// =======================================
// متابعة الأسابيع
// =======================================


async function loadWeeks(){



content.innerHTML=

`

<h2>

📅 متابعة الأسابيع

</h2>



<div class="card">


عرض الأسابيع غير المعتمدة من المعلمين


</div>


`;



}











// =======================================
// التقييم
// =======================================


function loadEvaluation(){



content.innerHTML=

`

<h2>

⭐ تقييم المعلمين

</h2>


<div class="card">


سيتم إضافة نموذج تقييم رئيس القسم هنا


</div>


`;



}









// =======================================
// التقارير
// =======================================


function loadReports(){



content.innerHTML=

`

<h2>

📊 التقارير

</h2>


<div class="card">


تقارير القسم


</div>


`;



}









// تشغيل الصفحة

loadHeadModule("home");
