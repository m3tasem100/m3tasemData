////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// COORDINATOR DASHBOARD
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
set,
update

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





// =======================================
// حماية الصفحة
// =======================================


protectPage([

"Coordinator"

]);





const user = currentUser();





if(user){


document

.getElementById("coordinatorInfo")

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
// التنقل
// =======================================


window.loadCoordinatorModule=function(module){



switch(module){



case "home":

loadHome();

break;



case "departments":

loadDepartments();

break;



case "teachers":

loadTeachers();

break;



case "plans":

loadPlans();

break;



case "headEvaluation":

loadHeadEvaluation();

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
// الرئيسية
// =======================================


function loadHome(){



content.innerHTML =

`

<h2>
مرحبا بك في لوحة المنسق
</h2>



<div class="cards">


<div class="card">

<h3>
🏢 الأقسام
</h3>

<p>
متابعة الأقسام
</p>

</div>





<div class="card">

<h3>
👨‍🏫 المعلمون
</h3>

<p>
متابعة الأداء
</p>

</div>





<div class="card">

<h3>
⭐ التقييمات
</h3>

<p>
إدارة تقييم المنسق
</p>

</div>


</div>


`;



}









// =======================================
// الأقسام
// =======================================


async function loadDepartments(){



content.innerHTML=

`

<h2>
🏢 الأقسام
</h2>


<div id="departmentList">

تحميل...

</div>

`;





const snap =

await get(

ref(db,"departments")

);





let html="";





if(snap.exists()){



Object.entries(snap.val())

.forEach(([id,dep])=>{



html +=


`

<div class="card">


<h3>

${dep.name}

</h3>


<button

class="btn btn-primary"

onclick="viewDepartment('${id}')">


عرض


</button>



</div>


`;



});



}

else{


html="لا توجد أقسام";

}




departmentList.innerHTML=html;



}









window.viewDepartment=function(id){


alert(

"القسم: "+id

);


}









// =======================================
// المعلمون
// =======================================


async function loadTeachers(){



content.innerHTML=

`

<h2>
👨‍🏫 المعلمون
</h2>


<div id="teachersList">

تحميل...

</div>

`;







const snap =

await get(

ref(db,"users")

);







let html="";







if(snap.exists()){


Object.entries(snap.val())

.forEach(([uid,u])=>{



if(u.role==="Teacher"){



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

class="btn btn-warning"

onclick="viewTeacherEvaluation('${uid}')">


التقييم


</button>



</div>



`;



}



});



}





teachersList.innerHTML=

html || "لا يوجد معلمون";



}









// =======================================
// رؤية تقييم رئيس القسم
// =======================================


window.viewTeacherEvaluation=

async function(uid){



const snap =

await get(

ref(

db,

`evaluations/${uid}/head`

)

);






if(!snap.exists()){


alert(
"لا يوجد تقييم رئيس قسم"
);


return;


}






alert(

`

تقييم رئيس القسم:

${snap.val().score || 0}

`

);



}









// =======================================
// الخطط
// =======================================


function loadPlans(){



content.innerHTML=

`

<h2>
📂 الخطط
</h2>



<div class="card">

متابعة تنفيذ الخطط الدراسية

</div>


`;



}









// =======================================
// تقييم المنسق
// =======================================


function loadEvaluation(){



content.innerHTML=

`

<h2>
⭐ تقييم المنسق
</h2>



<div class="card">


<label>
درجة التقييم
</label>


<input id="coordScore" type="number">


<button

class="btn btn-success"

onclick="saveCoordinatorEvaluation()">

حفظ


</button>


</div>


`;



}









// =======================================
// حفظ تقييم المنسق
// =======================================


window.saveCoordinatorEvaluation=

async function(){



const score =

Number(

document

.getElementById("coordScore")

.value

);





await set(

ref(

db,

`evaluations/${user.uid}/coordinator`

),

{


score:score,


evaluator:user.uid,


date:

Date.now()


}

);






alert(
"تم حفظ التقييم"
);



}









// =======================================
// تقييم رئيس القسم
// =======================================


function loadHeadEvaluation(){



content.innerHTML=

`

<h2>

⭐ تقييم رئيس القسم

</h2>



<div class="card">


التقييم ظاهر للقراءة فقط

ولا يمكن تعديله


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

تقارير الأقسام والمعلمين

</div>


`;



}









// تشغيل البداية

loadCoordinatorModule("home");
