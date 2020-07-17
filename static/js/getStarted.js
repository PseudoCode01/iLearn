// let flag =1;

// document.getElementById('previous').addEventListener('click',function(){ 
//     document.getElementById('TeacherCategory').style.display="flex";
//     document.getElementById('title').style.display="none";
//     flag=1
// })
// var cat=0;
// document.getElementById('next').addEventListener('click',function(){
//    let cat=document.getElementById('cat').value 
//    let subcat=document.getElementById('sub-cat').value
//     localStorage.setItem('cat',cat)
//     localStorage.setItem('subcat',subcat)
//     console.log(cat.value);
//        flag++;
//     document.getElementById('TeacherCategory').style.display="none";
//     document.getElementById('title').style.display="flex";
//     if(flag==3){
//     let title=document.getElementById('courseTitle').value 
//     localStorage.setItem('courseTitle',title)
//     window.location.href = "/saveCourse";
//     }
// })


// function category(){
//     console.log('change')
//     if(document.getElementById('cat').value != 0){
//     document.querySelector('.subcategory').style.display='block'
//     document.querySelector('.category').style.display='none'
//     }
//     if(document.getElementById('cat').value == 1){
//         document.getElementById('sub-cat').innerHTML=`<option value="">Choose an Option</option>
//         <option value="Computer Science">Computer Science</option>
//         <option value="Health & Fitness">Health & Fitness</option>
//         <option value="Music">Music</option>
//         <option value="Drawing">Drawing</option>`
//     }
// }
// function sub_category(val){
    
// }




// var n=1;
// function next(){
//     if(n==1){
//         document.querySelector('.breadcrumb').style.display='block'
    
// for(let item of document.querySelectorAll('.c') ){
// if(getComputedStyle(item).display!='none'){
//     let v=Number(item.querySelector('select').value)
//     if(v>5&&v<13 &&n==1){
// document.getElementById('c'+n).style.display='none'
// document.querySelector('.breadcrumb').innerText='Class '+v+"/"
// n++;
// document.getElementById('c'+n).style.display='block'
//     }
//     if(v==1){
//         document.getElementById('c'+n).style.display='none'
//         document.querySelector('.breadcrumb').innerText='Class '+v+"/"
//         n++;
//         document.getElementById('c'+n).style.display='block'
//         document.getElementById('sub-cat').innerHTML=`<option value="0">Choose an Option</option>
//                  <option value="Computer Science">Computer Science</option>
//                  <option value="Health & Fitness">Health & Fitness</option>
//                  <option value="Music">Music</option>
//                 <option value="Drawing">Drawing</option>`
//     }
// }

// }
// }
// if(n==2){
   
// }
// }

var school=['Math','Physics','Chemistry','Biology']
//############## cs #################
var webdev=['Html','css','scss','Vanilla Js','JQuery','React','Vue','Angular','Frontend','Backend','Django','php','Flask','Node','Ember','Meteor','Scala',' Backbone.js']
var anddev=['Java','Kotlin','ReactNative','ScriptNative','Flutter']
var iosdev=['Objective-C','Swift','C#','Python', 'C++']
var datascience=['Python','Machine Learning','Deep Learning','Data Analysis','AI','R','Tensor Flow','Neural Networks']
var ProgrammingL=['C','C++','Java','Python','C#','Ruby']
var db=['SQL','MySql','PostgreSQL','OracleSQL','MangoDB']
var dt=['Docker','Git','Jira','DevOps','AWS']
// var personalDev=['Computer Science','Drawing','Music','Health and fitness','Photography']
// var cs=['Web Development','Android Development','Ios Development','Data Science','Programming Languages','Databases','Development Tools']
//############## music #################
var dr=['Life Drawing','Emotive Drawing','3D Drawing','Analytic Drawing','Other']
var instrument=['Voilen','Piano','Guitar','Drum','Harmonica','Keyboard Instrument']
var Production=['Music Production','Music Composition','Audio Production','Music Mixing','Game Music','Sound Design','Song Writing']
var Vocal=['Singing','Voice Training','Voice Over','Rapping']

//############## health and fitness #################
var yoga=['Yoga for Kids','Pranayama','Meditation','Teacher Training','All Yoga']
var mentalH=['Anxiety Management','Hypnotherepy','Motivation']
var Dance=['Belly Dancing','Salsa','Hip Hop','Break Dance','Ballet','Street Dancing','Kathak','Bharatnatyam']
var med=['MindFullness','Energy Healing','Spiritual meditation','Focused meditation','Movement meditation','Mantra meditation','Transcendental meditation','Meditation']

//############## photography #################
var potrait=['Potrait Photography','Posing','Cameras']
var photoTools=['Adobe Lightroom','Photoshop','Image Editing','Adobe Illustrator','DSLR','Skylum Luminar','Canva','Pixlr Editor']
var photo =['Digital Photography','Commercial Photography']
var cs={'Web Development':webdev,'Android Development':anddev,'Ios Development':iosdev,'Data Science':datascience,'Programming Languages':ProgrammingL,'Databases':db,'Development Tools':dt}
var music={'Instruments':instrument,'Production':Production,'Vocal':Vocal}
var Haf={'Yoga':yoga,'Mental Health':mentalH,'Dance':Dance,'Meditation':med};
var photography={'Potraits':potrait,'Photography Tools':photoTools,'Photography':photo}
// var personalDev={'Computer Science':,'Music':,'Health and fitness':,'Photography':}

