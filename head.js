////////////////////////////////////////////////////
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
get

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";








protectPage([

"Head"

]);








document

.getElementById(

"logoutBtn"

)

.onclick=

logout;








const user =

currentUser();






const content =

document.getElementById(

"content"

);






const info =

document.getElementById(

"headInfo"

);









let headData={};









async function loadHead(){



const snap=

await get(

ref(

db,

"users/"+user.uid

)

);





if(!snap.exists())

return;






headData=snap.val();






info.innerHTML=

`

<strong>

${headData.name}

</strong>

<br>

${headData.email}

<br>

رئيس قسم

`;






loadHeadHome();



}









// ===============================
// MENU
// ===============================


window.loadHeadModule=function(page){

case "execution":

loadExecution();

break;

switch(page){



case "home":

loadHeadHome();

break;



case "teachers":

loadTeachers();

break;



case "plans":

loadPlans();

break;



case "reports":

loadReports();

break;


}



}









// ===============================
// HOME
// ===============================


function loadHeadHome(){



content.innerHTML=

`

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
📚 الخطط
</h3>


<p>
مراجعة تنفيذ الخطط
</p>


</div>



</div>

`;



}









// ===============================
// TEACHERS
// ===============================


async function loadTeachers(){



content.innerHTML=

`

<h2>
معلمو القسم
</h2>


<table>


<thead>

<tr>

<th>
الاسم
</th>


<th>
البريد
</th>


</tr>


</thead>


<tbody id="teacherTable">

</tbody>


</table>

`;







const table=

document.getElementById(

"teacherTable"

);








const snap=

await get(

ref(db,"users")

);








if(!snap.exists())

return;








Object.values(

snap.val()

)

.forEach(u=>{





if(

u.role==="Teacher"

&&

u.departmentId===headData.departmentId

){





table.innerHTML+=


`

<tr>


<td>

${u.name}

</td>


<td>

${u.email}

</td>


</tr>


`;



}



});



}









// ===============================
// PLANS
// ===============================


function loadPlans(){



content.innerHTML=

`

<h2>
خطط القسم
</h2>


<div class="card">

متابعة الخطط المرفوعة للمعلمين

</div>


`;



}









// ===============================
// REPORTS
// ===============================


function loadReports(){



content.innerHTML=

`

<h2>
تقارير القسم

</h2>


<div class="card">

نسبة الإنجاز والتأخير

</div>


`;



}









loadHead();
