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
function edit(){
document.querySelector('.account').innerHTML=` <h2>Add payment method</h2>
<div class="upi">
<h5>UPI ID</h5>
<input type="text" id="upiid" placeholder="Enter your upi id">
</div>
<span>or</span>
<div>
<h5>Bank Account</h5>         
<div>
<label for="acc_no">Account No.</label>
<input type="text" id="accno" placeholder="Enter account number">
</div>
<div>
<label for="acc_ifsc">IFSC Code</label>
<input type="text" id="ifsc" placeholder="Enter IFSC Code">
</div>
<div>
<label for="acc_holder">Account holder</label>
<input type="text" id="accholder" placeholder="Enter account holder name">
</div>
</div>
<button class="add btn" onclick="addmethod('edit',this)">Save</button>`
}
function addmethod(action, val) {
  var x = val.parentElement;


  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/account', true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("Accept", "application/json");
  let upi = document.getElementById('upiid').value
  let acc = document.getElementById('accno').value
  let ifsc = document.getElementById('ifsc').value
  let accholder = document.getElementById('accholder').value
  if (upi.length > 0 && acc.length == 0 && ifsc.length == 0 && accholder.length == 0) {
    xhr.send(JSON.stringify({ 'upi': upi, 'acc': '', 'ifsc': '', 'accholder': '', 'action': action }));


  }
  else if (upi.length == 0 && acc.length > 0 && ifsc.length > 0 && accholder.length > 0) {
    xhr.send(JSON.stringify({ 'upi': '', 'acc': acc, 'ifsc': ifsc, 'accholder': accholder, 'action': action }));


  }
  else if (upi.length > 0 && acc.length > 0 && ifsc.length > 0 && accholder.length > 0) {

    document.querySelector('.alert-error').innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Only one of the method can be added`
    document.querySelector('.alert-error').style.display = 'block'
  }
  else {
    document.querySelector('.alert-error').innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Make sure all required fields are filled`
    document.querySelector('.alert-error').style.display = 'block'
  }
  xhr.onload = function () {
    if (xhr.status != 200) {
    } else {
      data = JSON.parse(xhr.responseText)
      document.querySelector('.account').innerHTML = `<h2>Payment method added</h2><button class="add btn" onclick="edit()">Edit</button><hr>`
    };
  }
  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      let p = val
      p.innerHTML = `<div class="loader"><div id="loader-container">
  <svg viewBox="0 0 100 100">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
        flood-color="#fc6767"/>
    </filter>
  </defs>
  <circle id="spinner" style="fill:transparent;stroke:#fc6767;stroke-width: 7px;stroke-linecap: round;filter:url(#shadow);" cx="50" cy="50" r="45"/>
  </svg>
  </div></div>`
    } else {
      alert('fff')
    }

  };

  xhr.onerror = function () {
    alert("Request failed");
  };

}
