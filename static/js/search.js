window.onload=myFunction();

function myFunction(){
    var cart=localStorage.getItem('cart').split(' ')
    for (item of document.querySelectorAll('.addCart')){
        if(cart.indexOf(item.dataset.product)!=-1){
           item.parentElement.innerHTML=` <button class="goCart" onclick="window.location.href='/cart'">Go To Cart</button>`
        }
    }
}
function add(val){
    updateUserOrder(val,val.dataset.product,val.dataset.action)
}
var set=new Set()
function updateUserOrder(val,courseId,action){
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
        var x = val.parentElement;
        x.innerHTML= `
        <button onclick="window.location.href='/search'" class="goCart">Go To Cart</button>`
    })
}