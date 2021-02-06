# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.conf import settings
from ckeditor.fields import RichTextField
# Create your models here.
class Courses(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(max_length=50)
    sub_category=models.CharField(max_length=50)
    sub_category2=models.CharField(max_length=50)
    title=models.CharField(max_length=150)
    language=models.CharField(max_length=50,default="Hindi + English")
    courseThumbnail=models.ImageField( upload_to="home/courseThumbnail",default="")
    pricing=models.CharField(max_length=10,default="149")
    discription=models.CharField(max_length=1000,default="")
    enrolled=models.IntegerField(default=0)
    rating=models.IntegerField(default=0)
    ratedBy=models.IntegerField(default=0)
    share=models.IntegerField(default=70)
    creater_name=models.CharField(max_length=150,default="")
    verified=models.CharField(max_length=150,default="False")
    transfered=models.CharField(max_length=100,default="0")
    Marked=models.CharField(max_length=100,default="general")
    creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.sno)
class ReviewCourse(models.Model):
    sno=models.AutoField(primary_key=True)
    username=models.CharField(max_length=500,default='')
    rating=models.IntegerField(default=0)
    reviewOfCourse=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    review=models.CharField(max_length=500,default='')
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.username)
    
class MyCourses(models.Model):
    sno=models.AutoField(primary_key=True)
    course=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    order_id=models.IntegerField(default=-1)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return str(self.course)+' '+str(self.user)
 
class Videos(models.Model):
    sno=models.AutoField(primary_key=True)
    videoTitle=models.CharField(max_length=150)
    videofile= models.FileField(upload_to='home/video', null=True, verbose_name="")
    thumbnail=models.ImageField( upload_to="home/image",default="",verbose_name="")
    resource= models.FileField(upload_to='home/resource', null=True,blank=True, verbose_name="")
    videoOfCourse=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    isFree=models.BooleanField(default=False)
    duration=models.IntegerField(default=0)
    creater=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.videoTitle)

