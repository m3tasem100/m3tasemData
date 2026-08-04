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






const teacherUID=

new URLSearchParams(

location.search

)

.get("id");






const year="2025-2026";

const semester="semester2";






loadReport();








async function loadReport(){



const userSnap=

await get(

ref(

db,

"users/"+teacherUID

)

);







if(userSnap.exists()){



const u=userSnap.val();



teacherData.innerHTML=


`

<h3>

الاسم: ${u.name}

</h3>


<p>

البريد:
${u.email}

</p>


`;



}









const evalSnap=

await get(

ref(

db,

`evaluations/${teacherUID}/${year}/${semester}`

)

);






if(!evalSnap.exists())

return;







let total=0;







scores.innerHTML="";






const data=

evalSnap.val();






const roles=[

["teacher","المعلم"],

["Head","رئيس القسم"],

["Coordinator","المنسق"],

["StageManager","مدير المرحلة"]

];








roles.forEach(r=>{



let score=

data[r[0]]?.score || 0;







total += score * 0.25;






scores.innerHTML+=


`

<tr>


<td>

${r[1]}

</td>


<td>

25%

</td>


<td>

${score}

</td>


</tr>


`;




});








finalScore.innerHTML=

total.toFixed(2)+"%";








notes.innerHTML=

data.notes || "";



improvements.innerHTML=

data.improvements || "";








// حفظ النتيجة النهائية


await set(

ref(

db,

`evaluations/${teacherUID}/${year}/${semester}/final`

),

{


score:total.toFixed(2)

}

);



}
