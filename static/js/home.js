// let search=document.querySelector('.searchSection')
// let dropdown=document.querySelector('.dropdown')
// dropdown.addEventListener('mouseover',function(){
//     search.style.zIndex="-1"
// })
// dropdown.addEventListener('mouseleave',function(){
//     search.style.zIndex="0"
// })
if(document.getElementById('mySidenav').style.width != 0){
    document.querySelector('.searchForm').style.display='none'
}
document.querySelector('.dropbtn').addEventListener('click',function(){
    console.log('ff')
    document.querySelector('.searchSection').style.display='none'
})
document.querySelector('.closebtn').addEventListener('click',function(){
    console.log('ff')
    document.querySelector('.searchSection').style.display='block'
})