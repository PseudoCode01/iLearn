let flag =1;

document.getElementById('previous').addEventListener('click',function(){ 
    document.getElementById('TeacherCategory').style.display="flex";
    document.getElementById('title').style.display="none";
    flag=1
})
var cat=0;
document.getElementById('next').addEventListener('click',function(){
   let cat=document.getElementById('cat').value 
    let subcat=document.getElementById('sub-cat').value
    localStorage.setItem('cat',cat)
    localStorage.setItem('subcat',subcat)
    console.log(cat.value);
       flag++;
    document.getElementById('TeacherCategory').style.display="none";
    document.getElementById('title').style.display="flex";
    if(flag==3){
    let title=document.getElementById('courseTitle').value 
    localStorage.setItem('courseTitle',title)
    window.location.href = "/saveCourse";
    }
})


