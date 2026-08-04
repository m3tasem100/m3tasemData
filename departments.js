////////////////////////////////////////////////////
// DEPARTMENTS MANAGEMENT
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
"departmentTable"
);







loadDepartments();









// إضافة قسم


addDepartment.onclick=

async function(){



const name=

departmentName.value.trim();





if(!name){

alert(
"أدخل اسم القسم"
);

return;

}







const id=

push(

ref(db,"departments")

).key;








await set(

ref(

db,

"departments/"+id

),

{


name:name,


headId:"",


createdAt:

Date.now()


}

);





departmentName.value="";



loadDepartments();



};











// تحميل الأقسام


async function loadDepartments(){



table.innerHTML="";



const snap=

await get(

ref(db,"departments")

);





if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="3">

لا توجد أقسام

</td>

</tr>

`;

return;


}







Object.entries(

snap.val()

)

.forEach(([id,dep])=>{





table.innerHTML +=


`

<tr>


<td>

${dep.name}

</td>



<td>

${dep.headId || "غير محدد"}

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









// تعديل


window.editDepartment=

async function(id,name){



const newName=

prompt(

"اسم القسم",

name

);






if(!newName)

return;







await update(

ref(

db,

"departments/"+id

),

{


name:newName


}

);






loadDepartments();



}









// حذف


window.deleteDepartment=

async function(id){



if(!confirm(
"حذف القسم؟"
))

return;







await remove(

ref(

db,

"departments/"+id

)

);



loadDepartments();



}
