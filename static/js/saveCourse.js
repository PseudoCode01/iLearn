
document.getElementById('myRange').addEventListener('input',function(val){
    document.querySelector('.value').innerHTML ="Rs : " +document.getElementById('myRange').value;
})
// document.getElementById('cat').setAttribute(value,localStorage.getItem('cat'))
document.getElementById('cat').value="Class "+localStorage.getItem('cat');
document.getElementById('subcat').value=localStorage.getItem('subcat');
document.getElementById('title').value=localStorage.getItem('courseTitle');