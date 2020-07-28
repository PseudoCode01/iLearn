function opentab(evt, option) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    btn = document.getElementsByClassName("perBtn");
    for (i = 0; i < btn.length; i++) {
      btn[i].className = btn[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(option).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.querySelector('.default').click()

  for(let item of document.querySelectorAll('.reviewstars')){
    let v=item.dataset.rvalue;
    n=0;
    
    for(let i of item.children){
      if(n==v){
        // document.querySelector('.stars').dataset.r=n;
        break;
      }
        i.classList.add('rated')
      n++;
      }
}
