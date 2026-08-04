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
get,
set

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";






protectPage([

"Manager",
"Head",
"Coordinator",
"StageManager"

]);






logoutBtn.onclick=logout;






const user=currentUser();






loadTeachers();

loadItems();







async function loadTeachers(){



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


teacher.innerHTML+=


`

<option value="${id}">

${u.name}

</option>

`;


}



});

}



async function loadItems(){



const snap=

await get(

ref(db,"evaluationItems")

);



if(!snap.exists())

return;




items.innerHTML="";




Object.entries(

snap.val()

)

.forEach(([id,i])=>{



if(i.active){



items.innerHTML+=


`

<tr>

<td>

${i.name}

</td>


<td>


<input

type="number"

class="score"

max="100"

data-weight="${i.weight}">


</td>



<td>

${i.weight}%

</td>



</tr>

`;



}


});


}







save.onclick=

async()=>{



let total=0;

let weight=0;




document

.querySelectorAll(".score")

.forEach(s=>{


let value=

Number(s.value)||0;


let w=

Number(s.dataset.weight);



total += value*w/100;

weight+=w;



});






await set(

ref(

db,

`evaluations/${teacher.value}/2025-2026/semester2/${user.role}`

),

{


score:total,


notes:notes.value,


improvements:improvements.value,


date:Date.now()


}

);







alert(

"تم حفظ التقييم"

);


};
