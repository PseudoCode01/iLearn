
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

var ssc=['Reasoning','Maths','English','GS']
// var uptet=['Reasoning','Maths','English','GS']
var bank=['Reasoning','Maths','English','GS','Computer']
var railway=['NTPC','Reasoning','Maths','English','GS']
var NDA=['Maths','English','GK']
var Airf=['Reasoning','Maths','English']
var aoe=['GS','English','Maths','Reasoning','Currrent Affairs']
var ce={'SSC':ssc,'Bank':bank,'Railway':railway,'NDA':NDA,'Airforce':Airf,'All One-Day Exams':aoe}






var c6_8=['Maths','Science','Social Science','Computer','English','Hindi']
var c9_10=['Physics','Chemistry','Maths','Boilogy','Computer','English','Hindi']
var c11_12=['Physics','Chemistry','Maths','Boilogy','English','Computer','Commerce']
var Academics={'Class 6':c6_8,'Class 7':c6_8,'Class 8':c6_8,'Class 9':c9_10,'Class 10':c9_10,'Class 11':c11_12,'Class 12':c11_12}
var i=1;
var v1,v2;
function next(val){
  
    v1=document.querySelector('#cat').value;
 
    document.querySelector('.breadcrumb').style.display='block'
    if(v1==2){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='flex'
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
    document.querySelector('#title').style.display='flex'
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
document.querySelector('.sub_category').style.display='flex'
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
    document.querySelector('#title').style.display='flex'
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
document.querySelector('.sub_category').style.display='flex'
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
    document.querySelector('#title').style.display='flex'
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
document.querySelector('.sub_category').style.display='flex'
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
    document.querySelector('#title').style.display='flex'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
    if(v1==6){
if(i==1)
{ 
document.querySelector('.sub_category').style.display='flex'
document.querySelector('.category').style.display='none'
let course;
    document.querySelector('.breadcrumb').innerText+='Competative Exams / '
    for(let [i,vl] of Object.entries(ce)){
     course+=`<option value="${i}">${i}</option>` 
}
document.querySelector('#scat').innerHTML=course
}
else if(i==2){
 let ht=``
 v3=document.querySelector('#scat').value;
 document.querySelector('.breadcrumb').innerText+=v3+' / '
    for(let [key,val] of Object.entries(ce)){
        
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
    document.querySelector('#title').style.display='flex'
}
else if(i==4){
    localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
    localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
    window.location.href='saveCourse'
}
    }
if(v1==1){
    if(i==1)
    { 
    document.querySelector('.sub_category').style.display='flex'
    document.querySelector('.category').style.display='none'
    let course;
        document.querySelector('.breadcrumb').innerText+='Academics / '
        for(let [i,vl] of Object.entries(Academics)){
         course+=`<option value="${i}">${i}</option>` 
    }
    document.querySelector('#scat').innerHTML=course
    }
    else if(i==2){
     let ht=``
     v3=document.querySelector('#scat').value;
     console.log(v3)
     document.querySelector('.breadcrumb').innerText+=v3+' / '
        for(let [key,val] of Object.entries(Academics)){
            
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
        document.querySelector('#title').style.display='flex'
    }
    else if(i==4){
        localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
        localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
        window.location.href='saveCourse'
    }
//     if(i==1){
//         document.querySelector('.sub_category').style.display='flex'
// document.querySelector('.category').style.display='none'
//         document.querySelector('.breadcrumb').innerText+='Academics / '
//         let ht=``
//         for(let item of Academics){
           
//             ht+=`<option value="${item}">${item}</option>`
//         }
//         document.querySelector('#scat').innerHTML=ht
//     }
//     else if(i==2){
//         document.querySelector('.breadcrumb').innerText+= document.querySelector('#scat').value+' / '
//         document.querySelector('#scat').innerHTML=`
//         <option value="Physics">Physics</option>
//         <option value="Math">Math</option>
//         <option value="Chemistry">Chemistry</option>
//         <option value="Boilogy">Boilogy</option>`
//     }
//     else if(i==3){
//         v4=document.querySelector('#scat').value;
//         document.querySelector('.breadcrumb').innerText+=v4+' / '
//         document.querySelector('.sub_category').style.display='none'
//         document.querySelector('#title').style.display='flex'
//     }
//     else if(i==4){
//         localStorage.setItem('courseTitle',document.getElementById('courseTitle').value)
//         localStorage.setItem('cat',document.querySelector('.breadcrumb').innerText)
//         window.location.href='saveCourse'
//     }
}
    i++;
}

