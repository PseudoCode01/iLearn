# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from home.models import Contact
from home.models import Courses
from home.models import Videos
from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core.files.storage import FileSystemStorage
# Create your views here.
def home(request):
    return render(request,'home/home.html')
def Teach1(request):
    return render(request,'home/teach1.html')
def about(request):
    return render(request,'home/about.html')
def addCourse(request):
    return render(request,'home/addCourse.html')
def homeTutor(request):
    return render(request,'home/homeTutor.html')
def getStarted(request):
    return render(request,'home/getStarted.html')
def createCourse(request):
    return render(request,'home/createCourse.html')

def saveCourse(request):
    status=False
    course=-1
    if request.method=='POST':
       category=request.POST.get('cat')
       subcat=request.POST.get('subcat')
       title=request.POST.get('title')
       language=request.POST.get('language')
       pricing=request.POST.get('pricing')
       user=request.user
       try:
           saveCourse=Courses(category=category,sub_category=subcat,title=title,language=language,pricing=pricing,creater=user)
           saveCourse.save()
           status=True
           course=Courses.objects.filter(creater_id=request.user)
           course=course.last()
           course=(int(str(course)))
           print(type(int(str(course))))
       except Exception as e:
           status=False
    print(status)
    return render(request,'home/saveCourse.html',{'status':status,'id':course})
# def editCourse(request,id):
#     status=False
#     if request.method=='POST':
#         course = Courses.objects.get(sno = id)
#         course.title=request.POST.get('title')
#         course.language=request.POST.get('language')
#         course.pricing=request.POST.get('pricing')
#         try:
#            status=True 
#            course.save()
#         except Exception as e:
#            status=False    
#     return render(request,'home/saveCourse.html',{'status':status})
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