# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
# Create your models here.
class Courses(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(max_length=50)
    sub_category=models.CharField(max_length=50)
    title=models.CharField(max_length=150)
    language=models.CharField(max_length=50,default="Hindi + English")
    courseThumbnail=models.ImageField( upload_to="home/courseThumbnail",default="")
    pricing=models.CharField(max_length=10,default="149")
    creater_name=models.CharField(max_length=150,default="")
    verified=models.CharField(max_length=150,default="False")
    creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.sno)

class Videos(models.Model):
    sno=models.AutoField(primary_key=True)
    videoTitle=models.CharField(max_length=150)
    videofile= models.FileField(upload_to='home/video', null=True, verbose_name="")
    thumbnail=models.ImageField( upload_to="home/image",default="")
    resource= models.FileField(upload_to='home/resource', null=True, verbose_name="")
    videoOfCourse=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Cart(models.Model):
    sno=models.AutoField(primary_key=True)
    course=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class Contact(models.Model):
    sno=models.AutoField(primary_key=True)
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    content=models.TextField()
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.username
       
