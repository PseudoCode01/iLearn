

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
    let url='/addCart'
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'courseId': courseId,'action':action})
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        Cart()
        var x = val.parentElement;
        x.innerHTML= `
        <button class="goCart">Go To Cart</button>`
    })
}
if(document.querySelectorAll('.title')==undefined){
console.log(document.querySelectorAll('.titlel'))
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
  course+=`<div class="item">
  <img src="/media/${item['courseThumbnail']}" alt="">
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
       <button data-product="${item['sno']}" data-action="add" type="button" class="addCart" onclick="add(this)">Add To Cart</button>
    </div> 
    </div> `
}
 }
}
 document.querySelector('.container').innerHTML=course;
};

xh.onprogress = function(event) {
if (event.lengthComputable) {
  
} else {
//  alert('fff')
}

};

xh.onerror = function() {
alert("Request failed");
};
}

console.log(document.querySelectorAll('.title'))