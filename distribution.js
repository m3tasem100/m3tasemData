////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// PLAN DISTRIBUTION MODULE
////////////////////////////////////////////////////


import {

db

}

from "./firebase-config.js";



import {

ref,
get,
set,
update,
remove

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





const content =

document.getElementById("content");





loadDistribution();







// =======================================
// الواجهة
// =======================================


async function loadDistribution(){



content.innerHTML = `


<h2>
📅 توزيع الأسابيع
</h2>



<div class="card">


<div class="form-group">


<label>
السنة الدراسية
</label>


<select id="distYear">


<option>
2025-2026
</option>


</select>


</div>





<div class="form-group">


<label>
الفصل

</label>


<select id="distSemester">


<option value="semester1">
الفصل الأول
</option>


<option value="semester2">
الفصل الثاني
</option>


</select>


</div>






<div class="form-group">


<label>
الصف
</label>


<select id="distGrade">

<option>
اختر الصف
</option>

</select>


</div>






<div class="form-group">


<label>
المادة
</label>


<select id="distSubject">

<option>
اختر المادة
</option>


</select>


</div>




<button

class="btn btn-primary"

id="loadObjectivesBtn">

عرض الأهداف

</button>



</div>










<div class="card">


<h3>
الأهداف

</h3>



<table>


<thead>


<tr>

<th>
رقم الهدف
</th>


<th>
الوصف
</th>


<th>
الأسبوع
</th>


<th>
حفظ
</th>


</tr>


</thead>



<tbody id="objectivesTable">


</tbody>



</table>



</div>


`;





document

.getElementById(
"loadObjectivesBtn"
)

.onclick=

loadObjectives;



}









// =======================================
// عرض الأهداف
// =======================================


async function loadObjectives(){



const year =

distYear.value;



const semester =

distSemester.value;



const grade =

distGrade.value;



const subject =

distSubject.value;





const table =

document.getElementById(
"objectivesTable"
);



table.innerHTML="";





const path =

`plans/${year}/${semester}/${grade}/${subject}/objectives`;






const snapshot =

await get(

ref(db,path)

);







if(!snapshot.exists()){



table.innerHTML=

`

<tr>

<td colspan="4">

لا توجد أهداف

</td>

</tr>

`;

return;


}







const objectives =

snapshot.val();







Object.entries(objectives)

.forEach(([id,obj])=>{



table.innerHTML +=


`

<tr>


<td>

${id}

</td>



<td>

${obj.description}

</td>



<td>


<select id="week_${id}">


${createWeeks()}


</select>


</td>




<td>


<button

class="btn btn-success"

onclick="saveDistribution('${id}')">


حفظ


</button>


</td>



</tr>



`;



});



}









// =======================================
// إنشاء الأسابيع
// =======================================


function createWeeks(){



let html="";



for(let i=1;i<=18;i++){



html +=

`

<option value="${i}">

الأسبوع ${i}

</option>

`;



}



return html;


}









// =======================================
// حفظ التوزيع
// =======================================


window.saveDistribution=

async function(objectiveId){



const week =

document

.getElementById(
"week_"+objectiveId
)

.value;





const data ={


week:Number(week),


status:"planned",


updatedAt:

Date.now()


};







await set(

ref(

db,

`distribution/${distYear.value}/${distSemester.value}/${objectiveId}`

),

data

);





alert(
"تم حفظ التوزيع"
);



}
