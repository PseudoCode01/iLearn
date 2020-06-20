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
    pricing=models.CharField(max_length=10,default="149")
    creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.creater+" "+self.title

# class AddVedios(models.Model):
#     sno=models.AutoField(primary_key=True)
#     category=models.CharField(max_length=150)
#     sub_category=models.CharField(max_length=150)
#     title=models.CharField(max_length=150)
#     sub_title=models.CharField(max_length=150)
#     creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
#     videofile= models.FileField(upload_to='videos/', null=True, verbose_name="")
#     timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    
class Contact(models.Model):
    sno=models.AutoField(primary_key=True)
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    content=models.TextField()
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.username
       
