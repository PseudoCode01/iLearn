
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
document.querySelector('.closeAlert').addEventListener('click',function(){
  document.querySelector('.alert').style.display='none'
})