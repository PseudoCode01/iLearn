// let cart=localStorage.getItem('cart').split(' ')
// let data=document.querySelector('.cn').dataset.id
// console.log(data)
window.onload=myFunction();

function myFunction(){
    var cart=localStorage.getItem('cart').split(' ')
   let item= document.querySelector('.addCart')
        if(cart.indexOf(item.dataset.product)!=-1){
           document.querySelector('.cart').innerHTML=`<div class="addcart btn-cart"> <button class="goCart" onclick="window.location.href='/cart'">Go To Cart</button></div>
           <div class="addcart btn-cart"> <button class="goCart" onclick="window.location.href='/cart'">Buy Now</button></div>`

        }
        let star=document.querySelector('.stars')
        let rating=parseInt(star.dataset.rating)
        let rated=parseInt(star.dataset.rated)
        console.log((rating))
        if(rated!=0){
         let rate=(rating/rated)
         document.querySelector('.rate').innerText=rate.toPrecision(2)+'/5'
        }
        let colStar=document.querySelectorAll('.star')
        let c=0;
        for(let item of colStar){
c=c+1;
         item.classList.add('rated')
         if(c===Math.floor(rating/rated)){
             break;
         }
        }
}