# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Contact(models.Model):
    sno=models.AutoField(primary_key=True)
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    content=models.TextField()
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.username
       
