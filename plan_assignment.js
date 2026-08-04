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
get,
set

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





protectPage([
"Manager"
]);





logoutBtn.onclick=logout;




window.backAdmin=function(){

location.href="admin.html";

};






searchBtn.onclick=

loadTeachers;









async function loadTeachers(){



teachersTable.innerHTML="";





const snap=

await get(

ref(db,"users")

);






if(!snap.exists())

return;






Object.entries(

snap.val()

)

.forEach(([uid,u])=>{






if(

u.role==="Teacher"

&&

u.subjects

&&

u.subjects[subject.value]

&&

u.grades

&&

u.grades[grade.value]

){





teachersTable.innerHTML +=


`

<tr>


<td>

${u.name}

</td>



<td>

${subject.value}

</td>



<td>

${grade.value}

</td>




<td>


<button

class="btn btn-success"

onclick="assignPlan('${uid}')">

ربط

</button>



</td>



</tr>

`;




}



});



}









window.assignPlan=

async function(uid){





const path =


`teacherPlans/${uid}/${year.value}/${semester.value}/${grade.value}/${subject.value}`;








await set(

ref(db,path),

{


linked:true,


createdAt:

Date.now()


}

);






alert(

"تم ربط الخطة بالمعلم"

);



};
