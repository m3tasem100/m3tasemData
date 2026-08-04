////////////////////////////////////////////////////
// GRADES MANAGEMENT
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
set,
update,
remove,
push

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";








protectPage([

"Manager"

]);







logoutBtn.onclick=logout;







window.backAdmin=function(){

location.href="admin.html";

};








const table=

document.getElementById(
"gradeTable"
);







loadGrades();









// ===============================
// إضافة صف
// ===============================


addGrade.onclick=

async function(){



const name=

gradeName.value.trim();



const level=

Number(

gradeLevel.value

);



const programValue=

program.value;







if(!name || !level){



alert(
"أدخل بيانات الصف"
);



return;


}









const id=

push(

ref(db,"grades")

).key;








await set(

ref(

db,

"grades/"+id

),

{


name:name,


level:level,


program:programValue,


createdAt:

Date.now()


}

);








gradeName.value="";

gradeLevel.value="";



loadGrades();



};












// ===============================
// عرض الصفوف
// ===============================


async function loadGrades(){



table.innerHTML="";





const snap=

await get(

ref(db,"grades")

);






if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="4">

لا توجد صفوف

</td>

</tr>

`;

return;


}







Object.entries(

snap.val()

)

.forEach(([id,g])=>{





table.innerHTML +=


`

<tr>



<td>

${g.name}

</td>



<td>

${g.level}

</td>



<td>

${g.program}

</td>





<td>




<button

class="btn btn-warning"

onclick="editGrade('${id}','${g.name}')">

تعديل

</button>






<button

class="btn btn-danger"

onclick="deleteGrade('${id}')">

حذف

</button>




</td>



</tr>


`;



});



}









// ===============================
// تعديل
// ===============================


window.editGrade=

async function(id,name){



const newName=

prompt(

"اسم الصف",

name

);





if(!newName)

return;








await update(

ref(

db,

"grades/"+id

),

{


name:newName


}

);






loadGrades();



}











// ===============================
// حذف
// ===============================


window.deleteGrade=

async function(id){



if(!confirm(

"حذف الصف؟"

))

return;








await remove(

ref(

db,

"grades/"+id

)

);



loadGrades();



}
