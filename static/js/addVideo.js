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
   
    console.log(this)
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
function sendForm(){
var file1=document.getElementById('thumbnail').files[0]
// var file = this.files[0];
console.log(file1)
var formData = new FormData(document.getElementById('formData'));
formData.append("thefile", file1,file1.name);
console.log(formData)
var xhr = new XMLHttpRequest();
  xhr.open('POST', '/video');
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(formData);
  xhr.onload = function() {

  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    data=JSON.parse(xhr.responseText)
    

};
}
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    // alert('progress')
  } else {
  //  alert('fff')
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
}