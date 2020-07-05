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
    let xh = new XMLHttpRequest();
    xh.open('POST', '/watched');
    xh.setRequestHeader('X-CSRFToken', csrftoken);       
    xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xh.setRequestHeader("Accept", "application/json");
    xh.send(JSON.stringify({'videoId':sno}));
    xh.onload = function() {
    if (xh.status != 200) { 
    //   alert(`Error ${xh.status}: ${xh.statusText}`); 
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
    
});
function play(elem,val,res,id){
    document.querySelector('.active-bar').classList.replace('active-bar','video-bar')
    elem.classList.replace('video-bar','active-bar')
    let videocontainer=document.getElementById('vp')
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