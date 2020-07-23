# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from home.models import Contact
from home.models import Courses
from home.models import Videos
from home.models import Cart,TeacherProfile,MyCourses,WatchedVideos,HomeTutor,HomeTutorDemo,ReviewCourse
from django.shortcuts import render,HttpResponse,redirect
from django.http import JsonResponse
import json
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.postgres.search import SearchVector, SearchQuery
import os
from mutagen.mp4 import MP4
from django.views.decorators.csrf import csrf_exempt
from PayTm import Checksum
MERCHANT_KEY = '0K5Uhk4At%X1t80Q'
# from moviepy.editor import VideoFileClip 

# Create your views here.
def home(request):
    return render(request,'home/home.html')
def Teach1(request):
    return render(request,'home/teach1.html')
def about(request):
    return render(request,'home/about.html')
def addCourse(request):
   
    return render(request,'home/addCourse.html')
def search(request):
    query=request.GET['search']
    result=Courses.objects.annotate(
    search=SearchVector('title') + SearchVector('category')+SearchVector('sub_category')+SearchVector('creater_name')
    ).filter(search = SearchQuery(query) ).filter(verified="True").values()
    return render(request,'home/search.html',{'searchResults':result})
def homeTutor(request):
    htprofile=HomeTutor.objects.filter(user_id=request.user)
    demos=''
    lockedDemos=''
    if len(htprofile)>0:
        user_id=request.user.id
        demo=HomeTutorDemo.objects.filter(homeTutor=user_id).order_by('timeStamp')
        demos=demo[:htprofile[0].unlocked]
        lockedDemos=len(demo)-len(demos)
    return render(request,'home/homeTutor.html',{'htprofile':htprofile,'demos':demos,'lockedDemos':lockedDemos})
def get_homeTutor(request):
    pin=request.GET['pin']
    ht=HomeTutor.objects.filter(pin=int(pin)).filter(verified=True)
    registeredht=HomeTutor.objects.filter(user_id=request.user).values('sno')
    return render(request,'home/get_homeTutor.html',{'ht':ht,'pin':pin,'registeredht':registeredht})
def getDemo(request):
    if request.method=='POST':
        data=json.loads(request.body)
        sno=data['sno']
        name=data['name']
        phone=data['phone']
        email=data['email']
        address=data['address']
        city=data['city']
        pin=data['pinCode']
        sno=data['sno']
        ht=(sno)
        gd=HomeTutorDemo(fullname=name,phone=phone,email=email,address=address,address2=city,user=request.user,homeTutor=ht,pin=int(pin))
        gd.save()
    return JsonResponse('ok',safe=False)
def registerhomeTutor(request):
    if request.method=='POST':
        name=request.POST['name']
        age=request.POST['age']
        gender=request.POST['gender']
        phone=request.POST['number']
        email=request.POST['email']
        pin=request.POST['pin']
        district=request.POST['district']
        state=request.POST['state']
        subject=request.POST['subject']
        classes=request.POST['classes']
        disc=request.POST['disc']
        id_proof=request.FILES.get('id_proof')
        salaryL=request.POST['salaryL']
        salaryH=request.POST['salaryH']
        action=request.POST['action']
        if len(name)>4 and len(age)!=0 and len(gender)!=0 and len(phone)>9 and len(email)>0 and len(pin)==6 and len(district)>0 and len(state)>0 and len(subject)>0 and len(classes)>0 and len(disc)>0 and len(id_proof)>0 and len(salaryL)>0 and len(salaryH)>0 and len(action)>0 :
            if action == 'register':
                ht=HomeTutor(user=request.user,name=name,age=age,gender=gender,phone=phone,email=email,pin=pin,district=district,
                state=state,subject=subject,classes=classes,discription=disc,salaryL=salaryL,salaryH=salaryH,varified='False',id_proof=id_proof)
                ht.save()
                messages.success(request,'Registered Successfully! Once your profile get varified it will be available for students')
            if action == 'edit':
                sno=request.POST['sno']
                ht=HomeTutor.objects.get(sno=int(sno))
                ht.name=name
                ht.age=age
                ht.gender=gender
                ht.email=email
                ht.phone=phone
                ht.pin=pin
                ht.district=district
                ht.state=state
                ht.subject=subject
                ht.classes=classes
                ht.disc=disc
                ht.id_proof=id_proof
                ht.salaryL=salaryL
                ht.salaryH=salaryH
                ht.varified="False"
                ht.save()
                messages.success(request,'Edited Successfully! Once your profile get varified it will be available for students')
        else:
            messages.error(request,'Failed! Fill the information correctly')
       
    return redirect('homeTutor')

