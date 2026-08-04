////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// TEACHER DASHBOARD
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







// =======================================
// حماية الصفحة
// =======================================


protectPage([

"Teacher"

]);







const user = currentUser();






const content =

document.getElementById(
"content"
);








document

.getElementById("logoutBtn")

.onclick = logout;









let teacherData={};









// =======================================
// تحميل بيانات المعلم
// =======================================


async function loadTeacher(){



const snap =

await get(

ref(

db,

`users/${user.uid}`

)

);







if(!snap.exists()){


alert(
"بيانات المعلم غير موجودة"
);


return;


}







teacherData = snap.val();






document

.getElementById("teacherInfo")

.innerHTML =


`

${teacherData.name}

<br>

${teacherData.email}

`;







loadHome();



}











// =======================================
// القائمة
// =======================================


window.loadTeacherModule=function(module){



switch(module){



case "home":

loadHome();

break;



case "plans":

loadPlans();

break;



case "weeks":

loadWeeks();

break;



case "reports":

loadReports();

break;



}



};









// =======================================
// الرئيسية
// =======================================


function loadHome(){



content.innerHTML=

`

<h2>
مرحبا ${teacherData.name}
</h2>



<div class="cards">


<div class="card">

<h3>
📚 المواد
</h3>

<p>

${

Object.keys(

teacherData.subjects || {}

).length

}

</p>

</div>





<div class="card">

<h3>
🎓 الصفوف
</h3>


<p>

${

Object.keys(

teacherData.grades || {}

).length

}

</p>


</div>



</div>


`;



}









// =======================================
// الخطط الخاصة بالمعلم
// =======================================


async function loadPlans(){



content.innerHTML=

`

<h2>
📂 خططي الدراسية
</h2>


<div id="plans">

تحميل...

</div>

`;






const container=

document.getElementById(
"plans"
);






let html="";






const subjects =

teacherData.subjects || {};





const grades =

teacherData.grades || {};









for(const subjectId of Object.keys(subjects)){





for(const gradeId of Object.keys(grades)){





const snap =

await get(

ref(

db,

`weeklyPlans/2025-2026/semester1/${gradeId}/${subjectId}`

)

);







if(snap.exists()){



html +=


`

<div class="card">


<h3>

المادة: ${subjectId}

</h3>


<h4>

الصف: ${gradeId}

</h4>


<p>

عدد الأهداف:

${

Object.keys(

snap.val()

).length

}

</p>


</div>


`;



}





}



}








container.innerHTML =

html || "لا توجد خطط";



}









// =======================================
// الأسابيع
// =======================================


function loadWeeks(){



content.innerHTML=

`

<h2>
📅 الأسابيع

</h2>



<div class="card">

متابعة الأسابيع الخاصة بك

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

تقارير أداء المعلم

</div>


`;



}









loadTeacher();
