
window.onload=myFunction();

function myFunction(){
    var cart=localStorage.getItem('cart').split(' ')
    let item= document.querySelector('.addCart')
    console.log(cart,item.dataset.product)
        if(cart.indexOf(item.dataset.product)!=-1){
           document.querySelector('.cart').innerHTML=`<div class="addcart btn-cart"> <button class="goCart" onclick="window.location.href='/cart'">Go To Cart</button></div>
           <div class="addcart btn-cart"> <button class="goCart" onclick="window.location.href='/cart'">Buy Now</button></div>`

        }
        let star=document.querySelector('.stars')
        let rating=parseInt(star.dataset.rating)
        let rated=parseInt(star.dataset.rated)
        if(rated!=0){
         let rate=(rating/rated)
         document.querySelector('.rate').innerText=rate.toPrecision(2)+'/5'
        
        let colStar=document.querySelectorAll('.star')
        let c=0;
        for(let item of colStar){
c=c+1;
         item.classList.add('rated')
         if(c===Math.floor(rating/rated)){
             break;
         }
        }}
        for(let item of document.querySelectorAll('.reviewstars')){
            let v=item.dataset.r;
            n=0;
            console.log(item.children)
            for(let i of item.children){
                i.classList.add('rated')
                console.log(i)
              n++;
              if(n==v){
                document.querySelector('.stars').dataset.r=n;
                break;
              }
              }
        }
}
function add(val){
  updateUserOrder(val,val.dataset.product,val.dataset.action)
}
var set=new Set()
function updateUserOrder(val,courseId,action){
var x = val.parentElement;
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
} else {
alert('fff')
}

};

xhr.onerror = function() {
alert("Request failed");
};

}
function preview(val,pos){
var modalPreview = document.querySelector(".modal-preview");
document.querySelector(".pre").innerHTML=`<video  id="vp" width="100%" height="400px" controls poster='/media/${pos}'>
<source id="source" src="/media/${val}" type="video/mp4">
Your browser does not support the video tag.
</video><span>Buy the course to unlock full content</span>`
var span = document.getElementsByClassName("closepreview")[0];
modalPreview.style.display = "block";


span.onclick = function() {
  modalPreview.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalPreview) {
    modalPreview.style.display = "none";
  }
}}