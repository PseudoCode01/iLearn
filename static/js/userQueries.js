if( document.getElementById("get_result")!==null){
    var modalquery = document.querySelector(".modal-query");
    // Get the button that opens the Sign Up modal
    var btn = document.getElementById("get_result");
    var span = document.getElementsByClassName("closequery")[0];
    // btn.onclick = function() {
    //   modalquery.style.display = "block";
    // }
    
    span.onclick = function() {
      modalquery.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modalquery) {
        modalquery.style.display = "none";
      }
    }
    }
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
      
      
      
function fetch_query(){
    var modalquery = document.querySelector(".modal-query");
    modalquery.style.display = "block";
    let uname=document.getElementById('search').value;
    console.log('uname')
    if(uname.length > 2){
        let xhr = new XMLHttpRequest();
  xhr.open('POST', 'fetch_query');
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");

xhr.send(JSON.stringify({'uname':uname}));

xhr.onload = function() {
let content=``
  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    data=JSON.parse(xhr.responseText)
    console.log(data['fetched_queries'].length )
    if(data['fetched_queries'].length < 1){
        document.querySelector('.modal-body').innerHTML=`<h2>No queries raised yet</h2>`
    }
    else{
    for(let item of data['fetched_queries'])
    {
        content+=`<div><h3>${item['name']}</h3>
        <h5>${item['timeStamp']}</h5>
        </div>
                  <h6>${item['email']}</h6>
                  <p>Q:${item['content']}</p>
                  <p>Ans:${item['answered']}</p>
                  <hr>
                  `
    }
    document.querySelector('.modal-body').innerHTML=content
} 
};
}
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    // alert('progress')
  } else {
  //  alert('fff')
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
}
}


function mark(val){
let id=val.dataset.id;
let xhr = new XMLHttpRequest();
  xhr.open('POST', 'markasAns');
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");

xhr.send(JSON.stringify({'id':id}));

xhr.onload = function() {
let content=``
  if (xhr.status != 200) { 
    alert(`Error ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    data=JSON.parse(xhr.responseText)
   val.parentElement.style.display='none';
} 
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    // alert('progress')
  } else {
  //  alert('fff')
  }

};

xhr.onerror = function() {
  alert("Request failed");
};

}