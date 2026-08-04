////////////////////////////////////////////////////
// USERS MANAGEMENT
////////////////////////////////////////////////////


import {

protectPage,
logout

}

from "./auth.js";



import {

auth,
db

}

from "./firebase-config.js";



import {

createUserWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";



import {

ref,
set,
get,
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







loadUsers();









// =================================
// CREATE USER
// =================================


createBtn.onclick=

async function(){



try{



const userCredential =

await createUserWithEmailAndPassword(

auth,

email.value,

password.value

);







const uid=

userCredential.user.uid;







await set(

ref(

db,

"users/"+uid

),

{


name:name.value,


email:email.value,


role:role.value,


active:true,


createdAt:

Date.now()


}

);







alert(

"تم إنشاء المستخدم"

);






name.value="";

email.value="";

password.value="";



loadUsers();



}

catch(error){



alert(

error.message

);



}



};









// =================================
// LOAD USERS
// =================================


async function loadUsers(){



usersTable.innerHTML="";




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





usersTable.innerHTML +=


`

<tr>


<td>

${u.name}

</td>



<td>

${u.email}

</td>



<td>

<select onchange="changeRole('${uid}',this.value)">


<option ${u.role=="Manager"?"selected":""}>
Manager
</option>


<option ${u.role=="Teacher"?"selected":""}>
Teacher
</option>


<option ${u.role=="Head"?"selected":""}>
Head
</option>


<option ${u.role=="Coordinator"?"selected":""}>
Coordinator
</option>


<option ${u.role=="StageManager"?"selected":""}>
StageManager
</option>


<option ${u.role=="Viewer"?"selected":""}>
Viewer
</option>


</select>


</td>





<td>



<button

onclick="toggleUser('${uid}',${u.active})"

class="btn btn-warning">


${u.active?"تعطيل":"تفعيل"}


</button>



</td>





<td>



<button

onclick="editUser('${uid}','${u.name}')"

class="btn btn-primary">

تعديل

</button>





<button

onclick="deleteUser('${uid}')"

class="btn btn-danger">

حذف

</button>



</td>


</tr>


`;



});



}









// =================================
// CHANGE ROLE
// =================================


window.changeRole=

async function(uid,newRole){



await update(

ref(db,"users/"+uid),

{

role:newRole

}

);



};









// =================================
// ENABLE / DISABLE
// =================================


window.toggleUser=

async function(uid,state){



await update(

ref(db,"users/"+uid),

{


active:!state


}

);



loadUsers();


};









// =================================
// EDIT NAME
// =================================


window.editUser=

async function(uid,nameOld){



const newName=

prompt(

"الاسم",

nameOld

);





if(!newName)

return;







await update(

ref(db,"users/"+uid),

{


name:newName


}

);



loadUsers();



};









// =================================
// DELETE DATABASE RECORD
// =================================


window.deleteUser=

async function(uid){



if(!confirm(

"حذف المستخدم من النظام؟"

))

return;





await remove(

ref(db,"users/"+uid)

);




loadUsers();



};
