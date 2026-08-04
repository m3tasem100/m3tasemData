////////////////////////////////////////////////////
// TEACHER WEEKLY PLAN
////////////////////////////////////////////////////


import {

protectPage,
currentUser

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





protectPage([

"Teacher"

]);







const user=

currentUser();







const content=

document.getElementById(

"content"

);









loadPlans();









async function loadPlans(){



content.innerHTML=

`

<h2>
الخطة الأسبوعية
</h2>

<table>


<thead>

<tr>

<th>
الصف
</th>


<th>
المادة
</th>


<th>
الأسبوع
</th>


<th>
الهدف
</th>


<th>
الحصص
</th>


<th>
الحالة
</th>


</tr>

</thead>


<tbody id="plansTable">

</tbody>


</table>

`;







const table=

document.getElementById(

"plansTable"

);






const snap=

await get(

ref(

db,

`teacherPlans/${user.uid}`

)

);







if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="6">

لا توجد خطط مرتبطة

</td>

</tr>

`;

return;


}








for(

const year in snap.val()

){



for(

const semester in snap.val()[year]

){



for(

const grade in snap.val()[year][semester]

){



for(

const subject in snap.val()[year][semester][grade]

){







const planSnap=

await get(

ref(

db,

`weeklyPlans/${year}/${semester}/${grade}/${subject}`

)

);






if(planSnap.exists()){





Object.values(

planSnap.val()

)

.forEach(async item=>{





table.innerHTML +=


`

<tr>


<td>

${grade}

</td>


<td>

${subject}

</td>


<td>

${item.week}

</td>



<td>

${item.objective}

</td>


<td>

${item.lessons}

</td>


<td>


<button

class="btn btn-success"

onclick="completeWeek(

'${year}',

'${semester}',

'${grade}',

'${subject}',

'${item.week}'

)">


تم التنفيذ


</button>


</td>



</tr>

`;



});





}



}

}

}

}

}









window.completeWeek=

async function(

year,

semester,

grade,

subject,

week

){



const note=

prompt(

"ملاحظات التنفيذ"

);





await set(

ref(

db,

`teacherExecution/${user.uid}/${year}/${semester}/${grade}/${subject}/week${week}`

),

{


completed:true,


note:note || "",


date:

Date.now()


}

);






alert(

"تم اعتماد تنفيذ الأسبوع"

);



};