def getStarted(request):
    return render(request,'home/getStarted.html')
def createCourse(request):
    return render(request,'home/createCourse.html')
def teacherProfile(request):
    data=json.loads(request.body)
    fname=data['fname']
    lname=data['lname']
    disc=data['disc']
    action=data['action']
    if action=='save':
        profile=TeacherProfile(fname=fname,lname=lname,disc=disc,ProfileOf=request.user)
        profile.save()
        return JsonResponse('OK',safe=False)
    elif action=='edit':
        profile=TeacherProfile.objects.get(ProfileOf_id=request.user)
        profile.fname=fname
        profile.lname=lname
        profile.disc=disc
        profile.save()
        return JsonResponse('OK',safe=False)
def get_teacherProfile(request):
    Tprofile=''
    if request.user.is_authenticated :
        if request.user.first_name=="Teacher":
            Tprofile=TeacherProfile.objects.filter(ProfileOf_id=request.user).values()
            Tprofile=list(Tprofile)
        return JsonResponse({'teacherProfile':Tprofile})
def teacherPerformance(request):
    courses=Courses.objects.filter(creater=request.user)
    rev=set()
    revenue=0
    totalenrolled=0
    for item in courses:
        review=ReviewCourse.objects.get(reviewOfCourse=item)
        totalenrolled+=item.enrolled
        revenue=int(item.pricing)*item.enrolled*0.7
        rev.add(review)
    return render(request,'home/tPerformance.html',{'courses':courses,'review':rev,'revenue':revenue,'totalenrolled':totalenrolled})
def get_cartItems(request):
    if request.user.is_authenticated :
        cart=Cart.objects.filter(user_id=request.user).values()
        courses=list()
        for item in cart:
            courses.append(list(Courses.objects.filter(sno=item['course_id']).values()))
        return JsonResponse({'cartItems':list(courses)})
    return JsonResponse({'cartItems':list()})

def addCart(request):
    data=json.loads(request.body)
    courseId=data['courseId']
    action=data['action']
    user=request.user
    course=Courses.objects.get(sno=courseId)
    addcart=Cart(course=course,user=user)
    if action=="add" :
        addcart.save()
    elif action=="remove":
        removecart=Cart.objects.filter(user_id=user).filter(course_id=courseId)
        removecart.delete()
    return JsonResponse('item was added ',safe=False)
def saveCourse(request):
    status=False
    course=-1
    if request.method=='POST':
       c=request.POST.get('cat')
       cat=c.split('/')
       category=cat[0].strip()
       sub_category=cat[1].strip()
       sub_category2=cat[2].strip()
       title=request.POST.get('title')
       language=request.POST.get('language')
       courseThumbnail=request.FILES['courseThumbnail']
       pricing=request.POST.get('pricing')
       disc=request.POST.get('disc')
       author=request.user.username
       user=request.user
       try:
           if len(c)>5 and len(title)>0 and len(language)>0 and len(pricing)>0 and len(courseThumbnail)>0 and len(disc)>20:
               print('success')
               saveCourse=Courses(category=category,sub_category=sub_category,sub_category2=sub_category2,title=title,language=language,courseThumbnail=courseThumbnail, pricing=pricing,discription=disc,creater_name=author,creater=user)
               saveCourse.save()
               status=True
               course=Courses.objects.filter(creater_id=request.user)
               course=course.last()
               course=(int(str(course)))
               messages.success(request,'Course created after adding first video the course will be varified')
               return redirect('/addVideos')
           else:
               print('error')
               messages.error(request,'Some error occured')
               return render(request,'home/saveCourse.html')
       except Exception as e:
           status=False
       
    else:
        return render(request,'home/saveCourse.html')
