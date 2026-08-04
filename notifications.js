////////////////////////////////////////////////////
// NOTIFICATIONS
////////////////////////////////////////////////////


import {

currentUser

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





const user=

currentUser();






loadNotifications();









async function loadNotifications(){



const box=

document.getElementById(

"notifications"

);





if(!box)

return;







const snap=

await get(

ref(

db,

`notifications/${user.uid}`

)

);







if(!snap.exists()){


box.innerHTML=

"لا توجد تنبيهات";


return;


}







box.innerHTML="";








Object.entries(

snap.val()

)

.forEach(([id,n])=>{



box.innerHTML +=


`

<div class="card">


<h4>

${n.title}

</h4>


<p>

${n.message}

</p>


<button

class="btn btn-primary"

onclick="readNotification('${id}')">

تمت القراءة

</button>


</div>

`;



});



}









window.readNotification=

async function(id){



await update(

ref(

db,

`notifications/${user.uid}/${id}`

),

{


read:true

}

);



loadNotifications();



};
