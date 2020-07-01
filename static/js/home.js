let search=document.querySelector('.searchSection')
let dropdown=document.querySelector('.dropdown')
dropdown.addEventListener('mouseover',function(){
    search.style.zIndex="-1"
})
dropdown.addEventListener('mouseleave',function(){
    search.style.zIndex="0"
})