def deleteCourse(request,id):
    course = Courses.objects.get(sno = id)
    course.delete()
    return render(request,'home/saveCourse.html')
def addVideos(request):
    get_courses=Courses.objects.filter(creater_id=request.user)
    get_videos=Videos.objects.filter(creater_id=request.user)
    get_data={'get_courses':get_courses,'get_videos':get_videos}
    return render(request,'home/addVideos.html',get_data)
def video(request):
    thumbnail = request.FILES['thumbnail']
    video = request.FILES['video']
    resources= request.FILES['resources']
    videoTitle= request.POST['title']
    courseSno= request.POST['courseSno']
    course=Courses.objects.get(sno=int(courseSno))
    user=request.user
    print(thumbnail,video,resources,videoTitle,course)
    video = Videos(videoTitle=videoTitle,videofile=video,thumbnail=thumbnail,resource=resources,videoOfCourse=course,creater=user)
    video.save()
    return JsonResponse('OK',safe=False)
def viewCourses(request):
    return render(request,'home/viewCourses.html')
def previewCourse(request,id):
    courses=Courses.objects.filter(sno=id).values()
    review=ReviewCourse.objects.filter(reviewOfCourse_id=id)
    vid=Videos.objects.filter(videoOfCourse_id=courses[0]['sno'])
    video=set()
    for item in vid:
        path="media/"+str(item.videofile)
        Vlength = MP4(path)
        video.add((item,Vlength.info.length))
    Tprofile=courses[0]['creater_id']
    teacherProfile=TeacherProfile.objects.filter(ProfileOf=Tprofile)
    allcourses=Courses.objects.filter(creater_id=Tprofile)

    return render(request,'home/previewCourse.html',{'course':courses,'videos':video,'teacherProfile':teacherProfile,'allcourses':allcourses,'reviews':review})
def get_viewCourses(request):
    data=json.loads(request.body)
    cat=data['cat'].strip()
    scat=data['scat'].strip()
    scat2=data['scat2'].strip()
    print(cat,scat,scat2)
    courses=(Courses.objects.filter(category=cat).filter(sub_category=scat).filter(sub_category2=scat2).filter
    (verified="True").values())
    print(courses)
    return JsonResponse({'courses':list(courses)})
def addReview(request):
    data=json.loads(request.body)
    csno=int(data['csno'])
    treview=data['textreview']
    value=int(data['rvalue'])
    action=(data['action'])
    course=Courses.objects.get(sno=csno)
    if action=='basereview':
        review =ReviewCourse(reviewOfCourse=course,review=treview,username=request.user.username)
        review.save()
        course.rating+=value
        course.ratedBy+=1
        course.save()
    elif action=='editreview':
        rev=ReviewCourse.objects.get(username=request.user.username)
        rate=rev.rating
        course.rating=course.rating-rate+value
        course.save()
        rev.rating=value
        rev.review=treview
        rev.save()
    return JsonResponse('ok',safe=False)
def CartItem(request):
    return render(request,'home/cartItems.html')
def contact(request):
    if request.method=='POST':
        name=request.POST['userName']
        email=request.POST['email']
        content=request.POST['disc']
        user=request.user
        username=request.user.username
        if len(email)<6 or len(content)<5:
            messages.error(request,'Please fill the form Correctly')
        else:
            contact=Contact(name=name,email=email,content=content,user=user,username=username)
            contact.save()
            messages.success(request,'We Will Respond You as soon as Possible')

    return render(request,'home/contact.html')
def handleSignUp(request):
    if request.method=='POST':
        username=request.POST['userName']
        email=request.POST['email']
        pass1=request.POST['password']
        pass2=request.POST['cpassword']
        #validation for errorneous input
        if len(username)> 15:
            messages.error(request,"Your username can not contain more than 15 Characters")
            return redirect('/')
        if not username.isalnum():
            messages.error(request,"Your username can contain letters and numbers only ")
            return redirect('/')
        if pass1 != pass2:
            messages.error(request,"Passwords do not match")
            return redirect('/')
        try:
            user=User.objects.get(username=username)
            messages.error(request,"UserName has Already Been Taken")
            return redirect('/')
        except:
        #create user
            myuser=User.objects.create_user(username,email,pass1)
            myuser.first_name="Student"
            myuser.save()
            messages.success(request,"Your iLearn Account has been successfully created")
            user=authenticate(username=username,password=pass1)
            if user is not None:
                login(request,user)
            return redirect('/')
    
