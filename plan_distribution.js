////////////////////////////////////////////////////
// PLAN DISTRIBUTION
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







const table =

document.getElementById(

"objectivesTable"

);





let objectives=[];









// تحميل الأهداف


loadBtn.onclick=

async function(){



const path =


`plans/${year.value}/${semester.value}/${grade.value}/${subject.value}/objectives`;






const snap=

await get(

ref(db,path)

);






if(!snap.exists()){


alert(
"لا توجد أهداف"
);


return;


}








objectives=

Object.entries(

snap.val()

);








table.innerHTML="";






objectives.forEach(([id,o])=>{



table.innerHTML +=


`

<tr>


<td>

${o.description}

</td>


<td>

${o.lessons}

</td>


<td>


<input

type="number"

value="${o.week}"

data-id="${id}"

class="weekInput">


</td>



</tr>


`;



});



};











// حفظ التوزيع


saveBtn.onclick=

async function(){





const path =


`weeklyPlans/${year.value}/${semester.value}/${grade.value}/${subject.value}`;







const inputs=

document.querySelectorAll(

".weekInput"

);







for(const input of inputs){



const id=

input.dataset.id;





const objective=

objectives.find(

x=>x[0]===id

);







await set(

ref(

db,

`${path}/${id}`

),

{


objective:

objective[1].description,



lessons:

objective[1].lessons,



week:

Number(input.value),



updatedAt:

Date.now()


}

);



}






alert(

"تم حفظ التوزيع"

);



};
