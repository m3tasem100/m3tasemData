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






loadItems();







// إضافة عنصر

addBtn.onclick=

async()=>{



let name=

itemName.value.trim();



let weight=

Number(itemWeight.value);





if(!name || !weight)

return;






let id=

push(

ref(db,"evaluationItems")

).key;







await set(

ref(

db,

"evaluationItems/"+id

),

{


name:name,


weight:weight,


active:true



}

);






itemName.value="";

itemWeight.value="";



loadItems();



};









async function loadItems(){



itemsTable.innerHTML="";






const snap=

await get(

ref(db,"evaluationItems")

);





if(!snap.exists())

return;






Object.entries(

snap.val()

)

.forEach(([id,item])=>{





itemsTable.innerHTML +=


`

<tr>


<td>

${item.name}

</td>


<td>

${item.weight}%

</td>



<td>

${item.active ?

"فعال":

"معطل"}

</td>




<td>


<button

onclick="toggleItem('${id}',${item.active})"

class="btn btn-success">


تفعيل/تعطيل


</button>



<button

onclick="deleteItem('${id}')"

class="btn btn-danger">


حذف


</button>


</td>



</tr>


`;



});



}









window.toggleItem=

async function(id,status){



await update(

ref(

db,

"evaluationItems/"+id

),

{


active:!status


}

);



loadItems();


};









window.deleteItem=

async function(id){



if(!confirm("حذف العنصر؟"))

return;



await remove(

ref(

db,

"evaluationItems/"+id

)

);



loadItems();


};
