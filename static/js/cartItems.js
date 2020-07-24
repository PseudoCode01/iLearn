function remove(val){
    updateUserOrder(val,val.dataset.product,val.dataset.action)
}
var set=new Set()
function updateUserOrder(val,courseId,action){
let xh = new XMLHttpRequest();
xh.open('POST', '/addCart');
xh.setRequestHeader('X-CSRFToken', csrftoken);       
xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xh.setRequestHeader("Accept", "application/json");
xh.send(JSON.stringify({'courseId': courseId,'action':action}));
var data='fg'
xh.onload = function() {
if (xh.status != 200) { 
  alert(`Error ${xh.status}: ${xh.statusText}`); 
} else { 
  data=JSON.parse(xh.responseText)
  Cart()
  var x = val.parentElement.parentElement.parentElement;
 x.style.display='none' 
};
}
xh.onprogress = function(event) {
if(event.lengthComputable) {
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
//  alert('fff')
}
};
xh.onerror = function() {
alert("Request failed");
};
}