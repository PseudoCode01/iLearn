

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
  
function add(val){
    updateUserOrder(val,val.dataset.product,val.dataset.action)
}
var set=new Set()
function updateUserOrder(val,courseId,action){
    
    let xhr = new XMLHttpRequest();
xhr.open('POST', '/addCart',true);
xhr.setRequestHeader('X-CSRFToken', csrftoken);       
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Accept", "application/json");
xhr.send(JSON.stringify({'courseId': courseId,'action':action}));
xhr.onload = function() {
if (xhr.status != 200) { 
  alert(`Error ${xhr.status}: ${xhr.statusText}`); 
} else { 
  data=JSON.parse(xhr.responseText)
  var x = val.parentElement;
   x.innerHTML= `
  <button class="goCart"  onclick="window.location.href='/cart'">Go To Cart</button>`
  Cart()
};
}
xhr.onprogress = function(event) {
if (event.lengthComputable) {
  let p=val.parentElement;
  p.innerHTML=`<div class="loader"><div id="loader-container">
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
console.log('progress')

} else {
 alert('fff')
}

};

xhr.onerror = function() {
alert("Request failed");
};

}


let cat=localStorage.getItem('cat')
let scat=localStorage.getItem('scat')
var cart='';
if(localStorage.getItem('cart')!==null)
{cart=localStorage.getItem('cart').split(' ')}

let xh = new XMLHttpRequest();
xh.open('POST', '/get_viewCourses');
xh.setRequestHeader('X-CSRFToken', csrftoken);       
xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xh.setRequestHeader("Accept", "application/json");
xh.send(JSON.stringify({'cat':cat,'scat':scat}));
var data='fg'
xh.onload = function() {
if (xh.status != 200) { 
  alert(`Error ${xh.status}: ${xh.statusText}`); 
} else { 
  data=JSON.parse(xh.responseText)
  var flag =false;
let course=``;
 for (let item of data['courses']){
    flag =false;
  course+=`<div  class="item">
  <img onclick="window.location.href='/previewCourse/${item['sno']}'" src="/media/${item['courseThumbnail']}" alt="">
  <div class="courseInfo">
  <h4>${item['title'].toUpperCase()}</h4>
  <h5>Rs: ${item['pricing']}</h5>
  <p>Created By- ${item['creater_name']}</p>
  <p>Date- ${item['timeStamp'].toString().slice(0,10)}</p>
</div>`
if(cart.length===0){
    course+=`<div class="addcart btn-cart">
       <button class="addCart">Add To Cart</button>
    </div> 
    </div> `
}
        else{
for (let i of cart){
    if(i==item['sno']){
     course+=`<div class="btn-cart">
   <button class="goCart" onclick="window.location.href='/cart'">Go To Cart</button>
</div> 
</div> `
flag=true;
break;
    }
}
if(flag===false){
    course+=`<div class="addcart btn-cart">
       <button data-product="${item['sno']}" data-action="add" type="button" class="addCart " onclick="add(this)">Add To Cart</button>
    </div> 
    </div> `
}
 }
}
 document.querySelector('.container').innerHTML=course;
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

console.log(document.querySelectorAll('.title'))