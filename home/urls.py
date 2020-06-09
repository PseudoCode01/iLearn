 
from django.urls import path
from . import views
urlpatterns = [
    path("",views.home,name="home"),
    path("teach1",views.Teach1,name="Teach1"),
     path('login', views.handleLogin,name="handleLogin"),
    path('logout', views.handleLogout,name="handleLogout"),
    path('signup', views.handleSignUp,name="handleSignUp")
]