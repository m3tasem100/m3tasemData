////////////////////////////////////////////////////
// UCA SCHOOL MANAGEMENT SYSTEM
// USERS MANAGEMENT MODULE
////////////////////////////////////////////////////


import {

db,
app

}

from "./firebase-config.js";



import {

currentUser

}

from "./auth.js";



import {

initializeApp,
deleteApp

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";



import {

getAuth,
createUserWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";



import {

ref,
get,
set,
update,
remove

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";







const content =

document.getElementById("content");







// =======================================
// تحميل الصفحة
// =======================================


renderUsers();









async function renderUsers(){



content.innerHTML = `


<h2>
👥 إدارة المستخدمين
</h2>




<div class="card">


<h3>
إضافة مستخدم جديد
</h3>



<div class="form-group">

<label>
الاسم
</label>

<input id="userName">

</div>





<div class="form-group">

<label>
البريد الإلكتروني
</label>

<input id="userEmail">

</div>





<div class="form-group">

<label>
كلمة المرور
</label>

<input 
id="userPassword"
type="password">

</div>





<div class="form-group">

<label>
الدور
</label>


<select id="userRole">


<option value="Teacher">
معلم
</option>


<option value="Head">
رئيس قسم
</option>


<option value="Coordinator">
منسق
</option>


<option value="StageManager">
مدير مرحلة
</option>


<option value="Viewer">
مشاهد
</option>


</select>


</div>





<button class="btn btn-primary"
id="addUserBtn">

إضافة المستخدم

</button>



<p id="userMessage"></p>


</div>









<div class="card">


<h3>
قائمة المستخدمين
</h3>



<div class="table-container">


<table>


<thead>

<tr>

<th>
الاسم
</th>


<th>
البريد
</th>


<th>
الدور
</th>


<th>
الحالة
</th>


<th>
إجراءات
</th>


</tr>


</thead>



<tbody id="usersTable">


</tbody>


</table>


</div>


</div>



`;




document
.getElementById("addUserBtn")
.onclick=createUser;



loadUsers();



}









// =======================================
// قراءة المستخدمين
// =======================================


async function loadUsers(){



const table =

document.getElementById("usersTable");



table.innerHTML="";



const snapshot =

await get(

ref(db,"users")

);



if(!snapshot.exists()){


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





const users =

snapshot.val();





Object.entries(users)

.forEach(([uid,user])=>{



table.innerHTML +=


`

<tr>


<td>
${user.name || ""}
</td>


<td>
${user.email || ""}
</td>


<td>

<select 
onchange="window.changeRole('${uid}',this.value)">


<option ${user.role==="Manager"?"selected":""}>
Manager
</option>


<option ${user.role==="Teacher"?"selected":""}>
Teacher
</option>


<option ${user.role==="Head"?"selected":""}>
Head
</option>


<option ${user.role==="Coordinator"?"selected":""}>
Coordinator
</option>


<option ${user.role==="StageManager"?"selected":""}>
StageManager
</option>


<option ${user.role==="Viewer"?"selected":""}>
Viewer
</option>



</select>


</td>



<td>


<span class="badge ${user.active ? "badge-success":"badge-danger"}">

${user.active ? "فعال":"موقوف"}

</span>


</td>



<td>


<button class="btn btn-warning"

onclick="editUser('${uid}','${user.name || ""}')">

تعديل

</button>



<button class="btn btn-danger"

onclick="toggleUser('${uid}',${user.active})">

${user.active ? "تعطيل":"تفعيل"}

</button>



<button class="btn btn-danger"

onclick="deleteUser('${uid}')">

حذف

</button>



</td>



</tr>


`;



});



}









// =======================================
// إنشاء مستخدم
// =======================================


async function createUser(){



const name =

userName.value.trim();



const email =

userEmail.value.trim();



const password =

userPassword.value;



const role =

userRole.value;






try{



const secondaryApp =

initializeApp(

app.options,

"Secondary-"+Date.now()

);





const secondaryAuth =

getAuth(
secondaryApp
);






const result =

await createUserWithEmailAndPassword(

secondaryAuth,

email,

password

);






const uid =

result.user.uid;






await set(

ref(db,"users/"+uid),

{


name:name,

email:email,

role:role,

active:true,


createdAt:

Date.now()


}

);






await deleteApp(
secondaryApp
);





userMessage.innerHTML=

"تم إنشاء المستخدم بنجاح";



renderUsers();



}

catch(error){


userMessage.innerHTML=

error.message;


}



}









// =======================================
// تغيير الدور
// =======================================


window.changeRole=

async function(uid,role){


await update(

ref(db,"users/"+uid),

{

role:role

}

);



loadUsers();


}









// =======================================
// تعديل الاسم
// =======================================


window.editUser=

async function(uid,oldName){



const name =

prompt(

"الاسم الجديد",

oldName

);



if(!name)

return;





await update(

ref(db,"users/"+uid),

{

name:name

}

);



loadUsers();



}









// =======================================
// تفعيل وتعطيل
// =======================================


window.toggleUser=

async function(uid,status){



await update(

ref(db,"users/"+uid),

{

active:!status

}

);



loadUsers();



}









// =======================================
// حذف
// =======================================


window.deleteUser=

async function(uid){



if(!confirm(
"هل تريد حذف المستخدم؟"
))

return;




await remove(

ref(db,"users/"+uid)

);



loadUsers();



}
