document.getElementById("mySidenav").addEventListener('mouseover',function(){

    document.getElementById("mySidenav").style.width = "250px";
})
document.getElementById("mySidenav").addEventListener('mouseleave' ,function(){

    document.getElementById("mySidenav").style.width = "60px";
})
function profile(val){
    var modalprofile = document.getElementById("myModal");
    modalprofile.style.display = "block";
    var span = document.getElementById("closeprofile");
    span.onclick = function() {
        modalprofile.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modalprofile) {
          modalprofile.style.display = "none";
        }
      }
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


function TeacherProfile(val){
  let action =val.dataset.action
  let fname=document.getElementById('fname')
  let lname=document.getElementById('lname')
  let disc=document.getElementById('disc')
  console.log(fname.value,lname.value,disc.value)
var xhr = new XMLHttpRequest();
  xhr.open('POST', '/teacherProfile');
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");

xhr.send(JSON.stringify({'fname':fname.value,'lname':lname.value,'disc':disc.value,'action':action}));
xhr.onload = function() {

  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    data=JSON.parse(xhr.responseText)
    get_teacherProfile()
};
}
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    document.querySelector('.saveTprofile').innerHTML=` <div class="loader"><div id="loader-container">
    <svg viewBox="0 0 100 100">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
            flood-color="#fc6767"/>
        </filter>
      </defs>
      <circle id="spinner" style="fill:transparent;stroke:#fc6767;stroke-width: 7px;stroke-linecap: round;filter:url(#shadow);" cx="50" cy="50" r="45"/>
  </svg>
  </div></div> `
  } else {
  //  alert('fff')
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
}
function get_teacherProfile(){
var xhr2 = new XMLHttpRequest();
  xhr2.open('POST', '/get_teacherProfile');
  xhr2.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr2.setRequestHeader("Accept", "application/json");
xhr2.send();
xhr2.onload = function() {

  if (xhr2.status != 200) { 
    alert(`Error ${xhr2.status}: ${xhr2.statusText}`); 
  } else { 
    data=JSON.parse(xhr2.responseText)
    if(data['teacherProfile'][0]!==undefined){
    document.querySelector('.modal-body').innerHTML=`
    
        <table style="width:100%">
        <tr>
          <td>Firstname</td>
          <td id="fnameSaved">${data['teacherProfile'][0]['fname']}</td>
        </tr>
        <tr>
        <td>Lastname</td>
          <td id="lnameSaved">${data['teacherProfile'][0]['lname']}</td>
        </tr>
        <tr>
        <td>About</td>
          <td><textarea readOnly id="discSaved">${data['teacherProfile'][0]['disc']}</textarea></td>
        </tr>
      </table> 
        <button onclick="editTProfile(this)"  class="editTprofile row row-btn" >Edit</button>
    `
    }
};
}
xhr2.onprogress = function(event) {
  if (event.lengthComputable) {
    if(document.querySelector('.editTprofile')!==null){
    document.querySelector('.editTprofile').innerHTML=` <div class="loadingio-spinner-dual-ball-r8c8qw9ip7"><div class="ldio-q4l6k50whm">
    <div></div><div></div><div></div>
    </div></div> `}
  } else {
  //  alert('fff')
  }

};

xhr2.onerror = function() {
  alert("Request failed");
};
}
function displaysidenav(){
  console.log('fg')
  document.querySelector('.sidenav').style.width='250px'
  
}
function closedisplaysidenav(){
  document.querySelector('.sidenav').style.width='0'
}
let nav= document.querySelector('.sidenav')
    window.onclick = function(event) {
      // console.log(event)
      if (event.target == nav) {
        nav.style.width = "0";
      }
    }
get_teacherProfile()
function editTProfile(){
  let fname=document.getElementById('fnameSaved').innerText
  let lname=document.getElementById('lnameSaved').innerText
  let disc=document.getElementById('discSaved').value
  document.querySelector('.modal-body').innerHTML=`<div class="profile">
  <div class="row">
    <div class="col-25">
      <label for="fname">First Name:</label>
    </div>
    <div class="col-75">
      <input type="text" id="fname" name="firstname" placeholder="Your name.." value=${fname}>
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="lname">Last Name:</label>
    </div>
    <div class="col-75">
      <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${lname}>
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="disc">About Yourself:</label>
    </div>
    <div class="col-75">
      <textarea id="disc" name="disc" placeholder="About Yourself.." style="height:200px">${disc}</textarea>
    </div>
  </div>
  <div class="row row-btn">
    <button onclick="TeacherProfile(this)" data-action="edit" class="saveTprofile">Save</button>
  </div>
</div>
  `
}