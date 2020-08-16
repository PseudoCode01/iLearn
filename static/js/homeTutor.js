window.location.href = '#popup2'
var sel = ''
document.querySelector('.proceed').addEventListener('click', function () {
  let ele = document.getElementsByName('for')
  for (i = 0; i < ele.length; i++) {

    if (ele[i].type = "radio") {

      if (ele[i].checked) {
        sel = ele[i].value
  document.getElementById('reg_for').value = sel;
      }
    }
  }
  if (sel == 'One-One') {
    document.getElementById('state').style.display = 'none'
    document.getElementById('st').style.display = 'none'
    document.getElementById('pin').style.display = 'none'
    document.getElementById('pn').style.display = 'none'
    document.getElementById('district').style.display = 'none'
    document.getElementById('dt').style.display = 'none'
  }
})

function sliderChangeLower(val) {
  document.querySelector('.lowerValue').innerHTML = val;
}
function sliderChangeHigher(val) {
  document.querySelector('.higherValue').innerHTML = val;
}

function lowervalue(val) {
  document.querySelector('.amountHigher').setAttribute('min', val)
  document.querySelector('.amountHigher').value = val;
  document.querySelector('.higherValue').value = val;
}
function autocomp(val) {
  let t = val.value
  if (t.length !== 6) {
    val.style.border = '1px solid red'
  }
  if (t.length === 6) {
    val.style.border = '1px solid green'
    let xh = new XMLHttpRequest();
    let url = 'https://api.postalpincode.in/pincode/' + t
    xh.open('GET', url);
    xh.send();
    var data = 'fg'
    xh.onload = function () {
      if (xh.status != 200) {
        alert(`Error ${xh.status}: ${xh.statusText}`);
      } else {
        data = JSON.parse(xh.responseText)
        console.log(data)
        document.getElementById('district').value = data[0]['PostOffice'][0]['District']
        document.getElementById('state').value = data[0]['PostOffice'][0]['State']
      };
    }
    xh.onprogress = function (event) {
      if (event.lengthComputable) {

      } else {
        //  alert('fff')
      }

    };

    xh.onerror = function () {
      alert("Request failed");
    };


  }
}
var htm
function edit() {


  let sno = document.getElementById('sno').value;
  let name = document.getElementById('name').value;
  let age = document.getElementById('Age').value;
  let gender = document.getElementById('Gender').value;
  let fr = document.getElementById('rfor').value;
  let phone = document.getElementById('Phone').value;
  let email = document.getElementById('Email').value;
  if (document.getElementById('Pin') != null) {
    var pin = document.getElementById('Pin').value;
    var state = document.getElementById('State').value;
    var district = document.getElementById('District').value;
  }
  let subject = document.getElementById('Subjects').value;
  let classes = document.getElementById('Classes').value;
  let salary = document.getElementById('salary').value;
  let disc = document.getElementById('disc').value;
  salary = salary.split('-')
  salaryL = Number(salary[0].substring(2))
  salaryH = Number(salary[1].substring(2))

  document.querySelector('.tutorProfile').style.display = 'none'
  document.querySelector('.t2').style.display = 'flex'

  let htm = `
        <div class="container">
        <input type="hidden" name="action" id="action" value="edit">
        <input type="hidden" name="sno" id="sno" value="${sno}">
        <div class="for2">
        <label for="for"><b>Register for:</b></label>
        <div>
        <input type="radio" value="Home Tutor" onclick="check(this)"  name="for" id="ht" >
        <label for="ht">Home Tutor</label>
        <input type="radio" onclick="check(this)"  value="One-One" name="for" id="one" >
        <label for="one">One-One online</label>
        <input type="radio" onclick="check(this)"  value="Both" name="for" id="both" >
        <label for="both">Both</label>
      </div>
      </div>
            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Enter your full name" name="name" id="name" value="${name}" required>
            <br>      
            <label for="age"><b>Age</b></label>
            <input type="text" placeholder="Enter your age in numbers" name="age" id="age" value="${age}" required>
        <div class="gender">
          <label for="gender"><b>Gender:</b></label>
          <input type="radio" value="Male"  name="gender" id="male" >
          <label for="male">Male</label>
          <input type="radio" value="Female" name="gender" id="female" >
          <label for="female">Female</label>
          <input type="radio" value="Others" name="gender" id="others" >
          <label for="others">Rather not say</label>
        </div>
            <label for="number"><b>Phone number</b></label>
            <input type="text" placeholder="Enter your number" name="number" id="number" value="${phone}" required>
        
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" value="${email}" required>
            <input type="hidden" placeholder="Enter Email" value=${fr} name="reg_for" id="reg_for">
            `
  if (document.getElementById('Pin') != null) {
    htm += `<label for="pin"><b>Pin</b></label>
            <input type="text" oninput="autocomp(this)" placeholder="Enter your address" value="${pin}" name="pin" id="pin" required>
            <label for="District"><b>District</b></label>
            <input type="text" placeholder="Enter your address" name="district" id="district"  value="${district}" readonly required>
            <label for="State"><b>State</b></label>
            <input type="text" placeholder="Enter your address" name="state" id="state"  value="${state}" readonly required>`
  }
 else {
    htm += `<label for="pin" id="pn" style="display: none;"><b>Pin</b></label>
            <input type="text" oninput="autocomp(this)" placeholder="Enter your address" style="display: none;" name="pin" id="pin" >
            <label for="District" id="dt" style="display: none;"><b>District</b></label>
            <input type="text" placeholder="Enter your address" name="district" id="district" style="display: none;"   readonly >
            <label for="State" id="st" style="display: none;"><b>State</b></label>
            <input type="text"  placeholder="Enter your address" name="state" id="state" style="display: none;" readonly >`
  }
  htm += `<label for="subject"><b>Subject</b></label>
            <input type="text" placeholder="Enter subjects you want to teach" name="subject" id="subject" value="${subject}" required>
            <label for="Class"><b>Classes</b></label>
            <input type="text" placeholder="eg:6-8" name="classes" id="classes" oninput="checkexp(this)"  value="${classes}" required>
            <label for="disc"><b>About Yourself</b></label>
            <div class="discription">
            <textarea type="text" placeholder="Discribe Yourself"  name="disc" id="disc" value="${disc}" required>${disc}</textarea></div>
            <label for="id_proof"><b>Id_Proof</b></label>
            <div class="Id-proof">
            <input type="file" name="id_proof" id="id_proof" accept="image/*,.pdf"  required></div>
            <label for="ranger"><b>Enter the Salery Range</b></label>
            <div class="ranger">
           <div class="rangerLow">
             <label for="amountLower">Lower</label>
            <input type="range" onchange="lowervalue(this.value)" name="salaryL" min="0" max="5000"
            value="${salaryL}" class="amountLower slider" id="myRange" oninput="sliderChangeLower(this.value)" required>
            <output class="lowerValue"> </output>

          </div>
          <div class="rangerHigh">
            <label for="amountHigher">Higher</label>
            <input type="range" min="0" max="10000" value="${salaryH}" name="salaryH" class="amountHigher 
            slider" id="myRange" oninput="sliderChangeHigher(this.value)" required>
            <output class="higherValue"> </output>
          </div>
          </div>
            <hr>        
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="registerbtn">Save</button>
          </div>
    </form>
</div>`
  document.querySelector('form').innerHTML += htm;
  let ele = document.getElementsByName('for')
  for (i = 0; i < ele.length; i++) {

    if (ele[i].type = "radio") {

     if(ele[i].value==fr){
ele[i].checked=true
     }
    }
  }
  let elem = document.getElementsByName('gender')
  for (i = 0; i < elem.length; i++) {

    if (elem[i].type = "radio") {

     if(elem[i].value==gender){
elem[i].checked=true
     }
    }
  }
}
function check(val) {
  document.getElementById('reg_for').value=val.value
  if (val.checked) {
    if ((val.value == 'Home Tutor' || val.value=='Both') && getComputedStyle(document.getElementById('pin')).display=='none') {
      
    document.getElementById('pn').style.display='block'
    document.getElementById('')
    document.getElementById('pin').style.display='block'
    document.getElementById('state').style.display='block'
    document.getElementById('st').style.display='block'
    document.getElementById('dt').style.display='block'
    document.getElementById('district').style.display='block'
  }
   else if (val.value == 'One-One' && getComputedStyle(document.getElementById('pin')).display=='block') {
    document.getElementById('pn').style.display='none'
    document.getElementById('pin').style.display='none'
    document.getElementById('state').style.display='none'
    document.getElementById('st').style.display='none'
    document.getElementById('dt').style.display='none'
    document.getElementById('district').style.display='none'
  }
}
  else {
  }
}
function checkexp(val){
for(let i of val.value){
  if(i.charCodeAt(0)==44 || (i.charCodeAt(0)>=48&&i.charCodeAt(0)<=57)||i.charCodeAt(0)==32){
  val.style.border='2px solid green'
  document.querySelector('.registerbtn').disabled=false
  }
  else{
  val.style.border='2px solid red'
  document.querySelector('.registerbtn').disabled='true'

  }
}
}