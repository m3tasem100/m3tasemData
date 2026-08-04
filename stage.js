////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// STAGE MANAGER DASHBOARD
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

"StageManager"

]);





const user = currentUser();





if(user){


document

.getElementById("stageInfo")

.innerHTML =

`

${user.name || ""}

<br>

${user.email || ""}

`;



}









// =======================================
// Logout
// =======================================


document

.getElementById("logoutBtn")

.onclick=function(){


logout();


};









// =======================================
// Navigation
// =======================================


window.loadStageModule=function(module){



switch(module){



case "home":

loadHome();

break;



case "teachers":

loadTeachers();

break;



case "evaluations":

loadEvaluations();

break;



case "final":

loadFinal();

break;



case "reports":

loadReports();

break;



}



};









// =======================================
// Home
// =======================================


function loadHome(){



content.innerHTML =

`

<h2>

مرحبا بك مدير المرحلة

</h2>



<div class="cards">


<div class="card">

<h3>
👨‍🏫 المعلمون
</h3>

<p>
متابعة أداء المعلمين
</p>

</div>





<div class="card">

<h3>
⭐ التقييمات
</h3>

<p>
مراجعة التقييم النهائي
</p>

</div>





<div class="card">

<h3>
📊 التقارير
</h3>

<p>
تقارير المرحلة
</p>

</div>


</div>


`;



}









// =======================================
// Teachers
// =======================================


async function loadTeachers(){



content.innerHTML =

`

<h2>
👨‍🏫 المعلمون
</h2>


<div id="teacherList">

تحميل...

</div>

`;







const snap =

await get(

ref(db,"users")

);






let html="";






if(snap.exists()){



Object.entries(

snap.val()

)

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

class="btn btn-primary"

onclick="openEvaluation('${uid}')">


التقييم


</button>



</div>



`;



}



});



}





document

.getElementById(
"teacherList"
)

.innerHTML =

html || "لا يوجد معلمون";



}











// =======================================
// Open Evaluation
// =======================================


window.openEvaluation=

function(uid){



loadTeacherEvaluation(uid);



}











// =======================================
// عرض التقييمات
// =======================================


async function loadTeacherEvaluation(uid){



content.innerHTML =


`

<h2>

⭐ تقييم المعلم

</h2>


<div id="evaluationBox">

تحميل...

</div>


`;






const snap =

await get(

ref(

db,

`evaluations/${uid}`

)

);






let data={};



if(snap.exists())

data=snap.val();







const teacherScore =

data.teacher?.score || 0;



const headScore =

data.head?.score || 0;



const coordinatorScore =

data.coordinator?.score || 0;



const stageScore =

data.stageManager?.score || 0;









const finalScore =


(

teacherScore * .25

+

headScore * .25

+

coordinatorScore * .25

+

stageScore * .25

);








document

.getElementById(
"evaluationBox"
)

.innerHTML =


`

<div class="card">


<p>

تقييم المعلم:

${teacherScore}

</p>


<p>

رئيس القسم:

${headScore}

</p>



<p>

المنسق:

${coordinatorScore}

</p>




<p>

مدير المرحلة:

${stageScore}

</p>





<h3>

النتيجة النهائية:

${finalScore.toFixed(2)}

</h3>



<button

class="btn btn-success"

onclick="saveStageEvaluation('${uid}')">

حفظ واعتماد

</button>



</div>

`;




}











// =======================================
// تقييم مدير المرحلة
// =======================================


window.saveStageEvaluation=

async function(uid){



const score =

prompt(

"أدخل تقييم مدير المرحلة"

);






if(score===null)

return;






await set(

ref(

db,

`evaluations/${uid}/stageManager`

),

{


score:Number(score),


evaluator:user.uid,


date:Date.now()


}

);





// إعادة الحساب

const snap =

await get(

ref(

db,

`evaluations/${uid}`

)

);






const e = snap.val();






const final =


(

(e.teacher?.score || 0)*.25

+

(e.head?.score || 0)*.25

+

(e.coordinator?.score || 0)*.25

+

Number(score)*.25

);







await update(

ref(

db,

`evaluations/${uid}`

),

{


finalScore:

Number(final.toFixed(2)),


approved:true,


approvedBy:user.uid,


approvedDate:Date.now()


}

);






alert(

"تم اعتماد التقييم النهائي"

);



loadTeacherEvaluation(uid);



}











// =======================================
// All Evaluations
// =======================================


function loadEvaluations(){



content.innerHTML=

`

<h2>
⭐ جميع التقييمات
</h2>


<div class="card">

عرض تقييمات المعلمين

</div>

`;



}









// =======================================
// Final
// =======================================


function loadFinal(){



content.innerHTML=

`

<h2>
✅ الاعتماد النهائي
</h2>


<div class="card">

التقييمات المعتمدة تظهر هنا

</div>

`;



}









// =======================================
// Reports
// =======================================


function loadReports(){



content.innerHTML=

`

<h2>
📊 التقارير

</h2>



<div class="card">

تقارير المرحلة

</div>

`;



}









// تشغيل الصفحة

loadStageModule("home");
