# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from home.models import Contact
from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout

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