////////////////////////////////////////////////////
// REPORTS SYSTEM
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
get

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";








protectPage([

"Manager",

"Head",

"Coordinator",

"StageManager"

]);







logoutBtn.onclick=logout;








window.backHome=function(){

history.back();

};







loadBtn.onclick=

loadReport;









async function loadReport(){



reportTable.innerHTML="";





const usersSnap=

await get(

ref(db,"users")

);






if(!usersSnap.exists())

return;







for(

const [uid,user]

of Object.entries(usersSnap.val())

){






if(user.role==="Teacher"){






let total=0;

let done=0;









const plans=

await get(

ref(

db,

`teacherPlans/${uid}/${year.value}/${semester.value}`

)

);









if(plans.exists()){


total=countPlans(

plans.val()

);


}








const execution=

await get(

ref(

db,

`teacherExecution/${uid}/${year.value}/${semester.value}`

)

);







if(execution.exists()){


done=countExecution(

execution.val()

);


}







let percent=

total===0

?

0

:

Math.round(

done/total*100

);







reportTable.innerHTML +=


`

<tr>


<td>

${user.name}

</td>


<td>

${Object.keys(user.subjects||{}).join(",")}

</td>


<td>

${Object.keys(user.grades||{}).join(",")}

</td>


<td>

${done}

</td>


<td>

${total}

</td>


<td>

${percent}%

</td>


</tr>

`;



}



}



}









function countPlans(obj){


let count=0;


function scan(x){


for(let k in x){


if(typeof x[k]==="object")

scan(x[k]);

else

count++;


}



}


scan(obj);


return count;


}









function countExecution(obj){



let count=0;



function scan(x){


for(let k in x){



if(

typeof x[k]==="object"

){



if(x[k].completed)

count++;



scan(x[k]);


}



}



}



scan(obj);


return count;


}
