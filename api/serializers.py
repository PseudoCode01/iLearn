from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth import authenticate
from rest_framework import exceptions
from home.models import Categories,HomeTutor,Courses,Videos,WatchedVideos,Cart,Contact,TestResult,Test,TestCart,InstructorAddedTest,WatchedVideos,Doubt,BookMark,DoubtReply,wallet,AccountDetailsForMQ,MegaquizResult,ReviewCourse,GeneralNotify

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = [ 'username','first_name','email','password', 'password2','last_name']
        
        extra_kwargs = {
                'password': {'write_only': True},
        }	


    def	save(self):

        account = User(
                    email=self.validated_data['email'],
                    username=self.validated_data['username']
                )
        first_name = self.validated_data['first_name']
        print(first_name)
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        account.set_password(password)
        account.first_name=first_name
        account.save()
        return account

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                else:
                    msg = "User is deactivated."
                    raise exceptions.ValidationError(msg)
            else:
                print(username)
                msg = "Unable to login with given credentials."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Must provide username and password both."
            raise exceptions.ValidationError(msg)
        return data

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'category',
            'sub_category',
            'sub_category2'
        ]
        model=Categories
class HomeTutorSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'name',
            'email',
            'phone'
            'gender'
            'age'
            'pin'
            'district'
            'state'
            'subject'
            'classes'
            'discription'
            'salaryL'
            'salaryH'
            'id_proof'
        ]
        model=HomeTutor
class EditHomeTutorSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
            'name',
            'email',
            'phone'
            'gender'
            'age'
            'pin'
            'district'
            'state'
            'subject'
            'classes'
            'discription'
            'salaryL'
            'salaryH'
            'id_proof'
        ]
        model=HomeTutor
class CreateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'title',
            'category',
            'sub_category'
            'sub_category2'
            'discription'
            'courseThumbnail'
            'language'
            'pricing'
            
        ]
        model=Courses
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'videoTitle',
            'videofile',
            'thumbnail'
            'resource'
            'videoOfCourse'
            
        ]
        model=Videos
class AnswerQuerySerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'answer'
            'id'
        ]
        model=WatchedVideos
class GetVideosSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'videoOfCourse'
        ]
        model=Videos
class AddCartSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'course'
        ]
        model=Cart
class AddTestCartSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'test'
        ]
        model=TestCart
class RemoveCartSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
        ]
        model=Cart
class RemoveTestCartSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
        ]
        model=Cart
class GetHomeTutorSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'pin'
            'classes'
            'sub'
        ]
        model=HomeTutor
class ADDMYCOURSESSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'course'
            'cartid'
            'test'
            'offer'
        ]
        model=Cart
class ContactUs(serializers.ModelSerializer):
    class Meta:
        fields=[
            'name'
            'email'
            'query'
        ]
        model=Contact
class TestSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'id'
   
            
        ]
        model=Test
class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'test'
            'answer'
            'correct'
            
        ]
        model=TestResult
class TestAllSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            's'
            'sc'
            'sc2'
            
        ]
        model=Test
class GetQuizeResultSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'id'  
        ]
        model=TestResult
class GetPaidVideosSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'  
        ]
        model=Videos
class GetUrlSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'url'  
        ]
        model=Videos

class AddTestSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'title'  
            'price'  
            'resource'  
        ]
        model=InstructorAddedTest
        model=InstructorAddedTest
class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'text'
        ]
        model=Courses
class GDSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'name'
            'email'
            'phone'
            'address'
            'pin'
            'tname'
        ]
        model=HomeTutor
class WatchedSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'watched'
            'creater'
        ]
        model=WatchedVideos
class ADDMYCOURSESFreeSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'test'
                        
        ]
        model=Test
class RemoveMyTestSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
        ]
        model=TestResult


class NewDoubtSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'query'
            'queryimage'
        ]
        model=Doubt
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'likestatus'
            'sno'
        ]
        model=Doubt
class DRSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
        ]
        model=Doubt
class BookMarkSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
            'action'
        ]
        model=BookMark
class ReplyDSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
            'file'
            'text'
        ]
        model=DoubtReply
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'amount'
            'sno'
            'cardtype'
        ]
        model=wallet
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'sno'
        ]
        model=Doubt
class ADForMQSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'ad'
        ]
        model=AccountDetailsForMQ
class WINMQSerializer(serializers.ModelSerializer):
    class Meta:
        fields=[
            'winner1'
            'winner2'
            'winner3'
        ]
        model=AccountDetailsForMQ
class WinnerMQSerializers(serializers.ModelSerializer):
    class Meta:
        fields=[
        
        'score'
        'time'
    ]
    model=MegaquizResult
class AddReviewSerializers(serializers.ModelSerializer):
    class Meta:
        fields=[
        'sno'
        'rating'
        'action'
    ]
    model=ReviewCourse

class asknewquerySerializers(serializers.ModelSerializer):
    class Meta:
        fields=[
            'video'
            'query'
            'creater'   
            'device'
        ]
        model=WatchedVideos
class GNSerializers(serializers.ModelSerializer):
    class Meta:
        fields=[
            'title'
            'message'
        ]
        model=GeneralNotify