class WatchedVideos(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    watched=models.ForeignKey(Videos,default=None,on_delete=models.CASCADE)
    creater=models.IntegerField(default=0)
    query=models.CharField(max_length=1000,default="")
    answer=models.CharField(max_length=1000,default="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


class TeacherProfile(models.Model):
    sno=models.AutoField(primary_key=True)
    fname=models.CharField(max_length=50)
    lname=models.CharField(max_length=50)
    disc=models.CharField(max_length=500)
    ProfileOf=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class Cart(models.Model):
    sno=models.AutoField(primary_key=True)
    course=models.ForeignKey(Courses,default=None,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class Contact(models.Model):
    sno=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    answered=models.CharField(max_length=50,default='False')
    content=models.TextField()
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.username
class HomeTutor(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    age=models.CharField(max_length=50)
    gender=models.CharField(max_length=50)
    phone=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    pin=models.IntegerField()
    state=models.CharField(max_length=50)
    district=models.CharField(max_length=50)
    subject=models.CharField(max_length=50)
    classes=models.CharField(max_length=50)
    registered_for=models.CharField(default='Home Tutor',max_length=20)
    verified=models.BooleanField(default=False)
    discription=models.TextField()
    salaryL=models.IntegerField()
    salaryH=models.IntegerField()
    unlockedHT=models.IntegerField(default=0)
    unlockedON=models.IntegerField(default=0)
    id_proof= models.FileField(upload_to='home/homeTutor', null=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.name
       
class HomeTutorDemo(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    homeTutor=models.CharField(max_length=1000)
    fullname=models.CharField(max_length=500)
    phone=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    address=models.CharField(default='',max_length=200)
    reg_for=models.CharField(default="Home Tutor", max_length=200)
    status=models.BooleanField(default=False)
    pin=models.IntegerField(default=0)
    address2=models.CharField(default='',max_length=200)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return self.fullname
class RequestTution(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    fullname=models.CharField(max_length=500)
    phone=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    address=models.CharField(default='',max_length=200)
    reg_for=models.CharField(default="Home Tutor", max_length=200)
    status=models.BooleanField(default=False)
    pin=models.IntegerField(default=0)
    Payment=models.IntegerField(default=0)
    address2=models.CharField(default='',max_length=200)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return self.fullname

class TestVideo(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    videofile= models.FileField(upload_to='home/testvideo', null=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.sno)

    

class Notification(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.CharField(default="",max_length=20)
    message=models.TextField(default="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class AccountDetails(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    upi=models.CharField(default="",max_length=40)
    acc=models.CharField(default="",max_length=40)
    ifsc=models.CharField(default="",max_length=40)
    account_holder=models.CharField(default="",max_length=40)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.user)


class Categories(models.Model):
    category=models.CharField(max_length=100)
    sub_category=models.CharField(max_length=100)
    sub_category2=models.CharField(max_length=100)

class TeachCategories(models.Model):
    category=models.CharField(max_length=100)
    sub_category=models.CharField(max_length=100)
    sub_category2=models.CharField(max_length=100)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Test(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    category=models.CharField(default="",max_length=1000)
    question=models.CharField(default="",max_length=1000000)
    answer=models.CharField(default="",max_length=1000000)
    Marked=models.CharField(default="fetured",max_length=10)
    correct=models.CharField(default="",max_length=1000000)
    creater=models.CharField(default="",max_length=100)
    instructions=models.CharField(default="",max_length=10000)
    title=models.CharField(default="",max_length=1000)
    Time=models.IntegerField(default=0)
    isFree=models.BooleanField(default=False)
    isOpen=models.BooleanField(default=False)
    courses=models.ForeignKey(Courses,default=None,blank=True,null=True,on_delete=models.CASCADE)
    Price=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class TestImage(models.Model):
    sno=models.AutoField(primary_key=True)
    test=models.ForeignKey(Test,default=None,on_delete=models.CASCADE)
    question= models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    option1=models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    option2=models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    option3=models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    option4=models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    option5=models.FileField(upload_to='home/testimage', blank=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class TestResult(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    test=models.ForeignKey(Test,default=None,on_delete=models.CASCADE)
    useranswer=models.CharField(default="",max_length=1000000)
    correct=models.IntegerField(default=0)
    
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class TestCart(models.Model):
    sno=models.AutoField(primary_key=True)
    test=models.ForeignKey(Test,default=None,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class MyTest(models.Model):
    sno=models.AutoField(primary_key=True)
    test=models.ForeignKey(Test,default=None,on_delete=models.CASCADE)
    order_id=models.IntegerField(default=-1)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class TestCategories(models.Model):
    category=models.CharField(max_length=100)
    sub_category=models.CharField(max_length=100)
    sub_category2=models.CharField(max_length=100)
class InstructorAddedTest(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    testfile= models.FileField(upload_to='home/quize', null=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
  
class InstructorAddedTest(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    title=models.CharField(default="",max_length=1000)
    price=models.CharField(default="",max_length=1000)
    testfile= models.FileField(upload_to='home/quize', null=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class Doubt(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    username=models.CharField(default="",max_length=1000)
    likecount=models.IntegerField(default=0)
    reports=models.IntegerField(default=0)
    doubtfile=models.FileField(upload_to='home/doubt', blank=True, verbose_name="")
    doubttext=models.CharField(default="",max_length=10000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class DoubtReply(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    username=models.CharField(default="",max_length=10000)
    doubt=models.ForeignKey(Doubt,default=None,on_delete=models.CASCADE)
    doubtfile=models.FileField(upload_to='home/doubt', blank=True, verbose_name="")
    parent=models.ForeignKey('self',default=None,blank=True,null=True,on_delete=models.CASCADE)
    reply=models.TextField(max_length=10000)
    liked=models.BooleanField(default=False)
    notified=models.BooleanField(default=False)
    timeStamp=models.DateTimeField(default=now,blank=True)

class Doubtliked(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    doubt=models.ForeignKey(Doubt,default=None,blank=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Updates(models.Model):
    sno=models.AutoField(primary_key=True)
    image= models.FileField(upload_to='home/DUpdates', null=True, verbose_name="")
    titleHindi=models.CharField(default="",null=True,blank=True,max_length=1000)
    title=models.CharField(default="",null=True,blank=True,max_length=1000)
    discHindi=models.TextField(null=True,blank=True)
    disc=models.TextField(null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class BookMark(models.Model):
    sno=models.AutoField(primary_key=True)
    update=models.ForeignKey(Updates,default=None,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class SratchCard(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)
    deviceId=models.CharField(default='',max_length=1000)
    cardtype=models.CharField(default='',max_length=1000)
    amount=models.CharField(default='',max_length=1000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class wallet(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    amount=models.CharField(default="",max_length=1000)
    remaining=models.CharField(default='',max_length=1000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Megaquiz(models.Model):
    sno=models.AutoField(primary_key=True)
    question=models.CharField(default="",blank=True,null=True,max_length=1000000)
    option=models.CharField(default="",blank=True,null=True,max_length=1000000)
    correct=models.CharField(default="",max_length=1000000)
    questionHindi=models.CharField(default="",blank=True,null=True,max_length=1000000)
    optionHindi=models.CharField(default="",blank=True,null=True,max_length=1000000)
    winner1=models.ForeignKey(User,default=None,blank=True,null=True,on_delete=models.CASCADE,related_name='winner1_users')
    winner2=models.ForeignKey(User,default=None,blank=True,null=True,on_delete=models.CASCADE,related_name='winner2_users')
    winner3=models.ForeignKey(User,default=None,blank=True,null=True,on_delete=models.CASCADE,related_name='winner3_users')
    time=models.CharField(default="",max_length=100000)
    start=models.BooleanField(default=False)
    winner1name=models.CharField(default="",blank=True,null=True,max_length=100)
    winner2name=models.CharField(default="",blank=True,null=True,max_length=100)
    winner3name=models.CharField(default="",blank=True,null=True,max_length=100)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class MegaQuizInstruction(models.Model):
    sno=models.AutoField(primary_key=True)
    winner1price=models.IntegerField(default=5000)
    winner2price=models.IntegerField(default=3000)
    winner3price=models.IntegerField(default=2000)
    winner4price=models.IntegerField(default=1000)
    winner5price=models.IntegerField(default=500)
    day=models.IntegerField(default=20)
    hrs=models.IntegerField(default=20)
    min=models.IntegerField(default=00)
    isResultOut=models.BooleanField(default=False)
    isWaitingResult=models.BooleanField(default=False)
    cancel=models.BooleanField(default=False)
    reason=models.CharField(default="",blank=True,null=True,max_length=100000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Notify(models.Model):
    sno=models.AutoField(primary_key=True)
    title=models.CharField(default="",max_length=10000,null=True,blank=True)
    link=models.CharField(default="",max_length=10000,null=True,blank=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    content=models.TextField(null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class AccountDetailsForMQ(models.Model):
    sno=models.AutoField(primary_key=True)
    upi=models.CharField(default="None",max_length=500,null=True,blank=True)
    language=models.CharField(default="None",max_length=500,null=True,blank=True)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    isSpecial=models.BooleanField(default=False)
    totalWon=models.IntegerField(default=0)
    day=models.IntegerField(default=0)
    questions=models.CharField(default="",max_length=500,null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


class GeneralNotify(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,blank=True,null=True,on_delete=models.CASCADE)
    title=models.CharField(default="",null=True,max_length=1000)
    message=models.CharField(default="",null=True,max_length=10000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Notes(models.Model):
    sno=models.AutoField(primary_key=True)
    title=models.CharField(default="",null=True,max_length=1000)
    language=models.CharField(default="",null=True,max_length=100)
    category=models.CharField(default="",null=True,max_length=500)
    file=models.FileField(upload_to='home/notes', blank=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


class Feed(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    username=models.CharField(default="",max_length=500,null=True,blank=True)
    captions=models.CharField(default="",null=True,max_length=5000)
    isVideo=models.BooleanField(default=False)
    isVerified=models.BooleanField(default=False)
    post= models.FileField(upload_to='home/feeds', null=True, verbose_name="")
    likes=models.IntegerField(default=0)
    shares=models.IntegerField(default=0)
    bookmarks=models.IntegerField(default=0)
    comments=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return str(self.user)+str(self.captions)


class SavedFeed(models.Model):
    sno=models.AutoField(primary_key=True)
    comment=models.ForeignKey(Feed,default=None,blank=True,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return str(self.user)

class FeedComment(models.Model):
    sno=models.AutoField(primary_key=True)
    feed=models.ForeignKey(Feed,default=None,blank=True,on_delete=models.CASCADE)
    comment=models.CharField(default="",max_length=500,null=True,blank=True)
    username=models.CharField(default="",max_length=500,null=True,blank=True)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return str(self.user)

class WordoftheDay(models.Model):
    sno=models.AutoField(primary_key=True)
    word=models.CharField(default=0,max_length=1000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Practice(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(default="",max_length=500,null=True,blank=True)
    chapter=models.CharField(default="",max_length=500,null=True,blank=True)
    quetion=models.CharField(default="",max_length=1000,null=True,blank=True)
    questionImage= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option1=models.CharField(default="",max_length=500,null=True,blank=True)
    option1img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option2=models.CharField(default="",max_length=500,null=True,blank=True)
    option2img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option3=models.CharField(default="",max_length=500,null=True,blank=True)
    option3img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option4=models.CharField(default="",max_length=500,null=True,blank=True)
    option4img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option5=models.CharField(default="",max_length=500,null=True,blank=True)
    option5img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    correct=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class PracticeEnglish(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(default="",max_length=500,null=True,blank=True)
    chapter=models.CharField(default="",max_length=500,null=True,blank=True)
    quetion=models.CharField(default="",max_length=1000,null=True,blank=True)
    questionImage= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option1=models.TextField()
    option1img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option2=models.TextField()
    option2img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option3=models.TextField()
    option3img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option4=models.TextField()
    option4img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    option5=models.TextField(null=True,blank=True)
    option5img= models.FileField(upload_to='home/practice', null=True,blank=True, verbose_name="")
    correct=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


class FeedLike(models.Model):
    sno=models.AutoField(primary_key=True)
    feed=models.ForeignKey(Feed,default=None,blank=True,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    username=models.CharField(default="",max_length=10000,null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.user)

class FeedShare(models.Model):
    sno=models.AutoField(primary_key=True)
    feed=models.ForeignKey(Feed,default=None,blank=True,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.user)

class MegaQuizEnglish(models.Model):
    sno=models.AutoField(primary_key=True)
    question=models.CharField(default="",max_length=500,null=True,blank=True)
    option1=models.CharField(default="",max_length=500,null=True,blank=True)
    option2=models.CharField(default="",max_length=500,null=True,blank=True)
    option3=models.CharField(default="",max_length=500,null=True,blank=True)
    option4=models.CharField(default="",max_length=500,null=True,blank=True)
    option5=models.CharField(default="",max_length=500,null=True,blank=True)
    correct=models.IntegerField(default=0)
    time=models.IntegerField(default=30)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class MegaQuizHindi(models.Model):
    sno=models.AutoField(primary_key=True)
    question=models.CharField(default="",max_length=500,null=True,blank=True)
    option1=models.CharField(default="",max_length=500,null=True,blank=True)
    option2=models.CharField(default="",max_length=500,null=True,blank=True)
    option3=models.CharField(default="",max_length=500,null=True,blank=True)
    option4=models.CharField(default="",max_length=500,null=True,blank=True)
    option5=models.CharField(default="",max_length=500,null=True,blank=True)
    time=models.IntegerField(default=30)
    correct=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class Stories(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(default="",max_length=500,null=True,blank=True)
    front= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    one= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    two= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    three= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    four= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    five= models.FileField(upload_to='home/stories', null=True,blank=True, verbose_name="")
    videos=models.CharField(default="",max_length=500,null=True,blank=True)
    views=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


class MegaquizResult(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    username=models.CharField(default="",max_length=100)
    day1=models.CharField(default="",max_length=1000,null=True,blank=True)
    day2=models.CharField(default="",max_length=1000,null=True,blank=True)
    day3=models.CharField(default="",max_length=1000,null=True,blank=True)
    day4=models.CharField(default="",max_length=1000,null=True,blank=True)
    day5=models.CharField(default="",max_length=1000,null=True,blank=True)
    day6=models.CharField(default="",max_length=1000,null=True,blank=True)
    day7=models.CharField(default="",max_length=1000,null=True,blank=True)
    device=models.TextField(null=True,blank=True)
    time1=models.IntegerField(default=0,null=True,blank=True)
    time2=models.IntegerField(default=0,null=True,blank=True)
    time3=models.IntegerField(default=0,null=True,blank=True)
    time4=models.IntegerField(default=0,null=True,blank=True)
    time5=models.IntegerField(default=0,null=True,blank=True)
    time6=models.IntegerField(default=0,null=True,blank=True)
    time7=models.IntegerField(default=0,null=True,blank=True)
    score=models.IntegerField(default=0,null=True,blank=True)
    time=models.IntegerField(default=0,null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return str(self.score)+'-'+str(self.time)

class PreviousPaper(models.Model):
    sno=models.AutoField(primary_key=True)
    category=models.CharField(default="",max_length=1000,null=True,blank=True)
    question= models.FileField(upload_to='home/papers', null=True,blank=True, verbose_name="")
    answer= models.FileField(upload_to='home/papers', null=True,blank=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class alert(models.Model):
    sno=models.AutoField(primary_key=True)
    title=models.CharField(default="",max_length=1000,null=True,blank=True)
    description=models.CharField(default="",max_length=1000,null=True,blank=True)
    type=models.CharField(default="",max_length=1000,null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    isforAll=models.BooleanField(default=False)
    isforUpdate=models.BooleanField(default=False)
    user=models.ForeignKey(User,default=None,blank=True,null=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

class alertrecieved(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,blank=True,on_delete=models.CASCADE)
    alert=models.ForeignKey(alert,default=None,blank=True,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

