// function getToken(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
//   }
//   var csrfToken = getToken('csrftoken')
//   var id=document.getElementById('sno').value
//   var status=document.getElementById('status').value
//   if(status=='OK'){
//   var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/add_myCourses');
//     xhr.setRequestHeader('X-CSRFToken', csrfToken);
//     xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//     xhr.setRequestHeader("Accept", "application/json");
  
//   xhr.send(JSON.stringify({'order_id':id}));
  
//   xhr.onload = function() {
//     var cart='';
//     if (xhr.status != 200) { 
//       alert(`Error ${xhr.status}: ${xhr.statusText}`); 
//     } else { 
//       data=JSON.parse(xhr.responseText)
//       console.log('success')
//     }
  
//   };
  
//   xhr.onprogress = function(event) {
//     if (event.lengthComputable) {
      
//     } else {
    
//     }
  
//   };
  
//   xhr.onerror = function() {
//     alert("Request failed");
//   };
//   }