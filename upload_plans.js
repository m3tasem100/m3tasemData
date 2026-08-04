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





protectPage([
"Manager"
]);




logoutBtn.onclick=logout;



window.backAdmin=function(){

location.href="admin.html";

};





let excelData=[];






file.onchange=function(e){


let reader=new FileReader();


reader.onload=function(event){


let data=new Uint8Array(

event.target.result

);



let workbook=

XLSX.read(data,{type:"array"});



let sheet=

workbook.Sheets[

workbook.SheetNames[0]

];



excelData=

XLSX.utils.sheet_to_json(sheet);




showPreview();


};



reader.readAsArrayBuffer(e.target.files[0]);

};









function showPreview(){


preview.innerHTML="";


excelData.forEach(row=>{


preview.innerHTML +=

`

<tr>

<td>
${row.Unit || ""}
</td>


<td>
${row.Objective || ""}
</td>


<td>
${row.Lessons || 0}
</td>


<td>
${row.Week || ""}
</td>


</tr>

`;

});


}









uploadBtn.onclick=

async function(){



if(excelData.length===0){

alert(
"اختر ملف Excel"
);

return;

}






const path=

`plans/${year.value}/${semester.value}/${grade.value}/${subject.value}/objectives`;








let counter=1;



for(let row of excelData){



await set(

ref(

db,

`${path}/${counter}`

),

{


unit:

row.Unit || "",



description:

row.Objective || "",



lessons:

Number(row.Lessons)||0,



week:

Number(row.Week)||0,



program:

program.value



}

);



counter++;



}







alert(

"تم رفع الخطة بنجاح"

);



};