def handleTeacherSignUp(request):
    if request.method=='POST':
        username=request.POST['userName']
        email=request.POST['email']
        pass1=request.POST['password']
        pass2=request.POST['cpassword']
        #validation for errorneous input
        if len(username)> 15:
            messages.error(request,"Your username can not contain more than 15 Characters")
            return redirect('/teach1')
        if not username.isalnum():
            messages.error(request,"Your username can contain letters and numbers only ")
            return redirect('/teach1')
        if pass1 != pass2:
            messages.error(request,"Passwords do not match")
            return redirect('/teach1')
        try:
            user=User.objects.get(username=username)
            messages.error(request,"UserName has Already Been Taken")
            return redirect('/teach1')
        except:
        #create user
            myuser=User.objects.create_user(username,email,pass1)
            myuser.first_name="Teacher"
            myuser.save()
            messages.success(request,"Your are successfully registered on iLearn")
            user=authenticate(username=username,password=pass1)
            if user is not None:
                login(request,user)
            return redirect('/teach1')

def handleLogin(request):
    if request.method=='POST':
        loginusername=request.POST['loginuserName']
        loginpassword=request.POST['loginpass']
        try:
            user=authenticate(username=User.objects.get(email=loginusername),password=loginpassword)
        except:
            user=authenticate(username=loginusername,password=loginpassword)
        if user is not None:
            login(request,user)
            messages.success(request,"Successfully Loged In")
            return redirect('/')
        else:
            messages.error(request,"Invalid Credentials, Please Try Again")
            return redirect('/')

def handleLogout(request):
    logout(request)
    messages.success(request,"Successfully Loged Out")
    return redirect('/')

def buynow(request):
    if request.method=='POST':
        buy=request.POST['buy']
        course=Courses.objects.filter(sno=buy).values()
        amount=course[0]['pricing']
        email=request.user.email
        cart=Cart.objects.filter(course_id=buy).filter(user_id=request.user).values()
        order_id=cart[0]['sno']
        param_dict = {

                    'MID': 'RLUAjJ34588862174269',
                    'ORDER_ID': str(order_id),
                    'TXN_AMOUNT': str(amount),
                    'CUST_ID': email,
                    'INDUSTRY_TYPE_ID': 'Retail',
                    'WEBSITE': 'WEBSTAGING',
                    'CHANNEL_ID': 'WEB',
                    'CALLBACK_URL':'http://127.0.0.1:8000/handleRequest/',

        }
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict, MERCHANT_KEY)
        return render(request,'home/paytm.html',{'param_dict':param_dict})
    
    return redirect('/cart')
def payment(request):
    return render(request,'home/paymentStatus.html')
@csrf_exempt
def handleRequest(request):
    form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]
    status=''
    verify = Checksum.verify_checksum(response_dict, MERCHANT_KEY, checksum)
    if verify:
        if response_dict['RESPCODE'] == '01':
            status='OK'
            
        else:
            status="Failed"
    return render(request,'home/paymentStatus.html',{'response_dict':response_dict,'status':status,'sent':'True'})

def unlockDemos(request):
    if request.method=='POST':
        unlock=request.POST['unlock']
        teacher_id=request.user.id
        ht=HomeTutor.objects.filter(user=request.user).values('unlocked')
        order_id=str(teacher_id)+str(ht[0]['unlocked'])+'104'
        email=request.user.email
        amount=100*int(unlock)
        param_dict = {

                    'MID': 'RLUAjJ34588862174269',
                    'ORDER_ID': str(order_id),
                    'TXN_AMOUNT': str(amount),
                    'CUST_ID': email,
                    'INDUSTRY_TYPE_ID': 'Retail',
                    'WEBSITE': 'WEBSTAGING',
                    'CHANNEL_ID': 'WEB',
                    'CALLBACK_URL':'http://127.0.0.1:8000/unlockhandleRequest/',

        }
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict, MERCHANT_KEY)
        return render(request,'home/paytm.html',{'param_dict':param_dict})
