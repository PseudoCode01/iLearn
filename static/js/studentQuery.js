function answered(){
    let answer=document.getElementById('answer').value
    let id=document.getElementById('sno').value
    let user=document.getElementById('user').value
       let xh = new XMLHttpRequest();
        xh.open('POST', '/watched');
        xh.setRequestHeader('X-CSRFToken', csrftoken);       
        xh.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xh.setRequestHeader("Accept", "application/json");
        xh.send(JSON.stringify({'videoId':id,'action':'answer','answer':answer,'user':user}));
        xh.onload = function() {
        if (xh.status != 200) { 
          alert(`Error ${xh.status}: ${xh.statusText}`); 
        } else { 
          data=JSON.parse(xh.responseText)
         
        };
        
        xh.onprogress = function(event) {
        if (event.lengthComputable) {
          
        } else {
       
        }
        
        };
        
        xh.onerror = function() {
        alert("Request failed");
        };
        }
    }