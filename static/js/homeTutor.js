function sliderChangeLower(val) {
    document.querySelector('.lowerValue').innerHTML = val;
    }
      function sliderChangeHigher(val) {
    document.querySelector('.higherValue').innerHTML = val;
    }
    function displayRadioValue() { 
        var ele = document.getElementsByName('gender'); 
          console.log(ele)
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
           console.log(ele[i].value)
        } 
    } 
    displayRadioValue()
document.querySelector('.registerbtn').addEventListener('click',function(){
    displayRadioValue()
})
function autocomp(val){
  let t=val.value
  if(t.length!==6){
    val.style.border='1px solid red'
  }
  if(t.length===6){
    val.style.border='1px solid green'
    let xh = new XMLHttpRequest();
    let url='https://api.postalpincode.in/pincode/'+t
xh.open('GET', url);
xh.send();
var data='fg'
xh.onload = function() {
if (xh.status != 200) { 
  alert(`Error ${xh.status}: ${xh.statusText}`); 
} else { 
  data=JSON.parse(xh.responseText)
  console.log(data)
document.getElementById('district').value=data[0]['PostOffice'][0]['District']
document.getElementById('state').value=data[0]['PostOffice'][0]['State']
};

xh.onprogress = function(event) {
if (event.lengthComputable) {
  
} else {
//  alert('fff')
}

};

xh.onerror = function() {
alert("Request failed");
};
  }
  console.log(t.length)
}
}