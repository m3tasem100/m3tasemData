////////////////////////////////////////////////////
// ACADEMIC YEARS MANAGEMENT
////////////////////////////////////////////////////


import {

protectPage,
logout

}

from "./auth.js";



import {

db

}

from "./firebase-config.js";



import {

ref,
set,
get,
update

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";






protectPage([
"Manager"
]);






logoutBtn.onclick=logout;






window.backAdmin=function(){

location.href="admin.html";

};








loadYears();

loadSemesters();








// =============================
// ADD YEAR
// =============================


addYear.onclick=

async()=>{


let year=

yearName.value.trim();



if(!year)

return;



await set(

ref(

db,

"academic/years/"+year

),

{


name:year,

active:false

}


);



yearName.value="";


loadYears();


};









// =============================
// LOAD YEARS
// =============================


async function loadYears(){


yearsTable.innerHTML="";



const snap=

await get(

ref(db,"academic/years")

);



if(!snap.exists())

return;




Object.entries(

snap.val()

)

.forEach(([id,y])=>{



yearsTable.innerHTML+=


`

<tr>

<td>

${y.name}

</td>


<td>

${y.active?"نشطة":"غير نشطة"}

</td>


<td>


<button

class="btn btn-success"

onclick="activateYear('${id}')">

تفعيل

</button>


</td>


</tr>

`;



});


}









window.activateYear=

async(id)=>{


await update(

ref(db,"academic/years"),

{

}

);



await update(

ref(db,"academic/years/"+id),

{

active:true

}

);



loadYears();


};









// =============================
// SEMESTERS
// =============================


async function loadSemesters(){


semesterTable.innerHTML="";



const snap=

await get(

ref(db,"academic/semesters")

);



if(!snap.exists())

return;



Object.entries(

snap.val()

)

.forEach(([id,s])=>{


semesterTable.innerHTML+=


`

<tr>


<td>

${s.name}

</td>


<td>

${s.active?"نشط":"غير نشط"}

</td>


<td>


<button

class="btn btn-success"

onclick="activateSemester('${id}')">

تفعيل

</button>


</td>


</tr>


`;



});


}









addSemester.onclick=

async()=>{


let name=

prompt(

"اسم الفصل"

);



if(!name)

return;



let id=

"semester"+Date.now();



await set(

ref(

db,

"academic/semesters/"+id

),

{


name:name,

active:false


}

);



loadSemesters();


};









window.activateSemester=

async(id)=>{



await update(

ref(

db,

"academic/semesters/"+id

),

{


active:true


}

);



loadSemesters();


};
