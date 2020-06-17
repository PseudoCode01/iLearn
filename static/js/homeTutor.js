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