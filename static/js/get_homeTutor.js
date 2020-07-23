function getdemo(val){
    document.getElementById('sno').value=val;
    console.log(val)
window.location.href="#HTpopup1"
}

let pin=document.getElementById('pinCode').value
console.log(pin)
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
console.log(data)
document.getElementById('city').value=data[0]['PostOffice'][0]['District']+','+data[0]['PostOffice'][0]['State']
};
}
xh.onprogress = function(event) {
if (event.lengthComputable) {

} else {
//  alert('fff')
}

};

xh.onerror = function() {
alert("Request failed");
};
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
function submit(){
  let name=document.getElementById('fullname').value
  let phone=document.getElementById('phone').value
  let email=document.getElementById('email').value
  let address=document.getElementById('address').value
  let city=document.getElementById('city').value
  let pinCode=document.getElementById('pinCode').value
  let sno=document.getElementById('sno').value
  var demo=document.getElementById('getdemo')
  console.log(name,phone)
let xhr = new XMLHttpRequest();
xhr.open('POST', '/getDemo',true);
xhr.setRequestHeader('X-CSRFToken', csrftoken);       
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Accept", "application/json");
xhr.send(JSON.stringify({'name': name,'email':email,'phone':phone,'address':address,'city':city,'pinCode':pinCode,'sno':sno}));
xhr.onload = function() {
if (xhr.status != 200) { 
  alert(`Error ${xhr.status}: ${xhr.statusText}`); 
} else { 
  data=JSON.parse(xhr.responseText)
  demo.innerHTML='registered'
  demo.disabled=true
  console.log(data)
};
}
xhr.onprogress = function(event) {
if (event.lengthComputable) {
 console.log('pro')

} else {
 alert('fff')
}

};

xhr.onerror = function() {
alert("Request failed");
};
}