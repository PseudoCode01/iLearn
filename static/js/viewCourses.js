

function add(val){
    updateUserOrder(val.dataset.product,val.dataset.action)
}

function updateUserOrder(courseId,action){
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
        Cart()
    })
}
if(document.querySelectorAll('.title')==undefined){
console.log(document.querySelectorAll('.titlel'))
}