@csrf_exempt
def unlockhandleRequest(request):
    form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]
    status=''
    verify = Checksum.verify_checksum(response_dict, MERCHANT_KEY, checksum)
    if verify:
        if response_dict['RESPCODE'] == '01':
            status='OK'
            
        else:
            status="Failed"
        print(response_dict)
    return render(request,'home/paymentStatus.html',{'response_dict':response_dict,'status':status,'sent':'unlock'})
def updateunlockedDemo(request):
    if request.method=='POST':
        amount=int(float(request.POST['sno']))
        status=request.POST['status']
        if status=='OK':
            n=amount/100
            ht=HomeTutor.objects.get(user=request.user)
            ht.unlocked+=n
            ht.save()
            return render(request,'home/paymentStatus.html',{'status':'OK','response_dict':'','send':'False'})
        else:
            return render(request,'home/paymentStatus.html',{'status':'Failed','send':'False'})



def courseAdded(request):
    if request.method=='POST':
        id=request.POST.get('sno')
        status=request.POST.get('status')
        cart=Cart.objects.filter(user_id=request.user).filter(sno=id)
        
        if len(cart)!=0:
            c_id=cart.values()[0]['course_id']
            courses=Courses.objects.get(sno=c_id)
            courses.enrolled+=1
            cart.delete()
            myCourse=MyCourses(course=courses,order_id=id,user=request.user)
            myCourse.save()
            courses.save()
            return render(request,'home/paymentStatus.html',{'status':'OK','send':'False'})
        else:
            return render(request,'home/paymentStatus.html',{'status':'OK','response_dict':'','send':'False'})
def myCourses(request):
    return render(request,'home/myCourses.html')
def previewmyCourses(request,slug,id):
    myCourses=MyCourses.objects.filter(user_id=request.user).values('course_id')
    cr=Courses.objects.filter(sno=id)
    c=cr.values('title')
    crating=cr.values('rating')
    review=ReviewCourse.objects.get(reviewOfCourse_id=id)
    course=''
    video=list()
    for i in myCourses:
        if i['course_id'] == id:
            course=Videos.objects.filter(videoOfCourse=i['course_id']).order_by('timeStamp')
    for item in course:
        path="media/"+str(item.videofile)
        Vlength = MP4(path)
        video.append((item,round((Vlength.info.length)/60),4))
    watched=WatchedVideos.objects.filter(user_id=request.user)
    return render(request,'home/previewmyCourses.html',{'course':video,'watched':watched,'cTitle':c,'csno':id,'review':review,'crating':crating})

def watched(request):
    data=json.loads(request.body)
    videoId=int(data['videoId'])
    action=(data['action'])
    user=request.user
    wvideo=WatchedVideos.objects.filter(user_id=user).filter(watched_id=videoId)
    if action == 'watch':
        creater=int(data['creater'])
        if len(wvideo) == 0:
            video=Videos.objects.get(sno=videoId)
            watch=WatchedVideos(user=user,watched=video,creater=creater)
            watch.save()
    elif action == 'ask':
        if len(wvideo) != 0:
            w=WatchedVideos.objects.get(user_id=user,watched_id=videoId)
            que=data['query']
            w.query=que
            w.save()
    elif action == 'answer':
        username=(data['user'])
        answer=data['answer']
        user=User.objects.filter(username=username)
        w=WatchedVideos.objects.get(user_id=user[0],watched_id=videoId)
        w.answer=answer
        w.save()

    return JsonResponse('ok',safe=False)

def password_reset(request):
    return render(request,'home/password_reset.html')


def studentQuery(request):
    user=request.user.id
    query=WatchedVideos.objects.filter(creater=user)
    return render(request,'home/studentQuery.html',{'query':query})

