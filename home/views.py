# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from home.models import Contact
from home.models import Courses
from home.models import Videos
from home.models import Cart
from django.shortcuts import render,HttpResponse,redirect
from django.http import JsonResponse
import json
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.postgres.search import SearchVector, SearchQuery
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
    print(result)
    return render(request,'home/search.html',{'searchResults':result})
def homeTutor(request):
    return render(request,'home/homeTutor.html')
def getStarted(request):
    return render(request,'home/getStarted.html')
def createCourse(request):
    return render(request,'home/createCourse.html')
def teacherPerformance(request):
    return render(request,'home/tPerformance.html')
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
    print(course)
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
       category=request.POST.get('cat')
       subcat=request.POST.get('subcat')
       title=request.POST.get('title')
       language=request.POST.get('language')
       courseThumbnail=request.FILES['courseThumbnail']
       pricing=request.POST.get('pricing')
       author=request.user.username
       user=request.user
       try:
           saveCourse=Courses(category=category,sub_category=subcat,title=title,language=language,courseThumbnail=courseThumbnail, pricing=pricing,creater_name=author,creater=user)
           saveCourse.save()
           status=True
           course=Courses.objects.filter(creater_id=request.user)
           course=course.last()
           course=(int(str(course)))
       except Exception as e:
           status=False
    return render(request,'home/saveCourse.html',{'status':status,'id':course})
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
    if request.method=='POST':
        courseSno=request.POST['courseSno']
        videoTitle=request.POST['videoTitle']
        thumbnail=request.FILES['thumbnail']
        video=request.FILES['video']
        resources=request.FILES['resources']
        course=Courses.objects.get(sno=courseSno)
        user=request.user
    video = Videos(videoTitle=videoTitle,videofile=video,thumbnail=thumbnail,resource=resources,videoOfCourse=course,creater=user)
    video.save()
    return redirect('/addVideos')
def viewCourses(request):
    return render(request,'home/viewCourses.html')
def get_viewCourses(request):
    data=json.loads(request.body)
    cat=data['cat']
    scat=data['scat']
    courses=(Courses.objects.filter(category=cat).filter(sub_category=scat).filter(verified="True").values())
    return JsonResponse({'courses':list(courses)})
def CartItem(request):
    return render(request,'home/cartItems.html')
def contact(request):
    if request.method=='POST':
        name=request.POST['userName']
        email=request.POST['email']
        content=request.POST['disc']
        if len(email)<6 or len(content)<5:
            messages.error(request,'Please fill the form Correctly')
        else:
            contact=Contact(username=name,email=email,content=content)
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
def adminPanel(request):
    course=Courses.objects.filter(verified="False")
    sno=course.values('sno')
    un_verified_set=list()
    for item in sno:
        un_verified=Videos.objects.filter(videoOfCourse_id=item['sno'])
        print(un_verified)
        if(len(un_verified) != 0) :
            un_verified_set.append(list((course.filter(sno=item['sno']).values(),un_verified.values().first())))
    return render(request,'home/adminPanel.html',{'un_verified':un_verified_set})
def verification(request):
    data=json.loads(request.body)
    courseId=data['courseId']
    action=data['action']
    user=request.user
    course=Courses.objects.get(sno=courseId)
    # addcart=Cart(course=course,user=user)
    if action=="verify":
        course.verified="True"
        course.save()
        return JsonResponse('item was verified ',safe=False)
    elif action=="remove":
        course.delete()
        return JsonResponse('item was deleted ',safe=False)