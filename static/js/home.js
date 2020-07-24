
if(document.getElementById('mySidenav').style.width != 0){
    document.querySelector('.searchForm').style.display='none'
}
// document.querySelector('.dropbtn').addEventListener('click',function(){
//     console.log('ff')
//     document.querySelector('.searchSection').style.display='none'
// })
// document.querySelector('.closebtn').addEventListener('click',function(){
//     console.log('ff')
//     document.querySelector('.searchSection').style.display='block'
// })


if(getComputedStyle(document.querySelector('.mobile_Nav')).display === 'none'){
let flag = false;
window.addEventListener('scroll', function(e) {
   
        window.requestAnimationFrame(function() {
            var scrollTop = window.pageYOffset

            if(scrollTop !==0){
      document.getElementById('myTopnav').style.backgroundColor='white'
      document.getElementById('myTopnav').style.boxShadow='0 0 5px 0 black'
      document.querySelector('.logo').style.color='black'
      document.querySelector('.dropbtn').style.color='black'
      document.querySelector('.role').style.color='black'
      document.querySelector('.myCourses').style.color='black'
    }
    
            if(scrollTop === 0){
      document.getElementById('myTopnav').style.backgroundColor='rgb(30, 70, 227,0)'
      document.getElementById('myTopnav').style.boxShadow='0 0 0 0 black'
      document.querySelector('.logo').style.color='white'
      document.querySelector('.dropbtn').style.color='white'
      document.querySelector('.myCourses').style.color='white'
      let role=document.querySelector('.role');
     role.style.color='white'
      role.addEventListener('mouseover',function(){
      role.style.color='black'
      })
      role.addEventListener('mouseleave',function(){
      role.style.color='white'
      })
    }
    
    });
    });

  }
 function studentHT(){
   document.querySelector('body').innerHTML+=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  You need to login as a Teacher to become a home tutor
 </div>
 </div>`
 }
 function login(){
  document.querySelector('body').innerHTML+=`<div class="alert alert-error alert-dismissible" role="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  You need to login as a Teacher to become a home tutor
 </div>
 </div>`
 }