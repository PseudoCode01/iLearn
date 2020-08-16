let e=document.querySelectorAll('.bottom')

for(let l of e){
if(l.childElementCount==2){
          l.innerHTML+=`<button onclick="getdemo(${l.children[0].value})" id="getdemo${l.children[0].value}">GET DEMO</button>`
}
}
function getdemo(val){
    document.getElementById('sno').value=val;
window.location.href="#HTpopup1"
}
if(document.getElementById('pinCode')!=null){
let pin=document.getElementById('pinCode').value
val=Number(pin)
let xh = new XMLHttpRequest();
let url='https://api.postalpincode.in/pincode/'+pin
xh.open('GET', url);
xh.send();
var data='fg'
xh.onload = function() {
if (xh.status != 200) { 
alert(`Error ${xh.status}: ${xh.statusText}`); 
} else { 
data=JSON.parse(xh.responseText)
if(document.getElementById('city')!=null){
document.getElementById('city').value=data[0]['PostOffice'][0]['District']+','+data[0]['PostOffice'][0]['State']}
if(document.getElementById('wcity')!=null){
document.getElementById('wcity').value=data[0]['PostOffice'][0]['District']+','+data[0]['PostOffice'][0]['State']}
document.querySelector('.con').disabled=false
};
}
xh.onprogress = function(event) {
if (event.lengthComputable) {
if(document.getElementById('city')!=null){
  document.getElementById('city').value=`Fetching...`}
if(document.getElementById('wcity')!=null){

  document.getElementById('wcity').value=`Fetching...`}

} else {
//  alert('fff')
}

};

xh.onerror = function() {
alert("Request failed");
};}
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
function submit(val){
  let name=document.getElementById('fullname').value
  let phone=document.getElementById('phone').value
  let email=document.getElementById('emaill').value
  var reg='One-One'
  var address=''
  var city=''
  var pinCode=0
  if(document.getElementById('address')!=null){
    reg='Home Tutor'
  address=document.getElementById('address').value
  city=document.getElementById('city').value
  pinCode=document.getElementById('pinCode').value}
  var sno=document.getElementById('sno').value
  var demo=document.getElementById('getdemo'+sno)
let xhr = new XMLHttpRequest();
xhr.open('POST', '/getDemo',true);
xhr.setRequestHeader('X-CSRFToken', csrftoken);       
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Accept", "application/json");
xhr.send(JSON.stringify({'name': name,'email':email,'phone':phone,'address':address,'city':city,'pinCode':pinCode,'sno':sno,'reg':reg}));
xhr.onload = function() {
if (xhr.status != 200) { 
  alert(`Error ${xhr.status}: ${xhr.statusText}`); 
} else { 
  data=JSON.parse(xhr.responseText)
  val.innerHTML='CONFIRM'
  window.location.href='#'
  demo.innerHTML='REGISTERED'
  demo.disabled=true
};
}
xhr.onprogress = function(event) {
if (event.lengthComputable) {
 val.innerHTML`<div class="loader"><div id="loader-container">
 <svg viewBox="0 0 100 100">
   <defs>
     <filter id="shadow">
       <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
         flood-color="#fc6767"/>
     </filter>
   </defs>
   <circle id="spinner" style="fill:transparent;stroke:#fc6767;stroke-width: 7px;stroke-linecap: round;filter:url(#shadow);" cx="50" cy="50" r="45"/>
</svg>
</div></div>`
} else {

}

};

xhr.onerror = function() {
alert("Request failed");
};
}
function req_tution(val){
  console.log('fgh')
  let name=document.getElementById('wfullname').value
  let phone=document.getElementById('wphone').value
  let email=document.getElementById('wemail').value
  let amt=document.getElementById('amt').value
  var reg='One-One'
  var address=''
  var city=''
  var pinCode=0
  if(document.getElementById('waddress')!=null){
    reg='Home Tutor'
  address=document.getElementById('waddress').value
  city=document.getElementById('wcity').value
  pinCode=document.getElementById('pinCode').value}
  let xhr = new XMLHttpRequest();
xhr.open('POST', '/request_tution',true);
xhr.setRequestHeader('X-CSRFToken', csrftoken);       
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Accept", "application/json");
xhr.send(JSON.stringify({'name': name,'email':email,'amt':amt,'phone':phone,'address':address,'city':city,'pinCode':pinCode,'reg':reg}));
xhr.onload = function() {
if (xhr.status != 200) { 
  alert(`Error ${xhr.status}: ${xhr.statusText}`); 
} else { 
  data=JSON.parse(xhr.responseText)
  val.innerHTML='CONFIRM'
  window.location.href='#'
  demo.innerHTML='REGISTERED'
  demo.disabled=true
};
}
xhr.onprogress = function(event) {
if (event.lengthComputable) {
 val.innerHTML=`<div class="loader"><div id="loader-container">
 <svg viewBox="0 0 100 100">
   <defs>
     <filter id="shadow">
       <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
         flood-color="#fc6767"/>
     </filter>
   </defs>
   <circle id="spinner" style="fill:transparent;stroke:#fc6767;stroke-width: 7px;stroke-linecap: round;filter:url(#shadow);" cx="50" cy="50" r="45"/>
</svg>
</div></div>`

} else {

}

};

xhr.onerror = function() {
alert("Request failed");
};
}