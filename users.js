////////////////////////////////////////////////////
// USER MANAGEMENT
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



import {

logout

}

from "./auth.js";







const table =

document.getElementById(
"usersTable"
);







document

.getElementById("logoutBtn")

.onclick=logout;








window.goAdmin=function(){


location.href="admin.html";


};









// تحميل المستخدمين


loadUsers();








async function loadUsers(){



table.innerHTML="";



const snap =

await get(

ref(db,"users")

);





if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="5">

لا يوجد مستخدمون

</td>

</tr>

`;

return;


}







Object.entries(
snap.val()

)

.forEach(([uid,u])=>{



table.innerHTML +=


`

<tr>


<td>

${u.name || ""}

</td>



<td>

${u.email || ""}

</td>



<td>

${u.role}

</td>



<td>

${

u.active

?

"فعال"

:

"معطل"

}

</td>



<td>


<button

class="btn btn-warning"

onclick="editUser('${uid}')">

تعديل

</button>



<button

class="btn btn-danger"

onclick="deleteUser('${uid}')">

حذف

</button>




<button

class="btn btn-success"

onclick="toggleUser('${uid}',${u.active})">


تفعيل/تعطيل

</button>



</td>



</tr>



`;



});



}









// إضافة مستخدم بيانات فقط


document

.getElementById("addBtn")

.onclick=

async function(){





const id =

push(

ref(db,"users")

)

.key;





await set(

ref(db,"users/"+id),

{


name:

name.value,


email:

email.value,


role:

role.value,


active:

active.value==="true",


createdAt:

Date.now()


}

);





alert(
"تم إضافة المستخدم"
);



loadUsers();



};









// تعديل


window.editUser=

async function(uid){



const newRole =

prompt(

"الدور الجديد"

);






if(!newRole)

return;






await update(

ref(db,"users/"+uid),

{


role:newRole


}

);



loadUsers();



}









// حذف


window.deleteUser=

async function(uid){



if(!confirm(
"حذف المستخدم؟"
))

return;







await remove(

ref(db,"users/"+uid)

);



loadUsers();


}









// تعطيل


window.toggleUser=

async function(uid,status){



await update(

ref(db,"users/"+uid),

{


active:

!status


}

);



loadUsers();


}
