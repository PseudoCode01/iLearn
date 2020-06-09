# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
# Create your views here.
def home(request):
    return render(request,'home/home.html')
def Teach1(request):
    return render(request,'home/teach1.html')
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
        #create user
        myuser=User.objects.create_user(username,email,pass1)
        myuser.first_name="student"
        myuser.save()
        user=authenticate(username=username,password=pass1)
        login(request,user)
        messages.success(request,"Your iCoder Account has been successfully created")
        return redirect('/')
    
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