var Academics=['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']
var i=1;
var v1,v2;
function next(){
    v1=document.querySelector('#cat').value;
    console.log(v1)
    document.querySelector('.breadcrumb').style.display='block'
    if(v1==2){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='block'
document.querySelector('.category').style.display='none'
let course;

    document.querySelector('.breadcrumb').innerText+='Computer Science / '
    for(let [i,vl] of Object.entries(cs)){
     course+=`<option value="${i}">${i}</option>`
    
}
document.querySelector('#scat').innerHTML=course
}
else if(i==2){
 let ht=``
 v3=document.querySelector('#scat').value;
 document.querySelector('.breadcrumb').innerText+=v3+' / '
    for(let [key,val] of Object.entries(cs)){
        if(key==v3){
            
             for(let item of val){
                ht+=`<option value="${item}">${item}</option>`
             }}
    }
            document.querySelector('#scat').innerHTML=ht
        }
        

else if(i==3){
    v4=document.querySelector('#scat').value;
    document.querySelector('.breadcrumb').innerText+=v4
    document.querySelector('.sub_category').style.display='none'
    document.querySelector('#title').style.display='block'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
    if(v1==3){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='block'
document.querySelector('.category').style.display='none'
let course;

    document.querySelector('.breadcrumb').innerText+='Music / '
    for(let [i,vl] of Object.entries(music)){
     course+=`<option value="${i}">${i}</option>`
    
}
document.querySelector('#scat').innerHTML=course
}
else if(i==2){
 let ht=``
 v3=document.querySelector('#scat').value;
 document.querySelector('.breadcrumb').innerText+=v3+' / '
    for(let [key,val] of Object.entries(music)){
        if(key==v3){
            
             for(let item of val){
                ht+=`<option value="${item}">${item}</option>`
             }}
    }
            document.querySelector('#scat').innerHTML=ht
        }
        

else if(i==3){
    v4=document.querySelector('#scat').value;
    document.querySelector('.breadcrumb').innerText+=v4
    document.querySelector('.sub_category').style.display='none'
    document.querySelector('#title').style.display='block'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
    if(v1==4){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='block'
document.querySelector('.category').style.display='none'
let course;

    document.querySelector('.breadcrumb').innerText+='Health & Fitness / '
    for(let [i,vl] of Object.entries(Haf)){
     course+=`<option value="${i}">${i}</option>`
    
}
document.querySelector('#scat').innerHTML=course
}
else if(i==2){
 let ht=``
 v3=document.querySelector('#scat').value;
 document.querySelector('.breadcrumb').innerText+=v3+' / '
    for(let [key,val] of Object.entries(Haf)){
        if(key==v3){
            
             for(let item of val){
                ht+=`<option value="${item}">${item}</option>`
             }}
    }
            document.querySelector('#scat').innerHTML=ht
        }
        

else if(i==3){
    v4=document.querySelector('#scat').value;
    document.querySelector('.breadcrumb').innerText+=v4
    document.querySelector('.sub_category').style.display='none'
    document.querySelector('#title').style.display='block'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
    if(v1==5){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='block'
document.querySelector('.category').style.display='none'
let course;
    document.querySelector('.breadcrumb').innerText+='Photography / '
    for(let [i,vl] of Object.entries(photography)){
     course+=`<option value="${i}">${i}</option>` 
}
document.querySelector('#scat').innerHTML=course
}
else if(i==2){
 let ht=``
 v3=document.querySelector('#scat').value;
 document.querySelector('.breadcrumb').innerText+=v3+' / '
    for(let [key,val] of Object.entries(photography)){
        if(key==v3){
            
             for(let item of val){
                ht+=`<option value="${item}">${item}</option>`
             }}
    }
            document.querySelector('#scat').innerHTML=ht
        }
        

else if(i==3){
    v4=document.querySelector('#scat').value;
    document.querySelector('.breadcrumb').innerText+=v4
    document.querySelector('.sub_category').style.display='none'
    document.querySelector('#title').style.display='block'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
if(v1==1){
    console.log('33')
    if(i==1){
        document.querySelector('.sub_category').style.display='block'
document.querySelector('.category').style.display='none'
        document.querySelector('.breadcrumb').innerText+='Academics / '
        let ht=``
        for(let item of Academics){
            console.log(item)
            ht+=`<option value="${item}">${item}</option>`
        }
        document.querySelector('#scat').innerHTML=ht
    }
    else if(i==2){
        document.querySelector('.breadcrumb').innerText+= document.querySelector('#scat').value+' / '
        document.querySelector('#scat').innerHTML=`
        <option value="Physics">Physics</option>
        <option value="Math">Math</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Boilogy">Boilogy</option>`
    }
    else if(i==3){
        v4=document.querySelector('#scat').value;
        document.querySelector('.breadcrumb').innerText+=v4+' / '
        document.querySelector('.sub_category').style.display='none'
        document.querySelector('#title').style.display='block'
    }
    else if(i==4){
        localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
        localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
        window.location.href='saveCourse'
    }}
    i++;
}

