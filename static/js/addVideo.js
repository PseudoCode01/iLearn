var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} 
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.classList.remove("active");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.classList.add("active");
    }
  });
}
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
} 
var xhr = new XMLHttpRequest();
function sendForm(val,element){
var file1=document.getElementById('thumbnail'+val).files[0]
var file2=document.getElementById('video'+val).files[0]
var file3=document.getElementById('resources'+val).files[0]

if(file1.size/1024>150 || file2.size/1024>(512*1024) || (file3!==undefined && file3.size/1024>1024)){
  document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Files not in required format.
 </div> ` 
}
else{
var formData = new FormData();
formData.append("thumbnail", file1);
formData.append("video", file2);
formData.append("resources", file3);
formData.append("title", document.getElementById('videoTitle'+val).value);
formData.append("courseSno", val);



  xhr.open('POST', '/video',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  var elem = document.getElementById('bar'+val);
  var width = 0;
  
  xhr.onload = function() {
    
  if (xhr.status != 200) { 
    // alert(`Error ${xhr.status}: ${xhr.statusText}`); 
    document.getElementById('thumbnail'+val).disabled=false
    document.getElementById('video'+val).disabled=false
    document.getElementById('resources'+val).disabled=false
    document.getElementById('videoTitle'+val).disabled=false
    document.getElementById('progress'+val).style.visibility='hidden';
    element.style.display='block';
    document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Error! 
 </div> `
  } else { 
    data=JSON.parse(xhr.responseText)
   document.getElementById('message'+val).innerHTML=`<div class="alert alert-success alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Video has been uploaded
 </div> `
    document.getElementById('thumbnail'+val).disabled=false
    document.getElementById('video'+val).disabled=false
    document.getElementById('resources'+val).disabled=false
    document.getElementById('videoTitle'+val).disabled=false
    document.getElementById('thumbnail'+val).value=''
    document.getElementById('video'+val).value=''
    document.getElementById('resources'+val).value=''
    document.getElementById('videoTitle'+val).value=''
    document.getElementById('progress'+val).style.visibility='hidden';
    element.style.display='block';
};
}
xhr.upload.onloadstart=function(e){
  document.getElementById('thumbnail'+val).disabled=true
  document.getElementById('video'+val).disabled=true
  document.getElementById('resources'+val).disabled=true
  document.getElementById('videoTitle'+val).disabled=true
  document.getElementById('progress'+val).style.visibility='visible';
  element.style.display='none';
}
xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    var done = e.position || e.loaded
    var total = e.totalSize || e.total;
    width=Math.round((done/total)*100);
    elem.style.width = width + "%";
  } else {
  
  }

};
xhr.send(formData);
xhr.onerror = function() {
  alert("Request failed");
};
}
}
function abort(val){
  xhr.abort();
  document.getElementById('thumbnail'+val).disabled=false
  document.getElementById('video'+val).disabled=false
  document.getElementById('resources'+val).disabled=false
  document.getElementById('videoTitle'+val).disabled=false
  document.getElementById('progress'+val).style.visibility='hidden';
  document.getElementById('add'+val).style.display='block';
  document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Uploading canceled by user
 </div> `
}
function remove(val,x){
  
  let url='staff/verification'
  
  fetch(url,{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'courseId': val,'action':'Selfremove','message':''})
  })
  .then((response)=>{
      return response.json()
  })
  .then((data)=>{
    var x2 = x.parentElement.parentElement.parentElement.parentElement.parentElement;
  x2.style.display='none'
      alert(data)
      
  })
}

function play(val,pos){
  var modalPreview = document.querySelector(".modal-preview");
  document.querySelector(".pre").innerHTML=`<video  id="vp" width="100%" height="400px" controls poster='/media/${pos}'>
  <source id="source" src="/media/${val}" type="video/mp4">
  Your browser does not support the video tag.
  </video>`
  var span = document.getElementsByClassName("closepreview")[0];
  modalPreview.style.display = "block";
  
  
  span.onclick = function() {
    modalPreview.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modalPreview) {
      modalPreview.style.display = "none";
    }
  }}