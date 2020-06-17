
//become an instructor
if( document.getElementById("TeacherSignUp")!==null){
    var modalTeacherSignup = document.querySelector(".modal-Teachersignup");
    // Get the button that opens the Sign Up modal
    var btn = document.getElementById("TeacherSignUp");
    var span = document.getElementsByClassName("closeTeachersignup")[0];
    btn.onclick = function() {
      modalTeacherSignup.style.display = "block";
    }
    
    span.onclick = function() {
      modalTeacherSignup.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modalTeacherSignup) {
        modalTeacherSignup.style.display = "none";
      }
    }
    }