
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
  
function verification(val){
    updateUserOrder(val,val.dataset.product,val.dataset.action)
}
var set=new Set()
function updateUserOrder(val,courseId,action){
    let url='verification'
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
        var x = val.parentElement;
        alert(data)
        // x.innerHTML= `
        // <button class="goCart"  onclick="window.location.href='/cart'">Go To Cart</button>`
    })
}

function player(val){
    var modalSignup = document.getElementById("myModal"+val.dataset.id);
    modalSignup.style.display = "block";
    var span = document.getElementById("closeplay"+val.dataset.id);
    span.onclick = function() {
        modalSignup.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modalSignup) {
          modalSignup.style.display = "none";
        }
      }
} 
    window.onclick = function(event) {
      if (event.target == modalSignup) {
        modalSignup.style.display = "none";
      }
    }
    