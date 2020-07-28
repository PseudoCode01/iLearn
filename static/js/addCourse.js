if( document.getElementById("testvideo")!==null){
    var modalSignup = document.querySelector(".modal-signup");
    // Get the button that opens the Sign Up modal
    var btn = document.getElementById("testvideo");
    var span = document.getElementsByClassName("closesignup")[0];
    btn.onclick = function() {
      modalSignup.style.display = "block";
    }
    
    span.onclick = function() {
      modalSignup.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modalSignup) {
        modalSignup.style.display = "none";
      }
    }
    }
function submit(element){
var file1=document.getElementById('tvideo').files[0]


if(file1.size/1024>(30*1024)){
  document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Files size should be less 30mb.
 </div> ` 
}
else{
var formData = new FormData();
formData.append("video", file1);


var xhr = new XMLHttpRequest();

  xhr.open('POST', '/testvideo',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       

  xhr.send(formData);
  xhr.onload = function() {

  if (xhr.status != 200) { 
    
    document.getElementById('message').innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Error! 
 </div> `
  } else { 
    data=JSON.parse(xhr.responseText)
   document.getElementById('message').innerHTML=`<div class="alert alert-success alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Video has been uploaded
 </div> `
document.getElementById('progress').style.visibility='hidden';
 
};
}
xhr.onprogress = function(e) {
  if (e.lengthComputable) {
    var done = e.position || e.loaded
    var total = e.totalSize || e.total;
document.getElementById('progress').style.visibility='visible';
element.style.display='none';
var i=0;
   if (i == 0) {
    i = 1;
    var elem = document.getElementById('bar');
    var width = 0;
    var id = setInterval(frame,5);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width+=Math.round(done/total*100);
        elem.style.width = width + "%";
      }
    }
  }
 
  
  } else {
  
  }

};

xhr.onerror = function() {
  alert("Request failed");
};}}