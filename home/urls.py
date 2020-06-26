 
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
    path('addVideos', views.addVideos,name="addVideos"),
    path('teachersignup', views.handleTeacherSignUp,name="handleTeacherSignUp"),
    path('saveCourse', views.saveCourse,name="saveCourse"),
    path('viewCourses', views.viewCourses,name="viewCourses"),
    path('video', views.video,name="video"),
    path('get_video', views.get_video,name="get_video"),
    path('addCart', views.addCart,name="addCart"),
    # path('editCourse/<int:id>', views.editCourse,name="editCourse"),
    path('deleteCourse/<int:id>', views.deleteCourse,name="deleteCourse"),
]