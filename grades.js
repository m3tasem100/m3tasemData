////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// GRADES MANAGEMENT MODULE
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





loadGrades();








// =======================================
// واجهة الصفوف
// =======================================


async function loadGrades(){



content.innerHTML = `


<h2>
🎓 إدارة الصفوف والشعب
</h2>





<div class="card">


<h3>
إضافة صف جديد
</h3>




<div class="form-group">


<label>
اسم الصف
</label>


<input

id="gradeName"

placeholder="مثال: Grade 9"

>


</div>







<div class="form-group">


<label>
البرنامج
</label>



<select id="gradeProgram">


<option value="American">

American

</option>



<option value="British">

British

</option>


</select>


</div>








<div class="form-group">


<label>
الشعب

</label>


<input

id="gradeClasses"

placeholder="مثال: A,B,C"

>


</div>







<button

class="btn btn-primary"

id="addGradeBtn">

إضافة الصف

</button>




<p id="gradeMessage"></p>



</div>









<div class="card">


<h3>
قائمة الصفوف
</h3>




<div class="table-container">


<table>


<thead>


<tr>


<th>
الصف
</th>



<th>
البرنامج
</th>



<th>
الشعب
</th>



<th>
الإجراءات
</th>



</tr>


</thead>




<tbody id="gradesTable">


</tbody>


</table>



</div>


</div>



`;





document

.getElementById(
"addGradeBtn"
)

.onclick=createGrade;




getGrades();



}











// =======================================
// إضافة صف
// =======================================


async function createGrade(){



const name =

document

.getElementById(
"gradeName"
)

.value

.trim();




const program =

document

.getElementById(
"gradeProgram"
)

.value;






const classesText =

document

.getElementById(
"gradeClasses"
)

.value

.trim();







if(!name){


gradeMessage.innerHTML=

"أدخل اسم الصف";


return;


}








const classes =

classesText

.split(",")

.map(x=>x.trim())

.filter(x=>x);









const newRef =

push(

ref(db,"grades")

);








await set(

newRef,

{


name:name,


program:program,


classes:classes,


createdAt:

Date.now()


}

);







gradeMessage.innerHTML=

"تم إضافة الصف";




loadGrades();



}











// =======================================
// قراءة الصفوف
// =======================================


async function getGrades(){



const table =

document

.getElementById(
"gradesTable"
);





table.innerHTML="";





const snapshot =

await get(

ref(db,"grades")

);






if(!snapshot.exists()){


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







const grades =

snapshot.val();








Object.entries(grades)

.forEach(([id,grade])=>{



table.innerHTML +=


`

<tr>


<td>

${grade.name}

</td>




<td>

${grade.program}

</td>




<td>

${

grade.classes

?

grade.classes.join(" , ")

:

""

}

</td>






<td>



<button

class="btn btn-warning"

onclick="editGrade('${id}','${grade.name}')">

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









// =======================================
// تعديل الصف
// =======================================


window.editGrade=

async function(id,oldName){



const name =

prompt(

"اسم الصف الجديد",

oldName

);






if(!name)

return;







await update(

ref(db,"grades/"+id),

{


name:name


}

);






loadGrades();



}









// =======================================
// حذف الصف
// =======================================


window.deleteGrade=

async function(id){



if(!confirm(
"حذف الصف؟"
))

return;







await remove(

ref(db,"grades/"+id)

);





loadGrades();



}
