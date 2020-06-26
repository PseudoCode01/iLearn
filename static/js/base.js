
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
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
  console.log(this)
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
  document.getElementById('get_cat').value=val.innerText
}
function sub_category(val){
  document.getElementById('get_scat').value=val.innerText
  document.querySelector('.vc').submit();
}
// showing items inside on hover
// document.getElementById('cart').addEventListener('mouseenter',function(){
//   document.querySelector('.cartItems').style.display="block"
// })
// document.getElementById('cart').addEventListener('mouseleave',function(){
//   document.querySelector('.cartItems').style.display="none"
// })


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