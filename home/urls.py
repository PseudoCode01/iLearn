 
from django.urls import path
from . import views
urlpatterns = [
    path("",views.home,name="home"),
    path("teach1",views.Teach1,name="Teach1"),
    path('login', views.handleLogin,name="handleLogin"),
    path('logout', views.handleLogout,name="handleLogout"),
    path('signup', views.handleSignUp,name="handleSignUp"),
    path('contact', views.contact,name="contact"),
    path('about', views.about,name="about"),
    path('addCourse', views.addCourse,name="addCourse"),
    path('homeTutor', views.homeTutor,name="homeTutor"),
    path('getStarted', views.getStarted,name="getStrated"),
    path('createCourse', views.createCourse,name="createCourse"),
    path('teachersignup', views.handleTeacherSignUp,name="handleTeacherSignUp")
]