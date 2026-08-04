////////////////////////////////////////////////////
// ADMIN DASHBOARD
////////////////////////////////////////////////////


import {

protectPage,
currentUser,
logout

}

from "./auth.js";



import {

db

}

from "./firebase-config.js";



import {

ref,
get

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";







protectPage([

"Manager"

]);







const user=currentUser();




adminInfo.innerHTML=

`

${user.name}

<br>

${user.email}

`;







logoutBtn.onclick=logout;







window.go=function(page){

location.href=page;

};









loadDashboard();









async function loadDashboard(){



// USERS


const usersSnap=

await get(

ref(db,"users")

);



let users=0;

let teachers=0;





if(usersSnap.exists()){



const data=usersSnap.val();



users=

Object.keys(data).length;



Object.values(data)

.forEach(u=>{


if(u.role==="Teacher")

teachers++;


});



}





usersCount.innerHTML=users;


teachersCount.innerHTML=teachers;










// Departments


const depSnap=

await get(

ref(db,"departments")

);



departmentsCount.innerHTML=

depSnap.exists()

?

Object.keys(depSnap.val()).length

:

0;









// Subjects


const subSnap=

await get(

ref(db,"subjects")

);



subjectsCount.innerHTML=

subSnap.exists()

?

Object.keys(subSnap.val()).length

:

0;









// Grades


const gradeSnap=

await get(

ref(db,"grades")

);



gradesCount.innerHTML=

gradeSnap.exists()

?

Object.keys(gradeSnap.val()).length

:

0;









// Plans


const planSnap=

await get(

ref(db,"plans")

);



plansCount.innerHTML=

planSnap.exists()

?

Object.keys(planSnap.val()).length

:

0;






loadPendingWeeks();



}









async function loadPendingWeeks(){



const table=

document.getElementById(

"pendingWeeks"

);



const snap=

await get(

ref(db,"teacherVerification")

);



let html="";






if(!snap.exists()){


table.innerHTML=

`

<tr>

<td colspan="3">

لا توجد بيانات

</td>

</tr>

`;

return;


}







Object.entries(

snap.val()

)

.forEach(([teacher,weeks])=>{


Object.entries(weeks)

.forEach(([year,data])=>{



if(!data.verified){



html+=


`

<tr>


<td>

${teacher}

</td>


<td>

${year}

</td>


<td>

-

</td>


</tr>


`;



}



});



});






table.innerHTML=

html ||


`

<tr>

<td colspan="3">

كل الأسابيع معتمدة

</td>

</tr>

`;



}
