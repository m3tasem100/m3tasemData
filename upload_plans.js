////////////////////////////////////////////////////
// UPLOAD PLANS MODULE
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
set,
push

}

from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";





import * as XLSX

from "https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs";







protectPage([

"Manager"

]);






logoutBtn.onclick=logout;






window.backAdmin=function(){

location.href="admin.html";

};








// ===============================
// رفع الملف
// ===============================


uploadBtn.onclick=

async function(){



const file =

excelFile.files[0];






if(!file){


alert(
"اختر ملف Excel"
);


return;


}







const reader=

new FileReader();






reader.onload=

async function(e){





const data=

new Uint8Array(

e.target.result

);






const workbook=

XLSX.read(

data,

{

type:"array"

}

);








const sheet=

workbook.Sheets[

workbook.SheetNames[0]

];







const rows=

XLSX.utils.sheet_to_json(

sheet

);









await savePlans(rows);



};








reader.readAsArrayBuffer(file);



};











// ===============================
// حفظ Firebase
// ===============================


async function savePlans(rows){



const path =


`plans/${year.value}/${semester.value}/${grade.value}/${subject.value}/objectives`;






let count=0;







for(const row of rows){



const id=

push(

ref(db,path)

).key;








await set(

ref(

db,

`${path}/${id}`

),

{


unit:

row.Unit || "",



description:

row.Objective || "",



week:

Number(row.Week || 0),



lessons:

Number(row.Lessons || 0),



createdAt:

Date.now()


}

);




count++;



}








result.innerHTML=


`

تم رفع ${count} هدف بنجاح

`;



}
