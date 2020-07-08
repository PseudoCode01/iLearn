document.getElementById("mySidenav").addEventListener('mouseover',function(){

    document.getElementById("mySidenav").style.width = "250px";
})
document.getElementById("mySidenav").addEventListener('mouseleave' ,function(){

    document.getElementById("mySidenav").style.width = "60px";
})
function displaysidenav(){
    document.querySelector('.sidenav').style.width='250px'
    
  }
  function closedisplaysidenav(){
    document.querySelector('.sidenav').style.width='0'
  }