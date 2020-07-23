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

function verify(val,x)
{
    x.parentElement.parentElement.style.display='none'
    let xh = new XMLHttpRequest();
        xh.open('POST', 'verifyhometutors');
        xh.setRequestHeader('X-CSRFToken', csrftoken);       
        xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xh.setRequestHeader("Accept", "application/json");
        xh.send(JSON.stringify({'sno':val,'action':x.dataset.action}));
        xh.onload = function() {
        if (xh.status != 200) { 
          alert(`Error ${xh.status}: ${xh.statusText}`); 
        } else { 
          data=JSON.parse(xh.responseText)
         alert(data)
        };
    }
        xh.onprogress = function(event) {
        if (event.lengthComputable) {
          
        } else {
       
        }
        
        };
        
        xh.onerror = function() {
        alert("Request failed");
        };
        
}