document.getElementById('myRange').addEventListener('input',function(val){
    document.querySelector('.value').innerHTML ="Rs : " +document.getElementById('myRange').value;
    localStorage.setItem('price',document.getElementById('myRange').value)
})
let id=document.getElementById('id').value;
var lang=""
let status ="False";

// document.querySelector('.save').addEventListener('click',function(lang){
//     lang=document.getElementById('setLang').value
//     localStorage.setItem('lang',lang)
//     document.querySelector('form').action="/saveCourse" 
// })
status=document.getElementById('status').value;
if(status=="True"){
    document.getElementById('savedLang').value=localStorage.getItem('lang')
    document.getElementById('pricing').value="Rs:"+localStorage.getItem('price')
    document.getElementById('lang').style.display="none";
    document.getElementById('savedLang').style.display="block";
    document.getElementById('pricing').style.display="block";
    document.getElementById('myRange').style.display="none";
    document.getElementById('value').style.display="none";  
    document.querySelector('.save').style.display="none";
    document.querySelector('.afterSave').style.display="flex";
    // document.querySelector('.delete').style.display="block";
  
    document.querySelector('.delete').addEventListener('click',function(){
        document.querySelector('form').action="/deleteCourse/"+id
    })
}



document.getElementById('cat').value=localStorage.getItem('cat');
console.log(document.getElementById('cat').value)
document.getElementById('title').value=localStorage.getItem('courseTitle');
function getfilesize(val){
    
    if(val.files[0].size/1024>512){
        val.style.border='1px solid red'
        document.querySelector('.save').disabled=true
    }
    else{
        document.querySelector('.save').disabled=false

    }
}
