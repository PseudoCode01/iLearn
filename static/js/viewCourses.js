// function add(){
    
// var xhr = new XMLHttpRequest();

// // Setup our listener to process completed requests
// xhr.onload = function (e) {
   
// 	// Process our return data
// 	if (xhr.status >= 200 && xhr.status < 300) {
// 		// What do when the request is successful
// 		alert(xhr.responseText);
// 	} else {
// 		// What do when the request fails
// 		alert('The request failed!');
// 	}

// 	// Code that should run regardless of the request status
//     alert('This always runs...');
// };

// // Create and send a GET request
// // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// // The second argument is the endpoint URL
// xhr.open('GET', "/addCart");
// xhr.send()}

function add(val){
    updateUserOrder(val.dataset.product,val.dataset.action)
}

function updateUserOrder(courseId,action){
    alert('sending data')
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
       alert(data)
    })
}