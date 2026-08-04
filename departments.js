////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// DEPARTMENTS MANAGEMENT MODULE
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





// تشغيل الوحدة

loadDepartments();







// =======================================
// واجهة الأقسام
// =======================================


async function loadDepartments(){



content.innerHTML = `


<h2>
🏢 إدارة الأقسام
</h2>



<div class="card">


<h3>
إضافة قسم جديد
</h3>


<div class="form-group">

<label>
اسم القسم
</label>


<input id="departmentName"
placeholder="مثال: قسم العلوم">

</div>




<button class="btn btn-primary"
id="addDepartmentBtn">

إضافة القسم

</button>



<p id="departmentMessage"></p>



</div>










<div class="card">


<h3>
قائمة الأقسام
</h3>



<div class="table-container">


<table>


<thead>

<tr>

<th>
القسم
</th>


<th>
الإجراءات
</th>


</tr>


</thead>



<tbody id="departmentsTable">

</tbody>



</table>



</div>


</div>



`;




document

.getElementById("addDepartmentBtn")

.onclick=createDepartment;



getDepartments();



}









// =======================================
// قراءة الأقسام
// =======================================


async function getDepartments(){



const table =

document.getElementById(
"departmentsTable"
);



table.innerHTML="";



const snapshot =

await get(

ref(db,"departments")

);





if(!snapshot.exists()){



table.innerHTML=

`

<tr>

<td colspan="2">

لا توجد أقسام

</td>

</tr>

`;

return;


}





const departments =

snapshot.val();







Object.entries(departments)

.forEach(([id,dep])=>{



table.innerHTML +=


`

<tr>


<td>

${dep.name}

</td>




<td>


<button

class="btn btn-warning"

onclick="editDepartment('${id}','${dep.name}')">

تعديل

</button>





<button

class="btn btn-danger"

onclick="deleteDepartment('${id}')">

حذف

</button>



</td>



</tr>



`;



});



}









// =======================================
// إضافة قسم
// =======================================


async function createDepartment(){



const name =

document

.getElementById(
"departmentName"
)

.value

.trim();





if(!name){


departmentMessage.innerHTML=

"أدخل اسم القسم";


return;


}







const newRef =

push(

ref(db,"departments")

);






await set(

newRef,

{


name:name,


createdAt:

Date.now()


}

);






departmentMessage.innerHTML=

"تم إضافة القسم";



loadDepartments();



}









// =======================================
// تعديل
// =======================================


window.editDepartment=

async function(id,oldName){



const name =

prompt(

"اسم القسم الجديد",

oldName

);





if(!name)

return;





await update(

ref(db,"departments/"+id),

{


name:name


}

);



loadDepartments();



}









// =======================================
// حذف
// =======================================


window.deleteDepartment=

async function(id){



if(!confirm(
"حذف القسم؟"
))

return;





await remove(

ref(db,"departments/"+id)

);



loadDepartments();



}
