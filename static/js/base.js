
// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }
if( document.getElementById("signUp")!==null){
var modalSignup = document.querySelector(".modal-signup");
// Get the button that opens the Sign Up modal
var btn = document.getElementById("signUp");
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
function searchQuery(){
  window.location.href="/search"
}
function openMobileNav(){
  document.querySelector('.topnav').style.width='250px'
}
function closeMobileNav(){
  document.querySelector('.topnav').style.width='0'
}
if( document.getElementById("signUp")!==null){
var modalLogin = document.querySelector(".modal-login");
// Get the button that opens the Log In modal
var btn = document.getElementById("logIn");
var span = document.getElementsByClassName("closelogin")[0];
btn.onclick = function() {
  modalLogin.style.display = "block";
}

span.onclick = function() {
  modalLogin.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
  }
}
}
//closeing the alert
if(document.querySelector('.closeAlert')!==null)
document.querySelector('.closeAlert').addEventListener('click',function(){
  document.querySelector('.alert').style.display='none'
})

//open side nav
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//open collapsiblle on sidebar
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


// getting selected category and sub_category to fetch required courses
function category(val){
  localStorage.setItem('cat',val.innerText)
}
function sub_category(val){
  localStorage.setItem('scat',val.innerText)
  window.location.href='/viewCourses'
}

function getToken(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
var csrftoken = getToken('csrftoken')




window.data=''
function Cart(){
// fetching item on cart via ajax
var xhr = new XMLHttpRequest();
  xhr.open('POST', '/get_cartItems');
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");

xhr.send();

let ci=``
xhr.onload = function() {
  var cart='';
  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    data=JSON.parse(xhr.responseText)
    data=(data['cartItems'])
    for(let item of data){
cart+=' '+item[0]['sno']
ci+=`
<div class="itemList">
<div>
<img class="thumbnail" src="/media/${item[0]['courseThumbnail']}" alt="">
<div>
<h3 data-id=${item[0]['id']} class="title">${item[0]['title'].toUpperCase()}</h3>
<p class "creater">By:${item[0]['creater_name']}</p></div>
</div>
<h3 class="pricing">Rs:${item[0]['pricing']}</h3>
</div>
`   }if( document.querySelector('.count')!==null){
    document.querySelector('.count').innerText=`${data.length}`
    document.querySelector('.cartItems').innerHTML=ci;}
   
localStorage.setItem('cart',cart)
  }

};

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
Cart()
function clearStorage(){
  localStorage.clear()
}