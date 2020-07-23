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
document.getElementById('vp').addEventListener('ended', function(e) {
    document.querySelector('.active-bar').children[1].children[1].innerHTML=`<img src="/static/img/watched.png" alt="">`
    let sno=document.getElementById('vp').dataset.id;
    let c_id=document.getElementById('creater').value;
    // document.getElementById('asKQuery').removeAttribute('disabled')
    let xh = new XMLHttpRequest();
    xh.open('POST', '/watched');
    xh.setRequestHeader('X-CSRFToken', csrftoken);       
    xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xh.setRequestHeader("Accept", "application/json");
    xh.send(JSON.stringify({'videoId':sno,'action':'watch','query':'','creater':c_id}));
    xh.onload = function() {
    if (xh.status != 200) { 
    
    } else { 
      data=JSON.parse(xh.responseText)
     console.log('aa')
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
    
});
function askQuery(){
let val=document.getElementById('studentQuery')
   let id=val.dataset.id;
   let q=document.getElementById('studentQuery').value
   document.getElementById('query').innerHTML=`<span  name="studentQuery" id="studentQuery" >Q: ${q}</span>
   `
   document.getElementById('w'+id).innerHTML+=` <input id='get_query${id}' type="hidden" value="${q}">
   <input id='get_answer${id}' type="hidden" value="">`
   let xh = new XMLHttpRequest();
    xh.open('POST', '/watched');
    xh.setRequestHeader('X-CSRFToken', csrftoken);       
    xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xh.setRequestHeader("Accept", "application/json");
    xh.send(JSON.stringify({'videoId':id,'action':'ask','query':q,'creater':''}));
    xh.onload = function() {
    if (xh.status != 200) { 
      alert(`Error ${xh.status}: ${xh.statusText}`); 
    } else { 
      data=JSON.parse(xh.responseText)
     console.log('dd')
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
}
function play(elem,val,res,id){
  if(document.getElementById('get_query'+id)!= null){
    let get_query= document.getElementById('get_query'+id).value
    if(get_query!='')
  {  
 document.getElementById('query').innerHTML=`
 <span data-id="${id}" name="studentQuery" id="studentQuery" >Q: ${get_query}</span>
 `
 let get_answer=document.getElementById('get_answer'+id).value
 if(get_answer != '')
 {
  document.getElementById('query').innerHTML+=`<br><br>
 <span  name="answer" id="answer" >Ans: ${get_answer}</span>
 ` 
 }
}
 else{
  document.getElementById('query').innerHTML=`
  <textarea data-id=${id} name="studentQuery" id="studentQuery" cols="100" rows="10" placeholder="Ask Your Query" ></textarea>
  <button  id="asKQuery"  onclick="askQuery(this)">Ask</button>
 `
 }
}
else if(document.getElementById('get_query'+id)!= null&& document.getElementById('get_query'+id).value==''){
 console.log('ss')
}
else{
  document.getElementById('query').innerHTML=`
  <textarea data-id=${id} name="studentQuery" id="studentQuery" cols="100" rows="10" placeholder="Ask Your Query" ></textarea>
  <button  id="asKQuery"  onclick="askQuery(this)">Ask</button>
 `
}
    document.querySelector('.active-bar').classList.replace('active-bar','video-bar')
    elem.classList.replace('video-bar','active-bar')
    let videocontainer=document.getElementById('vp')
    let ask=document.getElementById('studentQuery')
    console.log(ask)
    ask.dataset.id=id;
    let get_res=document.querySelector('.buttonDownload')
    get_res.href='/media/'+res;
    videocontainer.pause();
    videocontainer.dataset.id=id;
    document.getElementById('source').setAttribute('src','/media/'+val)
    videocontainer.load();
    videocontainer.play();
}
function opentab(evt, option) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    btn = document.getElementsByClassName("perBtn");
    for (i = 0; i < btn.length; i++) {
      btn[i].className = btn[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(option).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.querySelector('.default').click()

function  openVideos(){
  var x= document.querySelector('.videos')
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function rate(v){
let val=Number(v.dataset.val);
var n=0;
for(let item of document.querySelectorAll('.star')){
  item.classList.remove('rated')
}
for(let item of document.querySelectorAll('.star')){
  item.classList.add('rated')
n++;
if(n==val){
  document.querySelector('.stars').dataset.r=n;
  break;
}
}
}
if(document.querySelector('.alreadyrated')!==null){
 let n=0;
  let v=document.querySelector('.stars').dataset.rvalue;
  for(let item of document.querySelectorAll('.star')){
    item.classList.add('rated')
  n++;
  if(n==v){
    document.querySelector('.stars').dataset.r=n;
    break;
  }
  }

}
function editreview(val,e){
 document.querySelector('.rateCourse').innerHTML=`
 <h2>Add a public review</h2>
 <div class="stars">
     <span class="star" data-val="1" onclick="rate(this)"></span>
     <span class="star" data-val="2" onclick="rate(this)"></span>
     <span class="star" data-val="3" onclick="rate(this)"></span>
     <span class="star" data-val="4" onclick="rate(this)"></span>
     <span class="star" data-val="5" onclick="rate(this)"></span>
     </div> 
     <div class="writeReview">
         <label for="review">Add review</label>
         <textarea name="review"  id="review" cols="60" rows="10"></textarea>
     </div>
     <button class="addReview" onclick="addreview(${val},this)" data-action="editreview">Review</button>
 `
}
function addreview(val,e){
 
  let text=document.getElementById('review').value;
  let r=document.querySelector('.stars').dataset.r;
  let xh = new XMLHttpRequest();
    xh.open('POST', '/addReview');
    xh.setRequestHeader('X-CSRFToken', csrftoken);       
    xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xh.setRequestHeader("Accept", "application/json");
    xh.send(JSON.stringify({'csno':val,'textreview':text,'rvalue':r,'action':e.dataset.action}));
    xh.onload = function() {
    if (xh.status != 200) { 
      alert(`Error ${xh.status}: ${xh.statusText}`); 
    } else { 
      data=JSON.parse(xh.responseText)
     
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
}