////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// SUBJECTS MANAGEMENT MODULE
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
remove,
push

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





const content =

document.getElementById("content");





loadSubjects();









// =======================================
// واجهة المواد
// =======================================


async function loadSubjects(){



content.innerHTML = `


<h2>
📚 إدارة المواد الدراسية
</h2>





<div class="card">


<h3>
إضافة مادة جديدة
</h3>




<div class="form-group">


<label>
اسم المادة
</label>


<input

id="subjectName"

placeholder="مثال: Mathematics"

>


</div>






<div class="form-group">


<label>
القسم
</label>


<select id="subjectDepartment">


<option>
جاري تحميل الأقسام...
</option>


</select>


</div>







<button

class="btn btn-primary"

id="addSubjectBtn">

إضافة المادة

</button>




<p id="subjectMessage"></p>



</div>









<div class="card">


<h3>
قائمة المواد
</h3>




<div class="table-container">


<table>


<thead>


<tr>


<th>
المادة
</th>


<th>
القسم
</th>


<th>
الإجراءات
</th>


</tr>


</thead>




<tbody id="subjectsTable">


</tbody>


</table>



</div>


</div>



`;




await loadDepartments();



document

.getElementById(
"addSubjectBtn"
)

.onclick=createSubject;



getSubjects();



}











// =======================================
// تحميل الأقسام
// =======================================


async function loadDepartments(){



const select =

document

.getElementById(
"subjectDepartment"
);





select.innerHTML="";





const snapshot =

await get(

ref(db,"departments")

);





if(!snapshot.exists()){


select.innerHTML=

`

<option>
لا توجد أقسام
</option>

`;

return;


}






const departments =

snapshot.val();





Object.entries(departments)

.forEach(([id,dep])=>{


select.innerHTML +=


`

<option value="${id}">

${dep.name}

</option>


`;



});



}









// =======================================
// إضافة مادة
// =======================================


async function createSubject(){



const name =

document

.getElementById(
"subjectName"
)

.value

.trim();





const departmentId =

document

.getElementById(
"subjectDepartment"
)

.value;






if(!name){


subjectMessage.innerHTML=

"أدخل اسم المادة";


return;


}







const newSubject =

push(

ref(db,"subjects")

);







await set(

newSubject,

{


name:name,


departmentId:departmentId,


createdAt:

Date.now()


}

);







subjectMessage.innerHTML=

"تم إضافة المادة بنجاح";





loadSubjects();



}









// =======================================
// عرض المواد
// =======================================


async function getSubjects(){



const table =

document

.getElementById(
"subjectsTable"
);




table.innerHTML="";





const subjectSnap =

await get(

ref(db,"subjects")

);





const depSnap =

await get(

ref(db,"departments")

);





let departments={};



if(depSnap.exists())

departments =
depSnap.val();







if(!subjectSnap.exists()){



table.innerHTML=

`

<tr>

<td colspan="3">

لا توجد مواد

</td>

</tr>

`;

return;


}







const subjects =

subjectSnap.val();







Object.entries(subjects)

.forEach(([id,sub])=>{



table.innerHTML +=


`

<tr>


<td>

${sub.name}

</td>



<td>

${
departments[sub.departmentId]

?

departments[sub.departmentId].name

:

"غير محدد"

}

</td>





<td>


<button

class="btn btn-warning"

onclick="editSubject('${id}','${sub.name}')">

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









// =======================================
// تعديل المادة
// =======================================


window.editSubject =

async function(id,oldName){



const name =

prompt(

"اسم المادة الجديد",

oldName

);





if(!name)

return;





await update(

ref(db,"subjects/"+id),

{


name:name


}

);



loadSubjects();



}









// =======================================
// حذف المادة
// =======================================


window.deleteSubject=

async function(id){



if(!confirm(
"حذف المادة؟"
))

return;






await remove(

ref(db,"subjects/"+id)

);





loadSubjects();



}
