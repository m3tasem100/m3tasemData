////////////////////////////////////////////////////
// SUBJECT MANAGEMENT
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
"subjectTable"
);









loadDepartments();

loadSubjects();









// ===============================
// تحميل الأقسام
// ===============================


async function loadDepartments(){



const select=

document.getElementById(
"department"
);





const snap=

await get(

ref(db,"departments")

);






if(!snap.exists())

return;







Object.entries(

snap.val()

)

.forEach(([id,d])=>{



select.innerHTML +=


`

<option value="${id}">

${d.name}

</option>

`;



});



}









// ===============================
// إضافة مادة
// ===============================


addSubject.onclick=

async function(){



const name=

subjectName.value.trim();



const departmentId=

department.value;



const programValue=

program.value;





if(!name){

alert(
"أدخل اسم المادة"
);

return;

}







const id=

push(

ref(db,"subjects")

).key;








await set(

ref(

db,

"subjects/"+id

),

{


name:name,


departmentId:departmentId,


program:programValue,


createdAt:

Date.now()


}

);





subjectName.value="";



loadSubjects();



};











// ===============================
// عرض المواد
// ===============================


async function loadSubjects(){



table.innerHTML="";





const snap=

await get(

ref(db,"subjects")

);







if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="4">

لا توجد مواد

</td>

</tr>

`;

return;


}







Object.entries(

snap.val()

)

.forEach(([id,s])=>{





table.innerHTML +=


`

<tr>


<td>

${s.name}

</td>



<td>

${s.departmentId}

</td>



<td>

${s.program}

</td>





<td>



<button

class="btn btn-warning"

onclick="editSubject('${id}','${s.name}')">


تعديل


</button>





<button

class="btn btn-danger"

onclick="deleteSubject('${id}')">


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


window.editSubject=

async function(id,name){



const newName=

prompt(

"اسم المادة",

name

);






if(!newName)

return;






await update(

ref(

db,

"subjects/"+id

),

{


name:newName


}

);



loadSubjects();



}











// ===============================
// حذف
// ===============================


window.deleteSubject=

async function(id){



if(!confirm(
"حذف المادة؟"
))

return;







await remove(

ref(

db,

"subjects/"+id

)

);



loadSubjects();



}
