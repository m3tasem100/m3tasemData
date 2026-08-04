////////////////////////////////////////////////////
// TEACHER ASSIGNMENT
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
update

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";







protectPage([

"Manager"

]);







logoutBtn.onclick=logout;






window.backAdmin=function(){

location.href="admin.html";

};








loadTeachers();

loadDepartments();

loadSubjects();

loadGrades();









// ===============================
// تحميل المعلمين
// ===============================


async function loadTeachers(){



const select=

document.getElementById(
"teacher"
);





const snap=

await get(

ref(db,"users")

);







if(!snap.exists())

return;








Object.entries(

snap.val()

)

.forEach(([id,u])=>{



if(u.role==="Teacher"){



select.innerHTML +=


`

<option value="${id}">

${u.name}

</option>


`;



}



});



}









// ===============================
// الأقسام
// ===============================


async function loadDepartments(){



const select=

department;





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
// المواد
// ===============================


async function loadSubjects(){



const snap=

await get(

ref(db,"subjects")

);






if(!snap.exists())

return;






Object.entries(

snap.val()

)

.forEach(([id,s])=>{



subject.innerHTML +=


`

<option value="${id}">

${s.name}

</option>


`;



});



}









// ===============================
// الصفوف
// ===============================


async function loadGrades(){



const snap=

await get(

ref(db,"grades")

);







if(!snap.exists())

return;







Object.entries(

snap.val()

)

.forEach(([id,g])=>{



grade.innerHTML +=


`

<option value="${id}">

${g.name}

</option>


`;



});



}









// ===============================
// حفظ الربط
// ===============================


saveBtn.onclick=

async function(){



const teacherId=

teacher.value;







if(!teacherId){


alert(
"اختر المعلم"
);


return;


}







await update(

ref(

db,

"users/"+teacherId

),

{


departmentId:

department.value,



subjects:{


[subject.value]:

true


},




grades:{


[grade.value]:

true


}


}

);






alert(

"تم ربط المعلم بنجاح"

);



};
