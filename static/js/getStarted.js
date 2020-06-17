document.getElementById('previous').addEventListener('click',function(){   
    document.getElementById('TeacherCategory').style.display="flex";
    document.getElementById('title').style.display="none";
   })
   document.getElementById('next').addEventListener('click',function(){
    document.getElementById('TeacherCategory').style.display="none";
    document.getElementById('title').style.display="flex";
   })